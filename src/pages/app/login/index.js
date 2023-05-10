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

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '25rem' }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const Login = ({ dns_data }) => {
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
  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    settings();
  }, [])
  useEffect(() => {
    const onMessageHandler = (e) => {
      const event = JSON.parse(e.data)

      if (event.method == 'kakao_login') {
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
      } else if (1) {

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
  const settings = async () => {
    setLoading(true);
    await checkDns();
    await checkAuth();
  }
  const checkDns = async () => {
    try {
      let obj = {};
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      obj = JSON.parse(dns_data);
      if (typeof obj['theme_css'] == 'string') {
        obj['theme_css'] = JSON.parse(obj['theme_css']);
      }
      if (typeof obj['options'] == 'string') {
        obj['options'] = JSON.parse(obj['options']);
      }
      setDnsData(obj);
      setValues({ ...values, ['brand_id']: obj.id });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err?.message);
      if (err?.response?.status == 409) {
        router.push('/404');
      }
    }
  }
  const checkAuth = async () => {
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
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const onSnsLogin = async (data) => {
    try {
      setSnsLoading(true)
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
    const response = await axiosIns().post('/api/v1/app/auth/sign-in', {
      dns: data?.dns,
      phone_num: data?.phone_num,
      login_type: data?.login_type,
      token: data?.token,
    });
    if (window.ReactNativeWebView) {
      await onPostWebview('phone_save', { phone: data?.phone_num })
    }
    await setCookie('o', response?.data?.access_token, {
      path: "/",
      secure: process.env.COOKIE_SECURE,
      sameSite: process.env.COOKIE_SAME_SITE,
    });
    if (response?.status == 200 && response?.data?.user) {
      await setLocalStorage(LOCALSTORAGE.USER_DATA, response?.data?.user);
      router.push('/app/home');
    }
  }
  const [loginOpen, setLoginOpen] = useState(false);
  const [snsData, setSnsData] = useState({
    id: undefined,
    login_type: 0,
  });
  const handleLoginClose = () => setLoginOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const onClickKakaoButton = () => {
    if (window.ReactNativeWebView) {
      onPostWebview('kakao_login');
    } else {

    }
  }
  return (
    <>
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
          <DialogLoginForm
            open={loginOpen}
            handleClose={handleLoginClose}
            dnsData={dnsData}
            router={router}
            snsData={snsData}
            onSignUp={onSignUp}
            onSignIn={onSignIn}
            style={{
              color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : ''}`,
              background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : ''}`,
            }}
          />
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
                <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}`, background: themeObj.yellow, color: '#000' }} sx={{ mb: 4 }} onClick={() => {
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
                      카카오로 로그인
                    </>}
                </Button>
                <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}` }} sx={{ mb: 4 }} onClick={() => {
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
