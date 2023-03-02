// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios'
import $ from 'jquery';
import toast from 'react-hot-toast';
import Spinner from 'src/@core/components/spinner'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { axiosIns } from 'src/@fake-db/backend'
import { useRouter } from 'next/router'
import { getCookie, setCookie } from 'src/@core/utils/react-cookie'
import FallbackSpinner from 'src/@core/components/spinner'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { backUrl, LOCALSTORAGE } from 'src/data/data'
import HeadContent from 'src/@core/components/head'
import { processCatch } from 'src/@core/utils/function'

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

const LoginV1 = ({ dns_data }) => {
  // ** State
  const [values, setValues] = useState({
    id: '',
    password: '',
    showPassword: false,
    brand_id: 0
  })
  const [dnsData, setDnsData] = useState({})
  const [loading, setLoading] = useState(false);

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
    setLoading(false);
  }

  const settingDomain = async () => {
    await setCookie('d', decodeURI(`${window.location.protocol}//${window.location.host}`), {
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  const checkDns = async () => {
    try {

      const response = await axiosIns().options('/api/v1/auth/domain', {
        data: {
          dns: location.hostname
        },
      });
      setLocalStorage(LOCALSTORAGE.DNS_DATA, response?.data);
      setDnsData(response?.data);
      if (response?.status == 200) {
        setValues({ ...values, ['brand_id']: response?.data?.id });
      } else {
        toast.error(response?.data?.statusText);
      }
      if (router.asPath.split('?')[1]) {
        let query_str = router.asPath.split('?')[1];
        if (query_str.includes('o=')) {
          let token = query_str.split('o=')[1];
          await setCookie('o', token, {
            path: "/",
            secure: true,
            sameSite: "none",
          });
        }

      }
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
      if (response_auth?.level > 0) {
        await setLocalStorage(LOCALSTORAGE.USER_DATA, response_auth);
        router.push('/manager/users');
      }
    } catch (err) {
      console.log(err)
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
        secure: true,
        sameSite: "none",
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

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <Box className='content-center'>
            {/* <AuthIllustrationV1Wrapper> */}
            <Card>
              <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={dnsData?.logo_img} style={{ maxWidth: '256px' }} />
                  <Typography sx={{ ml: 2.5, fontWeight: 600, fontSize: '1.625rem', lineHeight: 1.385 }}>
                    {themeConfig.templateName}
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography variant='h6' sx={{ mb: 1.5 }}>
                    {`Welcome ${themeConfig.templateName}! 👋🏻`}
                  </Typography>
                </Box>
                <TextField autoFocus fullWidth id='id' label='ID' sx={{ mb: 4 }} onChange={handleChange('id')} onKeyPress={(e) => { e.key == 'Enter' ? $('#auth-login-password').focus() : '' }} />
                <FormControl fullWidth sx={{ mb: 1.5 }}>
                  <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='auth-login-password'
                    onChange={handleChange('password')}
                    onKeyPress={(e) => { e.key == 'Enter' ? onLogin() : '' }}
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          aria-label='toggle password visibility'
                        >
                          <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
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
                <Button fullWidth size='large' type='submit' variant='contained' style={{ cursor: `${!loading ? 'pointer' : 'default'}` }} sx={{ mb: 4 }} onClick={() => {
                  if (!loading) {
                    onLogin();
                  }
                }}>
                  {loading ?
                    <>
                      Loading...
                    </>
                    :
                    <>
                      로그인
                    </>}
                </Button>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>New on our platform?</Typography>
                <Typography>
                  <LinkStyled href='/pages/auth/register-v1' sx={{ fontSize: '1rem' }}>
                    Create an account
                  </LinkStyled>
                </Typography>
              </Box> */}
                {/* <Divider
                sx={{
                  fontSize: '0.875rem',
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider> */}
                {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box> */}
              </CardContent>
            </Card>
            {/* </AuthIllustrationV1Wrapper> */}
          </Box>
        </>}

    </>
  )
}


LoginV1.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginV1
