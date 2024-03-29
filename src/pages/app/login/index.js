// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import toast from 'react-hot-toast';

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { axiosIns } from 'src/@fake-db/backend'
import { useRouter } from 'next/router'
import { getCookie, setCookie } from 'src/@core/utils/react-cookie'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { processCatch } from 'src/@core/utils/function'
import { themeObj } from 'src/@core/layouts/components/app/style-component'
import DialogLoginForm from 'src/@core/layouts/components/app/DialogLoginForm'
import Loading from 'src/@core/layouts/components/app/Loading'
import { onPostWebview } from 'src/@core/utils/webview-connect'
import DialogLoading from 'src/@core/layouts/components/app/DialogLoading'
import { useMediaQuery } from '@mui/material'
import { Icon } from '@iconify/react'
import { useSettings } from 'src/@core/hooks/useSettings'
import $ from 'jquery'
// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const Login = ({ dns_data }) => {

  const { settings, saveSettings } = useSettings()

  // ** State
  const [values, setValues] = useState({
    id: '',
    password: '',
    showPassword: false,
    brand_id: 0
  })
  const [dnsData, setDnsData] = useState({})
  const [loading, setLoading] = useState(true);
  const [snsLoading, setSnsLoading] = useState(false);
  const [isIos, setIsIos] = useState(false);
  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 350px)')
  const [verificationCode, setVerificationCode] = useState("");
  useEffect(() => {
    if (window.ReactNativeWebView) {
      onPostWebview('app_initial');
    } else {
      onSettings();
    }
  }, [])
  useEffect(() => {
    const onMessageHandler = async (e) => {
      const event = JSON.parse(e.data)
      if (event.method == 'app_initial') {
        onSettings();
      } else if (event.method == 'kakao_login') {
        if (event?.data?.id) {
          if (event?.data?.phone) {//기기에 폰번호 저장시
            onSnsLogin({
              id: event?.data?.id,
              login_type: 1,
              phone_num: event?.data?.phone
            });
          } else { //기기에 폰번호 저장 아닐시
            handleLoginOpen();
            setSnsData({
              id: event?.data?.id,
              login_type: 1,
            })
          }
        }
      } else if (event.method == 'apple_login') {
        if (event?.data?.id) {
          if (event?.data?.phone) {//기기에 폰번호 저장시
            onSnsLogin({
              id: event?.data?.id,
              login_type: 2,
              phone_num: event?.data?.phone
            });
          } else { //기기에 폰번호 저장 아닐시
            handleLoginOpen();
            setSnsData({
              id: event?.data?.id,
              login_type: 2,
            })
          }
        }
      } else if (event.method == 'logined') {// 로그인 정보 불러오기
        try {
          setIsIos(event?.data?.os == 'ios');
          if (event?.data?.token) {
            await new Promise((r) => setTimeout(r, 1300));
          }
          let result = await onSignIn({
            token: (event?.data?.token ?? "").toString(),
            login_type: (event?.data?.login_type ?? "0").toString(),
            phone_num: (event?.data?.phone ?? "").toString()
          })
        } catch (err) {
          setTimeout(() => {
            setLoading(false);
          }, 1300)
        }
      } else if (event.method == 'mode') {
        saveSettings({ ...settings, mode: event?.data?.mode ?? "light" });
      } else if (event.method == 'verification_code') {
        setVerificationCode(event?.data?.code);
      }
    }
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/)
    }
    const receiver = isUIWebView() ? window : document
    receiver.addEventListener('message', onMessageHandler)
    return () => {
      receiver.removeEventListener('message', onMessageHandler)
    }
  }, [])
  const onSettings = async () => {
    setLoading(true);
    await checkDns();
    await checkAuth();
  }
  const checkDns = async () => {
    try {
      let obj = {};
      let dns_data = settings.dnsData;
      obj = dns_data;
      setDnsData(obj);
      setValues({ ...values, ['brand_id']: obj.id });
    } catch (err) {
      //toast.error(err?.response?.data?.message || err?.message);
      if (err?.response?.status == 409) {
        router.push('/404');
      }
    }
  }
  const checkAuth = async () => {
    if (window.ReactNativeWebView) {
      await onPostWebview('mode');
      await onPostWebview('logined');
    } else {
      try {
        const { data: response_auth } = await axiosIns().post('/api/v1/auth/ok', {}, {
          headers: {
            "Authorization": `Bearer ${getCookie('o')}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
        if (response_auth?.id > 0) {
          await setLocalStorage(LOCALSTORAGE.USER_DATA, response_auth);
          setTimeout(() => {
            router.push('/app/home');
          }, 1300)
        }
      } catch (err) {
        setTimeout(() => {
          setLoading(false);
        }, 1300)
      }
    }
  }
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const onSnsLogin = async (data) => {
    try {
      //setSnsLoading(true)
      let result = await onSignIn({
        dns: window.location.hostname,
        phone_num: data?.phone_num,
        login_type: data?.login_type,
        token: data?.id
      })
      setSnsLoading(false);
    } catch (err) {
      setSnsLoading(false);
      if (err?.response?.status == 403) {
        handleLoginOpen();
        setSnsData({
          id: data?.id,
          login_type: 1,
        })
      }
    }
  }
  const onSignUp = async (data) => {
    let obj = {
      dns: data?.dns,
      phone_num: data?.phone_num,
      login_type: data?.login_type,
      phone_token: getCookie('phone_token')
    }
    if (data?.login_type != 0) {
      obj['sns_token'] = data?.sns_token
    }
    const res_sign_up = await axiosIns().post(`/api/v1/app/auth/sign-up`, obj)
    return;
  }
  const onSignIn = async (data) => {
    if (!data?.token) {
      throw {
        err: {
          response: {
            status: 409
          }
        }
      }
    }
    const response = await axiosIns().post('/api/v1/app/auth/sign-in', {
      dns: window.location.hostname,
      phone_num: data?.phone_num,
      login_type: data?.login_type,
      token: (data?.token).toString(),
    });
    await onPostWebview('phone_save', { phone: data?.phone_num, token: (data?.token).toString(), login_type: (data?.login_type).toString() })
    await setCookie('o', response?.data?.access_token, {
      path: "/",
      secure: process.env.COOKIE_SECURE,
      sameSite: process.env.COOKIE_SAME_SITE,
    });
    if (response?.status == 200 && response?.data?.user) {
      await setLocalStorage(LOCALSTORAGE.USER_DATA, response?.data?.user);
      router.push('/app/home');
    }
    return;
  }

  const [loginOpen, setLoginOpen] = useState(false);
  const [snsData, setSnsData] = useState({
    id: undefined,
    login_type: 0,
  });
  const handleLoginClose = () => setLoginOpen(false);
  const handleLoginOpen = () => {
    setLoginOpen(true)
    if (!$('#phone_num').val()) {
      $('#phone_num').focus();
      return;
    }
    if (!$('#phone_check').val()) {
      $('#phone_check').focus();
      return;
    }
  };
  const onClickKakaoButton = () => {
    onPostWebview('kakao_login');
  }
  const onClickAppleButton = () => {
    onPostWebview('apple_login');
  }
  return (
    <>
      <DialogLoginForm
        open={loginOpen}
        handleClose={handleLoginClose}
        dnsData={dnsData}
        router={router}
        snsData={snsData}
        onSignUp={onSignUp}
        onSignIn={onSignIn}
        verificationCode={verificationCode}
        style={{
          color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : ''}`,
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : ''}`,
        }}
      />
      {snsLoading ?
        <>
          <DialogLoading
            theme={theme} />
        </>
        :
        <>
        </>}
      {loading ?
        <>
          <Loading />
        </>
        :
        <>

          <Box className='content-center' style={{
            display: `${loading ? 'none' : ''}`,
          }}>
            {/* <AuthIllustrationV1Wrapper> */}
            <Card style={{
              background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_box_color ?? "#222224" : '#fff'}`,
            }}>
              <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={theme.palette.mode == 'dark' ? dnsData?.dark_logo_img : dnsData?.logo_img} style={{ height: '4rem', width: 'auto' }} />
                </Box>
                <Box sx={{ mb: 9 }}>
                  <Typography variant='h6' sx={{ mb: 1.5 }}>
                    {`Welcome ${themeConfig.templateName}! 👋🏻`}
                  </Typography>
                </Box>
                {/* <Box sx={{ mb: 9 }}>
              <Typography variant='h8' sx={{ mb: 1.5, whiteSpace: 'pre', fontWeight: 'bold' }}>
                {dnsData?.og_description}
              </Typography>
            </Box> */}
                <Box
                  sx={{
                    mb: '1rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {/* <FormControlLabel control={<Checkbox />} label='로그인 상태 유지' />
              <LinkStyled href='/pages/auth/forgot-password-v1'>비밀번호 찾기</LinkStyled> */}
                </Box>
                {isIos ?
                  <>
                    <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}`, background: `${theme.palette.mode == 'dark' ? '#fff' : '#000'}`, color: `${theme.palette.mode == 'dark' ? '#000' : '#fff'}`, fontSize: (isMobile ? themeObj.font_size.font4 : '') }} sx={{ mb: 4 }} onClick={() => {
                      if (!loading) {
                        onClickAppleButton();
                      }
                    }}>
                      {loading ?
                        <>
                          Loading...
                        </>
                        :
                        <>
                          <Icon icon='ic:baseline-apple' style={{ fontSize: '1rem', marginRight: '0.5rem' }} />
                          <div>
                            애플 로그인
                          </div>
                        </>}
                    </Button>
                  </>
                  :
                  <>
                  </>}
                <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}`, background: '#f7e600', color: '#000', fontSize: (isMobile ? themeObj.font_size.font4 : '') }} sx={{ mb: 4 }} onClick={() => {
                  if (!loading) {
                    onClickKakaoButton();
                  }
                }}>
                  {loading ?
                    <>
                      Loading...
                    </>
                    :
                    <>
                      <img src='/icon/kakao.png' style={{ height: '1rem', marginRight: '0.5rem' }} />
                      <div>
                        카카오로 로그인
                      </div>
                    </>}
                </Button>
                <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}`, fontSize: (isMobile ? themeObj.font_size.font4 : '') }} sx={{ mb: 4 }} onClick={() => {
                  if (!loading) {
                    handleLoginOpen();
                  }
                }}>
                  {loading ?
                    <>
                      Loading...
                    </>
                    :
                    <>
                      휴대폰으로 로그인
                    </>}
                </Button>
              </CardContent>
            </Card>
            {/* </AuthIllustrationV1Wrapper> */}
          </Box>
        </>}

    </>
  )
}


Login.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Login
