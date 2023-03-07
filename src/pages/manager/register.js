// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { styled, useTheme } from '@mui/material/styles'
// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import $ from 'jquery';
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import StepperCustomDot from '/src/views/forms/form-wizard/StepperCustomDot'

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { axiosIns } from 'src/@fake-db/backend'
import { useRouter } from 'next/router'
import DialogCongraturation from 'src/views/components/dialogs/DialogCongraturation'
import { processCatch } from 'src/@core/utils/function'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { setCookie } from 'src/@core/utils/react-cookie'
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '80rem' }
}))

const steps = [
  {
    title: '네임서버등록',
    subtitle: '네임서버등록 과정을 설명합니다.'
  },
  {
    title: '도메인검증',
    subtitle: '유효한 도메인인지 검증합니다.'
  },
  {
    title: '본사정보입력',
    subtitle: '서비스명과 계정을 등록합니다.'
  },
  {
    title: '등록확인',
    subtitle: '등록이 완료 되었습니다. 👏👏'
  }
]

const defaultAccountValues = {
  email: '',
  username: '',
  password: '',
  'confirm-password': ''
}

const defaultPersonalValues = {
  country: '',
  language: [],
  'last-name': '',
  'first-name': ''
}

const defaultSocialValues = {
  google: '',
  twitter: '',
  facebook: '',
  linkedIn: ''
}

const accountSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  'confirm-password': yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

const personalSchema = yup.object().shape({
  country: yup.string().required(),
  'last-name': yup.string().required(),
  'first-name': yup.string().required(),
  language: yup.array().min(1).required()
})

const socialSchema = yup.object().shape({
  google: yup.string().required(),
  twitter: yup.string().required(),
  facebook: yup.string().required(),
  linkedIn: yup.string().required()
})

const Register = () => {
  // ** States

  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0)
  const [token, setToken] = useState("");
  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const [values, setValues] = useState({
    dns: '',
    name: '',
    user_name: '',
    user_pw: '',
    showPassword: false,
    passwordCheck: '',
    showPasswordCheck: false
  })
  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors }
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema)
  })
  useEffect(() => {
    if (window.location.host != 'team.comagain.kr') {
      //router.push('/404');
    }
  }, [])


  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowPasswordCheck = () => {
    setValues({ ...values, showPasswordCheck: !values.showPasswordCheck })
  }
  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    formState: { errors: personalErrors }
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema)
  })

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors }
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema)
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    socialReset({ google: '', twitter: '', facebook: '', linkedIn: '' })
    accountReset({ email: '', username: '', password: '', 'confirm-password': '' })
    personalReset({ country: '', language: [], 'last-name': '', 'first-name': '' })
  }

  const onSubmit = () => {
    setActiveStep(activeStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  // Handle Confirm Password
  const handleClickShowConfirmPassword = () => {
    setState({ ...state, showPassword2: !state.showPassword2 })
  }
  const onCheckNameServer = async () => {
    try {
      const response = await axiosIns().get(`/api/v1/auth/name-server?dns=${values?.dns}`);
      if (response.status == 200) {
        setActiveStep(activeStep + 1);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message);
    }
  }
  const onRegister = async () => {
    try {
      if (values.password != values.passwordCheck) {
        toast.error('비밀번호가 일치하지 않습니다.');

        return;
      }
      let obj = { ...values };
      obj['user_pw'] = obj?.password;
      delete obj['password'];
      delete obj['showPassword'];
      delete obj['passwordCheck'];
      delete obj['showPasswordCheck'];
      const response = await axiosIns().post('/api/v1/auth/sign-up/brand', obj);
      setToken(response?.data?.access_token);
      if (response?.status == 200 && response?.data?.user) {
        setActiveStep(activeStep + 1);
      }
    } catch (err) {
      let push_lick = await processCatch(err);
    }
  }
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openSearchOption = async () => {
    await handleClickOpen();
  }
  const goToManagerPage = async () => {
    window.location.href = `https://${values?.dns}`
  }
  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[0].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[0].subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ol>
                <li>
                  <a href='https://domain.gabia.com' style={{ marginRight: '6px', textDecoration: 'none' }}>가비아</a>
                  또는 도메인을 구입한 사이트
                  에 접속하여 사용할 도메인을 구입합니다.</li>
                <li>등록할 도메인 관리 탭을 클릭합니다.</li>
                <li>네임서버 설정에 들어갑니다.</li>
                <li>
                  <div style={{ display: 'flex' }}>
                    <div>1차 호스트명에</div>
                    <Grid sx={{ mr: 2, ml: 2, fontWeight: 'bold' }}>"ns1.vercel-dns.com" </Grid>
                    <div>입력, 2차 호스트명에 </div>
                    <Grid sx={{ mr: 2, ml: 2, fontWeight: 'bold' }}>"ns2.vercel-dns.com" </Grid>
                    <div>을 입력 후 저장합니다.</div>
                  </div>
                </li>
                <li>위 과정이 완료 되었을 시, 오른쪽 NEXT 버튼을 클릭하여 다음 단계로 넘어갑니다.</li>
              </ol>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' disabled>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={() => setActiveStep(activeStep + 1)}>
                Next
              </Button>
            </Grid>
          </Grid>
        )
      case 1:
        return (
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[1].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[1].subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField autoFocus fullWidth id='dns' value={values?.dns} onChange={handleChange('dns')} onKeyPress={(e) => { e.key == 'Enter' ? onCheckNameServer() : '' }} placeholder='example.com' label='도메인입력' sx={{ mb: 4 }} />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={() => setActiveStep(activeStep - 1)}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={onCheckNameServer}>
                Next
              </Button>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[2].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[2].subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoFocus fullWidth id='name' value={values?.name} onChange={handleChange('name')} onKeyPress={(e) => { e.key == 'Enter' ? $('#user_name').focus() : '' }} label='브랜드명' sx={{ mb: 4 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id='user_name' value={values?.user_name} onChange={handleChange('user_name')} onKeyPress={(e) => { e.key == 'Enter' ? $('#auth-login-password').focus() : '' }} label='본사아이디' sx={{ mb: 4 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel htmlFor='auth-login-password'>비밀번호</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  onKeyPress={(e) => { e.key == 'Enter' ? $('#auth-login-password-check').focus() : '' }}
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 1.5 }}>
                <InputLabel htmlFor='auth-login-password-check'>비밀번호확인</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.passwordCheck}
                  id='auth-login-password-check'
                  onChange={handleChange('passwordCheck')}
                  onKeyPress={(e) => { e.key == 'Enter' ? onRegister() : '' }}
                  type={values.showPasswordCheck ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={values.showPasswordCheck ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={onRegister}>
                Next
              </Button>
            </Grid>
          </Grid>
        )
      case 3:
        return (
          <form key={3} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[3].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[3].subtitle}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                최초 접속 후 하단 순서대로 세팅을 진행해주세요.
              </Grid>
              <Grid item xs={12}>
                <ol>
                  <li>브랜드 관리</li>
                  <li>가맹점 관리</li>
                </ol>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={goToManagerPage} size='large' type='submit' variant='contained'>
                  관리자페이지로
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return getStepContent(activeStep)
    }
  }

  return (
    <Box className='content-center'>
      <Card>
        <CardContent>
          <StepperWrapper>
            <Stepper activeStep={activeStep}>
              {steps.map((step, index) => {
                const labelProps = {}
                if (index === activeStep) {
                  labelProps.error = false
                  if (
                    (accountErrors.email ||
                      accountErrors.username ||
                      accountErrors.password ||
                      accountErrors['confirm-password']) &&
                    activeStep === 0
                  ) {
                    labelProps.error = true
                  } else if (
                    (personalErrors.country ||
                      personalErrors.language ||
                      personalErrors['last-name'] ||
                      personalErrors['first-name']) &&
                    activeStep === 1
                  ) {
                    labelProps.error = true
                  } else if (
                    (socialErrors.google || socialErrors.twitter || socialErrors.facebook || socialErrors.linkedIn) &&
                    activeStep === 2
                  ) {
                    labelProps.error = true
                  } else {
                    labelProps.error = false
                  }
                }

                return (
                  <Step key={index}>
                    <StepLabel {...labelProps} StepIconComponent={StepperCustomDot}>
                      <div className='step-label'>
                        <Typography className='step-number'>{`0${index + 1}`}</Typography>
                        <div>
                          <Typography className='step-title'>{step.title}</Typography>
                          <Typography className='step-subtitle'>{step.subtitle}</Typography>
                        </div>
                      </div>
                    </StepLabel>
                  </Step>
                )
              })}
            </Stepper>
          </StepperWrapper>
        </CardContent>

        <Divider sx={{ m: '0 !important' }} />

        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default Register
