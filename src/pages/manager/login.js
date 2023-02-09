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
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import AnalyticsDashboard from '../dashboards/analytics'
import axiosIns from 'src/@fake-db/backend'
import { useRouter } from 'next/router'
import { setCookie } from 'src/@core/utils/react-cookie'
import FallbackSpinner from 'src/@core/components/spinner'
import { setLocalStorage } from 'src/@core/utils/local-storage'


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

const LoginV1 = () => {
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
    checkDns();
  }, [])

  const checkDns = async () => {
    try {
      setLoading(true);

      const response = await axiosIns.options('/api/v1/auth/domain', {
        data: {
          dns: location.hostname
        },
      });
      setLocalStorage('dns_data', response?.data);
      setDnsData(response?.data);
      if (response?.status == 200) {
        setValues({ ...values, ['brand_id']: response?.data?.id });
      } else {
        toast.error(response?.data?.statusText);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
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
      const response = await axiosIns.post('/api/v1/auth/sign-in', {
        brand_id: values?.brand_id,
        user_name: values?.id,
        user_pw: values?.password,
        login_type: 0,
      });
      console.log(response)
      await setCookie('o', response?.data?.access_token, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      if (response?.status == 200 && response?.data?.user) {
        await setLocalStorage('user_auth', response?.data?.user);
        router.push('/manager/users');
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }

  }

  return (
    <Box className='content-center'>
      {/* <AuthIllustrationV1Wrapper> */}
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={dnsData?.logo_img} style={{ height: '48px', width: 'auto' }} />
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
              mb: 1.75,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <FormControlLabel control={<Checkbox />} label='로그인 상태 유지' />
            <LinkStyled href='/pages/auth/forgot-password-v1'>비밀번호 찾기</LinkStyled>
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
  )
}
LoginV1.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginV1
