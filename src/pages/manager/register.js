// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import $ from 'jquery';

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import AuthIllustrationV1Wrapper from 'src/views/pages/auth/AuthIllustrationV1Wrapper'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { axiosIns } from 'src/@fake-db/backend'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { setCookie } from 'src/@core/utils/react-cookie'

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
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterV1 = () => {
  // ** States
  const [values, setValues] = useState({
    user_name: '',
    user_pw: '',
    showPassword: false,
    passwordCheck: '',
    showPasswordCheck: false
  })

  // ** Hook
  const [dnsData, setDnsData] = useState({})
  const [loading, setLoading] = useState(false);

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    settings();
  }, [])

  const settings = async () => {
    await checkDns();
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowPasswordCheck = () => {
    setValues({ ...values, showPasswordCheck: !values.showPasswordCheck })
  }

  const checkDns = async () => {
    try {
      setLoading(true);

      const response = await axiosIns().options('/api/v1/auth/domain', {
        data: {
          dns: location.hostname
        },
      });
      let is_appr = Number(response?.data?.is_appr);

      if (is_appr == 1) {
        router.push('/manager/login');

      }
      setDnsData(response?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err?.message);
    }

  }

  const onRegister = async () => {
    try {
      console.log(values);
      if (values.user_pw != values.passwordCheck) {
        toast.error('비밀번호가 일치하지 않습니다.');

        return;
      }
      let obj = { ...values };
      obj['brand_id'] = dnsData?.id;
      delete obj['showPassword'];
      delete obj['passwordCheck'];
      delete obj['showPasswordCheck'];
      const response = await axiosIns().post('/api/v1/auth/sign-up/first', obj);
      await setCookie('o', response?.data?.access_token, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      if (response?.status == 200 && response?.data?.user) {
        await setLocalStorage(LOCALSTORAGE.USER_AUTH, response?.data?.user);
        router.push('/manager/users');
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || err?.message);
    }

  }

  return (
    <Box className='content-center'>
      <Card>
        <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={dnsData?.logo_img} style={{ maxWidth: '256px' }} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h6' sx={{ mb: 1.5 }}>
              환영합니다 🚀
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>최초 접속으로 서비스를 운영할 본사를 등록합니다.</Typography>
          </Box>
          <TextField autoFocus fullWidth id='user_name' onChange={handleChange('user_name')} onKeyPress={(e) => { e.key == 'Enter' ? $('#auth-register-password').focus() : '' }} label='아이디' sx={{ mb: 4 }} />
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel htmlFor='auth-register-password'>비밀번호</InputLabel>
            <OutlinedInput
              label='비밀번호'
              value={values.user_pw}
              id='auth-register-password'
              onChange={handleChange('user_pw')}
              type={values.showPassword ? 'text' : 'password'}
              onKeyPress={(e) => { e.key == 'Enter' ? $('#auth-register-password-check').focus() : '' }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle password visibility'
                  >
                    <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-register-password'>비밀번호확인</InputLabel>
            <OutlinedInput
              label='비밀번호확인'
              value={values.passwordCheck}
              id='auth-register-password-check'
              onChange={handleChange('passwordCheck')}
              type={values.showPasswordCheck ? 'text' : 'password'}
              onKeyPress={(e) => { e.key == 'Enter' ? onRegister() : '' }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPasswordCheck}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle password visibility'
                  >
                    <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} fontSize={20} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div style={{ height: '42px' }} />
          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 4 }} onClick={onRegister}>
            등록
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
RegisterV1.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterV1
