// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
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
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
// ** Custom Components Imports
import StepperCustomDot from 'src/views/forms/form-wizard/StepperCustomDot'
// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { axiosIns, notiAxiosIns } from 'src/@fake-db/backend'
import { useRouter } from 'next/router'

import { handleLogout, processCatch } from 'src/@core/utils/function'
import DialogAddress from 'src/views/components/dialogs/DialogAddress'
import { FormHelperText, MenuItem, Select } from '@mui/material'
import { getCookie, setCookie } from 'src/@core/utils/react-cookie'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { Font2, themeObj } from 'src/@core/layouts/components/app/style-component'
import FallbackSpinner from 'src/@core/components/spinner'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import dynamic from 'next/dynamic';
const Tour = dynamic(
  () => import('reactour'),
  { ssr: false },
);

function Countdown({ seconds, timeLeft, setTimeLeft, style }) {

  useEffect(() => {
    // 1초마다 timeLeft 값을 1씩 감소시킵니다.
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머를 정리합니다.
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <>
      {timeLeft > 0 ?
        <>
          <Font2 style={{
            color: themeObj.red,
            marginLeft: 'auto',
            ...style
          }}>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</Font2>
        </>
        :
        <>
        </>}
    </>
  );
}
const ColumnContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1.5rem',
  maxWidth: '450px',
  width: '100%',
  margin: '1.5rem auto 0 auto',
}))
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '80rem' }
}))

const steps = [
  {
    title: '가맹점 정보입력',
    subtitle: '가맹점 정보를 입력합니다.'
  },
  {
    title: '계약서 작성',
    subtitle: '계약서를 읽고 동의합니다.'
  },
  {
    title: '결제수단등록',
    subtitle: '결제수단을 등록합니다.'
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
const TourComponent = (props) => {
  return (
    <>
    </>
  )
}
const Register = () => {
  // ** States
  const router = useRouter();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0)
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [embeddedUrl, setEmbeddedUrl] = useState("");
  const [isTryRegister, setIsTryRegister] = useState(false);
  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const [values, setValues] = useState({
    user_name: '',
    nick_name: '',
    user_pw: '',
    mcht_name: '',
    addr: '',
    phone_num: '',
    stamp_flag: 0,
    stamp_save_count: 1,
    point_flag: 0,
    point_rate: 0,
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
    checkAuth();
  }, [])
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
        setValues(response_auth)
        setUserData(response_auth);
        if (!response_auth?.user_name) {
          setActiveStep(0);
        } else if (response_auth?.contract_status != 2) {
          setActiveStep(1);
        } else if (!response_auth?.bill_key) {
          setActiveStep(2);

        } else {
          setTourSteps([
            {
              selector: '.goto-manager',
              content: '컴어게인의 친구가 되어주셔서 감사합니다!😀\n저희와 함께 즐거운 모험을 떠나볼까요? 🎉🎉',
            },
          ])
          setTourOpen(true);
          setActiveStep(3);
        }
      }
    } catch (err) {
      //
      if (err.response.status == 401) {
        setTourSteps([
          {
            selector: '.input-user-info',
            content: '가맹점 기본정보를 입력해 주세요.',
          },
        ])
        setTourOpen(true);
      }
      console.log(err)
    }
  }
  useEffect(() => {
    if (activeStep == 1) {
      getContractInfo();
    }
    if (activeStep == 2 && !userData?.bill_key) {
      setTourSteps([
        {
          selector: '.card-info',
          content: "정기결제에 사용될 카드정보를 입력해 주세요.",
        },
      ])
      setTourOpen(true);
    }
    if ((activeStep == 1 || activeStep == 2) && timeLeft < 0) {
      setTimeLeft(180)
    }
  }, [activeStep])
  useEffect(() => {
    $('html').click(function () {
      setTimeLeft(180)
      handleTimeLeftClose();
    });
    $(document).keydown(function (event) {
      setTimeLeft(180)
      handleTimeLeftClose();
    });
  }, [])
  const getContractInfo = async () => {
    try {
      const response = await axiosIns().post(`/api/v1/auth/contract/create`, {
        return_url: `${window.location.protocol}//${window.location.host}/manager/register/merchandise?is_wait_contract=1`
      });
      setEmbeddedUrl(response?.data?.embedded_url);
      if (userData?.contract_status != 2) {
        if (!router.query?.is_wait_contract) {
          setTourSteps([
            {
              selector: '.goto-contract',
              content: "'계약하기' 버튼을 클릭 후 계약을 진행해 주세요.",
            },
          ])
          setTourOpen(true);
        } else {
          setTimeout(() => {
            getContractInfo();
          }, 3000)
        }
      }
    } catch (err) {
      if (err.response.status == 409) {
        setUserData(Object.assign(userData, {
          contract_status: 2
        }))
      }
      console.log(err)
    }
  }
  const handleChange = prop => event => {
    if (prop == 'phone_num') {
      if (isNaN(parseInt(event.target.value[event.target.value.length - 1])) && values.phone_num.length != 1) {
        return;
      }
    }
    setValues({ ...values, [prop]: event.target.value })
    if (prop == 'point_flag') {
      if (event.target.value == 1) {
        setTourSteps([
          {
            selector: '.point-info',
            content: '상품당 포인트 적립률을 입력해 주세요.\n ex) 2 입력 -> 1000원 상품 구매시, 2%인 20포인트 적립',
          },
        ])
        setTourOpen(true);
      }
    }
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

  const onRegister = async () => {
    try {
      if (userData?.user_name) {
        setActiveStep(activeStep + 1);
        return;
      }
      if (
        !values.user_name ||
        !values.nick_name ||
        !values.password ||
        !values.passwordCheck ||
        !values.addr ||
        !values.mcht_name ||
        !values.phone_num
      ) {
        setIsTryRegister(true);
        toast.error('필수값을 입력해 주세요.');
        return;
      }
      if (values?.point_flag == 0 && values?.stamp_flag == 0) {
        setIsTryRegister(true);
        toast.error('스탬프나 포인트중 최소 하나는 사용해 주세요.');
        return;
      }
      if (values?.point_flag == 1 && values?.point_rate <= 0) {
        setIsTryRegister(true);
        toast.error('포인트 적립률을 입력해 주세요.');
        return;
      }
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
      const response = await axiosIns().post('/api/v1/auth/sign-up/merchandise', obj);
      console.log(response)
      setToken(response?.data?.access_token);
      let result = await handleLogout(router, '#')
      await setCookie('o', response?.data?.access_token, {
        path: "/",
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE,
      });
      if (response?.status == 201 && response?.data?.user) {
        setLocalStorage(LOCALSTORAGE.USER_DATA, JSON.stringify(response?.data?.user));
        setActiveStep(activeStep + 1);
        toast.success("회원가입이 성공적으로 되었습니다.\n앞으로 유저아이디 및 비밀번호로 로그인 가능합니다.\n이어서 다음 절차를 진행해 주세요.")
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
    window.location.href = `/manager/users`
  }
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);
  const onSelectAddressOpen = () => {
    setSelectAddressOpen(true);
  }
  const handletSelectAddressClose = () => setSelectAddressOpen(false);
  const onSelectAddress = (data) => {
    handletSelectAddressClose();
    setValues({ ...values, ['addr']: data?.address })
  }
  //card start
  const [cvc, setCvc] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [focus, setFocus] = useState()
  const [expiry, setExpiry] = useState('')
  const [authNo, setAuthNo] = useState("");
  const [cardPw, setCardPw] = useState("");
  const [cardErrorColumn, setCardErrorColumn] = useState({});
  const handleBlur = () => setFocus(undefined)
  const handleInputChange = ({ target }) => {

    if (target.name === 'cardNumber') {
      setCardErrorColumn("")
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      setCardErrorColumn("")
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }
  const onRegisterBillKey = async (param) => {
    try {

      let obj = {
        amount: 100,
        item_nm: `컴어게인 ${userData?.mcht_name} 가맹점 구독신청`,
        card_num: cardNumber.replaceAll(' ', ''),
        yymm: `${expiry.split('/')[1]}${expiry.split('/')[0]}`,
        instment: '00',
        auth_no: authNo,
        card_pw: cardPw
      }
      const response = await notiAxiosIns().post(`/api/v2/comagain/billkey/subscribe${param}`, obj);
      if (response?.status == 200) {
        toast.success("성공적으로 카드가 저장 되었습니다.")
        setActiveStep(activeStep + 1);
        handleEditConfirmClose();
        setUserData({ ...userData, ['bill_key']: response?.data?.billKey })
        setLocalStorage(LOCALSTORAGE.USER_DATA, JSON.stringify({ ...userData, ['bill_key']: response?.data?.billKey }));
        checkAuth();
      }
    } catch (err) {
      toast.error(err?.response?.data?.result_msg)
      let expiry_error_list = ['CA20'];
      let card_pw_error_list = ['CA27', 'CA28', 'CA29'];
      let card_number_error_list = ['CA50', 'CA51', 'CA52', 'CA53', 'CA54', 'CA55', 'CA56', 'CA57'];
      if (expiry_error_list.includes(err?.response?.data?.result_cd)) {
        setCardErrorColumn('expiry')
      }
      if (card_pw_error_list.includes(err?.response?.data?.result_cd)) {
        setCardErrorColumn('cardPw')
      }
      if (card_number_error_list.includes(err?.response?.data?.result_cd)) {
        setCardErrorColumn('cardNumber')
      }
      handleEditConfirmClose();
    }
  }
  //card end
  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p' style={{ fontSize: '14px' }}>
                  {steps[0].subtitle}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ mt: '0' }} className='input-user-info'>
              <Grid item xs={12} sm={6} >
                <TextField fullWidth label='유저아이디' placeholder='유저아이디를 입력해 주세요.' className='user_name' inputProps={{
                }} onChange={handleChange('user_name')} onFocus={closeTour} defaultValue={values?.user_name} value={values?.user_name} error={isTryRegister && !values?.user_name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='대표자명' placeholder='대표자명을 입력해 주세요.' onFocus={closeTour} className='nick_name' onChange={handleChange('nick_name')} defaultValue={values?.nick_name} value={values?.nick_name} error={isTryRegister && !values?.nick_name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 1.5 }}>
                  <InputLabel htmlFor='auth-login-password'>비밀번호</InputLabel>
                  <OutlinedInput
                    label='Password'
                    onFocus={closeTour}
                    value={values?.password}
                    error={isTryRegister && !values?.password}
                    id='auth-login-password'
                    onChange={handleChange('password')}
                    onKeyPress={(e) => { e.key == 'Enter' ? $('#auth-login-password-check').focus() : '' }}
                    type={values?.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          aria-label='toggle password visibility'
                        >
                          <Icon icon={values?.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
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
                    helperText='Some important text'
                    error={(values?.passwordCheck && (values?.password != values?.passwordCheck)) || (isTryRegister && !values?.passwordCheck)}
                    onFocus={closeTour}
                    label='Password'
                    value={values?.passwordCheck}
                    id='auth-login-password-check'
                    onChange={handleChange('passwordCheck')}
                    onKeyPress={(e) => { e.key == 'Enter' ? onRegister() : '' }}
                    type={values?.showPasswordCheck ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPasswordCheck}
                          aria-label='toggle password visibility'
                        >
                          <Icon icon={values?.showPasswordCheck ? 'tabler:eye' : 'tabler:eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {values?.passwordCheck && (values?.password != values?.passwordCheck) ?
                    <>
                      <FormHelperText error id="accountId-error">
                        {'비밀번호가 일치하지 않습니다.'}
                      </FormHelperText>
                    </>
                    :
                    <>
                    </>}
                </FormControl>

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='가맹점 상호' error={isTryRegister && !values?.mcht_name} onFocus={closeTour} placeholder='가맹점 상호를 입력해 주세요. ex)홍길동덮밥 수원점' className='mcht_name' onChange={handleChange('mcht_name')} defaultValue={values?.mcht_name} value={values?.mcht_name} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='가맹점 주소' error={isTryRegister && !values?.addr} onFocus={closeTour} placeholder='가맹점 주소를 입력해 주세요.' className='addr' onChange={handleChange('addr')} inputProps={{
                  readOnly: true,
                }} defaultValue={values?.addr} value={values?.addr}
                  onClick={onSelectAddressOpen}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label='휴대폰번호' error={isTryRegister && !values?.phone_num} onFocus={closeTour} placeholder='휴대폰번호를 입력해 주세요.' className='phone_num' onChange={handleChange('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num} type='number' />
              </Grid>
              <Grid item xs={12} sm={6} />
            </Grid>
            <Grid container spacing={5} sx={{ mt: '0' }} >
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth
                  error={isTryRegister && (values?.stamp_flag == 0 && values?.point_flag == 0)}
                >
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>스탬프 사용여부</InputLabel>
                  <Select
                    label='Country'
                    id='form-layouts-tabs-select'
                    labelId='form-layouts-tabs-select-label'
                    className='stamp_flag'
                    onChange={handleChange('stamp_flag')}
                    defaultValue={values?.stamp_flag}
                    value={values?.stamp_flag}
                  >
                    <MenuItem value='0'>사용안함</MenuItem>
                    <MenuItem value='1'>사용</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className='stamp-info'>

              </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ mt: '0' }} >
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth
                  error={isTryRegister && (values?.stamp_flag == 0 && values?.point_flag == 0)}
                >
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>포인트 사용여부</InputLabel>
                  <Select
                    label='Country'
                    id='form-layouts-tabs-select'
                    labelId='form-layouts-tabs-select-label'
                    className='point_flag'
                    onChange={handleChange('point_flag')}
                    defaultValue={values?.point_flag}
                    value={values?.point_flag}
                  >
                    <MenuItem value='0'>사용안함</MenuItem>
                    <MenuItem value='1'>사용</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className='point-info'>
                {values?.point_flag == 1 ?
                  <>
                    <TextField
                      fullWidth
                      error={isTryRegister && (values?.point_rate <= 0 && values?.point_flag)}
                      label='포인트 적립률'
                      placeholder='포인트 적립률을 입력해 주세요.'
                      className='point_rate'
                      onChange={handleChange('point_rate')}
                      onFocus={closeTour}
                      defaultValue={values?.point_rate}
                      value={values?.point_rate}
                    />
                  </>
                  :
                  <>
                  </>}
              </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ mt: '0' }}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={() => {
                  handleLogout(router, '/manager/login/merchandise')
                }}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained' onClick={onRegister}>
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        )
      case 1:
        return (
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px' }}>
                {steps[1].title}
              </Typography>
              <Typography variant='caption' component='p' style={{ fontSize: '14px' }}>
                {steps[1].subtitle}<br />
                본 계약서의 유효기간은 링크이동 기준 14일 입니다.<br />
                14일 안에 계약서 작성완료 부탁 드립니다.
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
              {userData?.contract_status == 2 ?
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div style={{ margin: 'auto auto 0 auto' }}>계약이 완료 되었습니다. 👏</div>
                    <Icon icon={'fluent-mdl2:completed'} style={{ fontSize: '40px', margin: '1rem auto 0 auto' }} />
                  </div>
                </>
                :
                <>
                  {embeddedUrl ?
                    <>
                      {router.query?.is_wait_contract ?
                        <>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div style={{ margin: 'auto auto 0 auto' }}>계약완료를 기다리는 중입니다.</div>
                            <FallbackSpinner sx={{ height: '20px', margin: '1rem auto 0 auto' }} />
                          </div>
                        </>
                        :
                        <>
                          <Button size='large' type='submit' variant='contained'
                            style={{ margin: 'auto', width: '180px' }}
                            onClick={() => { window.location.href = embeddedUrl }}
                            startIcon={<Icon icon='carbon:document' />}
                            className='goto-contract'>
                            계약하기
                          </Button>
                        </>}
                    </>
                    :
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <div style={{ margin: 'auto auto 0 auto' }}>계약서를 불러오는 중입니다...</div>
                        <FallbackSpinner sx={{ height: '20px', margin: '1rem auto 0 auto' }} />
                      </div>
                    </>}
                </>}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={() => setActiveStep(activeStep - 1)}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={() => {
                if (userData?.contract_status != 2 || true) {
                  setActiveStep(activeStep + 1);
                } else {
                  toast.error("계약서 동의를 완료하지 않았습니다.")
                }
              }}>
                Next
              </Button>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px' }}>
                {steps[2].title}
              </Typography>
              <Typography variant='caption' component='p' style={{ fontSize: '14px' }}>
                {steps[2].subtitle}<br />
                결제일 기준으로 매달 해당 일에 자동결제
                ex) 결제일 2023-06-10 {'->'}다음 결제일 2023-07-10
              </Typography>
            </Grid>
            <ColumnContainer className='card-info'>
              <Grid item xs={12} style={{ display: 'flex', margin: '0 auto' }}>
                <CardWrapper style={{ margin: '0 auto' }}>
                  <Cards cvc={cvc} focused={focus} expiry={expiry} name={' '} number={cardNumber} />
                </CardWrapper>
              </Grid>
              {userData?.bill_key ?
                <>
                  <div style={{ margin: 'auto', textAlign: 'center' }}>
                    카드 등록이 완료되었습니다.<br />
                    카드 수정을 원하시면 등록이 완료된 후,<br />
                    결제관리 {'>'} 정기결제등록 {'>'} 신용카드등록 에서 수정해 주세요.
                  </div>
                </>
                :
                <>
                  <TextField
                    fullWidth
                    name='cardNumber'
                    value={cardNumber}
                    autoComplete='off'
                    label='카드 번호 입력'
                    onBlur={handleBlur}
                    disabled={userData?.bill_key}
                    onChange={handleInputChange}
                    error={cardErrorColumn == 'cardNumber'}
                    placeholder='0000 0000 0000 0000'
                    onFocus={e => {
                      setFocus(e.target.name)
                      closeTour();
                    }}
                  />

                  <div style={{ display: 'flex', columnGap: '1.5rem' }}>
                    <TextField
                      fullWidth
                      name='expiry'
                      label='만료일'
                      value={expiry}
                      onBlur={handleBlur}
                      placeholder='MM/YY'
                      disabled={userData?.bill_key}
                      error={cardErrorColumn == 'expiry'}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: '5' }}
                      onFocus={e => {
                        setFocus(e.target.name)
                        closeTour();
                      }}
                    />
                    <TextField
                      fullWidth
                      name='cardPw'
                      label='카드비밀번호앞두자리'
                      value={cardPw}
                      autoComplete='off'
                      onBlur={handleBlur}
                      error={cardErrorColumn == 'cardPw'}
                      disabled={userData?.bill_key}
                      onChange={(e) => {
                        setCardPw(e.target.value)
                        setCardErrorColumn("")
                      }}
                      inputProps={{ maxLength: '2' }}
                      onFocus={e => {
                        setFocus(e.target.name)
                        closeTour();
                      }}
                      placeholder={'00'}
                      maxRows={'2'}
                      type={'password'}
                    />
                  </div>
                  <TextField
                    fullWidth
                    name='authNo'
                    label='카드소유자번호'
                    value={authNo}
                    onBlur={handleBlur}
                    disabled={userData?.bill_key}
                    onChange={(e) => { setAuthNo(e.target.value) }}
                    onFocus={e => {
                      setFocus(e.target.name)
                      closeTour();
                    }}
                    inputProps={{ maxLength: '12' }}
                    placeholder={'생년월일(YYMMDD) 또는 사업자등록번호'}
                  />
                </>}
            </ColumnContainer>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={() => setActiveStep(activeStep - 1)}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={onEditConfirmOpen}>
                Next
              </Button>
            </Grid>
          </>
        )
      case 3:
        return (
          <form key={3} onSubmit={handleSocialSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary', fontSize: '16px' }}>
                  {steps[3].title}
                </Typography>
                <Typography variant='caption' component='p' style={{ fontSize: '14px' }}>
                  {steps[3].subtitle}
                </Typography>
              </Grid>

              {/* <Grid item xs={12}>
                최초 접속 후 하단 순서대로 세팅을 진행해주세요.
              </Grid>
              <Grid item xs={12}>
                <ol>
                  <li>브랜드 관리</li>
                  <li>가맹점 관리</li>
                </ol>
              </Grid> */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={goToManagerPage} size='large' type='submit' variant='contained' className='goto-manager'>
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

  const [editConfirmOpen, setEditConfirmOpen] = useState(false);
  const handleEditConfirmClose = () => setEditConfirmOpen(false)
  const onEditConfirmOpen = (obj) => {
    if (userData?.bill_key) {
      if (userData?.contract_status != 2) {
        setActiveStep(1);
        return;
      }
      setActiveStep(activeStep + 1);
      return;
    }

    setEditConfirmOpen(true);
  }

  const [tourOpen, setTourOpen] = useState(false);
  const [tourSteps, setTourSteps] = useState([]);
  const closeTour = () => {
    setTourOpen(false);
    setTourSteps([]);
  };

  const [timeLeft, setTimeLeft] = useState(-1);
  const [timeLeftOpen, setTimeLeftOpen] = useState(false);
  const handleTimeLeftClose = () => setTimeLeftOpen(false);
  useEffect(() => {
    if (timeLeft == 60) {
      setTimeLeftOpen(true)
    }
    if (timeLeft == 0) {
      if (activeStep >= 1) {
        handleLogout(router, '/manager/login/merchandise')
      }
    }
  }, [timeLeft])
  return (
    <>
      <DialogAddress
        open={selectAddressOpen}
        handleClose={handletSelectAddressClose}
        onKeepGoing={onSelectAddress}
        text={'주소 선택'}
        subText={'삭제하시면 복구할 수 없습니다.'}
        saveText={'삭제'}
        headIcon={<Icon icon='tabler:trash' style={{ fontSize: '40px' }} />}
      />
      <DialogConfirm
        open={timeLeftOpen}
        handleClose={handleTimeLeftClose}
        onKeepGoing={() => {
          handleTimeLeftClose();
        }}
        text={"1분뒤 자동 로그아웃 됩니다.\n로그인화면에서 아이디 비번을 입력 후\n이어서 진행해 주세요."}
        //subText={'삭제하시면 복구할 수 없습니다.'}
        headIcon={<Countdown
          seconds={180}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          style={{
            fontSize: '20px'
          }}
        />}
        saveText={"확인"}
        isNotUseCancel={true}
      />
      <DialogConfirm
        open={editConfirmOpen}
        handleClose={handleEditConfirmClose}
        onKeepGoing={() => {
          if (userData?.bill_key) {
            onRegisterBillKey('-change');
          } else {
            onRegisterBillKey('');
          }
        }}
        text={"카드를 등록 하시겠습니까?"}
        //subText={'삭제하시면 복구할 수 없습니다.'}
        headIcon={<Icon icon='ion:card-outline' style={{ fontSize: '40px' }} />}
        saveText={"저장"}
      />
      <Tour
        steps={tourSteps}
        isOpen={tourOpen}
        disableInteraction={false}
        onRequestClose={closeTour} />
      <Box className='content-center'>
        <Card>
          <CardContent style={{ display: 'flex', flexDirection: 'column', paddingTop: `${activeStep >= 1 ? '0.5rem' : ''}` }}>
            {activeStep >= 1 && timeLeft > 0 ?
              <>
                <Countdown
                  seconds={180}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                />
              </>
              :
              <>
              </>}
            <StepperWrapper>
              <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                  const labelProps = {}
                  if (index === activeStep) {
                    labelProps.error = false
                  }
                  return (
                    <Step key={index} style={{ display: `${(window.innerWidth > 850 || activeStep == index) ? '' : 'none'}` }}>
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
    </>

  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default Register
