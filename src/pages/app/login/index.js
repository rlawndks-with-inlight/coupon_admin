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
  const [dnsLoadingFlag, setDnsLoadingFlag] = useState(false);
  const [authLoadingFlag, setAuthLoadingFlag] = useState(false);


  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    settings();
  }, [])

  const settings = async () => {
    setLoading(true);
    await checkDns();
    await checkAuth();
  }


  const checkDns = async () => {
    try {
      toast.success('1');
      let obj = {};
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      obj = JSON.parse(dns_data);
      obj['theme_css'] = JSON.parse(obj['theme_css']);
      obj['options'] = JSON.parse(obj['options']);
      setDnsData(obj);
      setValues({ ...values, ['brand_id']: obj.id });
      toast.success('2');
    } catch (err) {
      toast.success('3');
      console.log(err);
      toast.error(err?.response?.data?.message || err?.message);
      if (err?.response?.status == 409) {
        router.push('/404');
      }
    }
  }
  const checkAuth = async () => {
    try {
      toast.success('4');
      const { data: response_auth } = await axiosIns().post('/api/v1/auth/ok', {}, {
        headers: {
          "Authorization": `Bearer ${getCookie('o')}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      if (response_auth?.id > 0) {
        toast.success('5');
        await setLocalStorage(LOCALSTORAGE.USER_DATA, response_auth);
        toast.success('6');
        setTimeout(() => {
          router.push('/app/home');
        }, 1300)
      }
    } catch (err) {
      toast.success('7');
      console.log(err);
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

  const onLogin = async () => {
    try {
      const response = await axiosIns().post('/api/v1/auth/sign-in', {
        brand_id: values?.brand_id,
        user_name: values?.id,
        user_pw: values?.password,
        login_type: 0,
      });

      await setCookie('o', response?.data?.access_token, {
        path: "/",
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE,
      });
      if (response?.status == 200 && response?.data?.user) {
        await setLocalStorage(LOCALSTORAGE.USER_DATA, response?.data?.user);
        router.push('/manager/users');
      }
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const onClickKakaoButton = () => {
  }
  return (
    <>
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
