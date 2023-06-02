// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import { InputAdornment, TextField, useMediaQuery } from '@mui/material'
import { useTheme } from '@emotion/react'
import styled, { css } from 'styled-components'
import { Font3, Font4, themeObj } from './style-component'
import { Icon } from '@iconify/react'
import { axiosIns } from 'src/@fake-db/backend'
import { getCookie, setCookie } from 'src/@core/utils/react-cookie'
import $ from 'jquery';
import { Toaster, toast } from 'react-hot-toast'

import Slide from '@mui/material/Slide'
import { useEffect } from 'react'
import { onPostWebview } from 'src/@core/utils/webview-connect'


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />
})

const Title = styled.div`
font-size: ${themeObj.font_size.font4};
padding: 0 0 1rem 0;
@media (max-width:350px) {
  font-size:${themeObj.font_size.font5};
}
`
const Content = styled.div`
display:flex;
flex-direction:column;
width:100%;
max-width:700px;
margin: 0 auto;
`
const CustomTextField = styled(TextField)`
@media (max-width:350px) {
  label {
    font-size: ${themeObj.font_size.font4};
    margin-top: 0.15rem;
  }
}
`;
const GreyContainer = styled.div`
padding:0.5rem;
border-radius:4px;
font-size: ${themeObj.font_size.font5};
margin-top:1rem;
`

function Countdown({ seconds, timeLeft, setTimeLeft }) {

  useEffect(() => {
    // 1초마다 timeLeft 값을 1씩 감소시킵니다.
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머를 정리합니다.
    return () => clearInterval(timer);
  }, [seconds]);

  return <Font3 style={{
    right: '100px',
    position: 'absolute',
    color: themeObj.red
  }}>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</Font3>;
}
const DialogLoginForm = (props) => {
  // ** State
  const { open, handleClose, onKeepGoing, dnsData, style, router, snsData, onSignIn, onSignUp, verificationCode } = props;

  const theme = useTheme();

  const [keyword, setKeyword] = useState('');

  const [focusItem, setFocusItem] = useState('');

  const [values, setValues] = useState({
    phone_num: '',
    rand_num: '',
    is_exist: false,
  })
  const [isSendSms, setIsSendSms] = useState(false);
  const [isCheckPhone, setIsCheckPhone] = useState(false);

  const isMobile = useMediaQuery('(max-width: 350px)')

  useEffect(() => {
    if (open) {
      setIsSendSms(false)
      setIsCheckPhone(false)
    }
  }, [open])
  useEffect(() => {
    if (verificationCode) {
      setValues({ ...values, ['rand_num']: verificationCode })
    }
  }, [verificationCode])
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const requestVerifyCode = async () => {
    try {
      const response = await axiosIns().post(`/api/v1/app/auth/verify/code`, {
        dns: dnsData?.dns,
        phone_num: values?.phone_num,
        hash_key: 'xbTl1F9+TKm',
      })
      setValues({ ...values, ['is_exist']: response?.data?.is_exist })
      $('.rand_num').focus();
      toast.success("인증번호가 성공적으로 전송 되었습니다.");
      setIsSendSms(true);
      setIsCheckPhone(false);
      setTimeLeft(180);
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message);
    }
  }
  const requestVerify = async () => {
    try {
      const response = await axiosIns().post(`/api/v1/app/auth/verify`, {
        rand_num: values.rand_num,
        phone_num: values?.phone_num
      })
      if (!response?.data?.phone_token) {
        toast.error("인증번호가 일치하지 않습니다.");
        return;
      }
      await setCookie('phone_token', response?.data?.phone_token, {
        path: "/",
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAME_SITE,
      });
      toast.success("인증번호가 일치합니다.");
      setIsCheckPhone(true)
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  }

  const onConfirm = async () => {
    if (!isSendSms) {
      toast.error('휴대폰 인증번호를 발송해 주세요.');
      return;
    }
    if (!isCheckPhone) {
      toast.error('휴대폰 인증을 완료해 주세요.');
      return;
    }
    if (snsData?.login_type == 0) {//일반 휴대폰 로그인
      try {
        if (!values.is_exist) {//휴대폰으로 로그인일때 회원이 존재 안할때
          let result = await onSignUp({
            dns: dnsData?.dns,
            phone_num: values?.phone_num,
            login_type: 0,
            phone_token: getCookie('phone_token')
          })
        }
        let result = await onSignIn({
          dns: dnsData?.dns,
          phone_num: values?.phone_num,
          login_type: 0,
          token: getCookie('phone_token')
        })
      } catch (err) {
        console.log(err)
      }
    } else {//sns 로그인
      try {
        let result = await onSignIn({
          dns: dnsData?.dns,
          phone_num: values?.phone_num,
          login_type: snsData?.login_type,
          token: snsData?.id
        })
      } catch (err) {
        if (err?.response?.status == 409 || err?.response?.status == 403) {
          let result = await onSignUp({
            dns: dnsData?.dns,
            phone_num: values?.phone_num,
            login_type: snsData?.login_type,
            phone_token: getCookie('phone_token'),
            sns_token: snsData?.id
          })
          let result2 = await onSignIn({
            dns: dnsData?.dns,
            phone_num: values?.phone_num,
            login_type: snsData?.login_type,
            token: snsData?.id
          })
        }
      }
    }
  }

  const [timeLeft, setTimeLeft] = useState(180);
  // useEffect(() => {
  //   onPostWebview('message_time_left', {
  //     time_left: timeLeft
  //   })
  // }, [timeLeft])
  return (
    <div>
      <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open} TransitionComponent={Transition}>
        <div style={{ ...style, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <DialogTitle id='full-screen-dialog-title' style={{ paddingBottom: '0rem' }}>
            <Typography variant='h6' component='span' style={{ display: 'flex' }}>
              <div style={{ display: 'flex', margin: 'auto', fontWeight: 'bold' }}>
                휴대전화로 로그인
              </div>
            </Typography>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ top: 18, left: 10, position: 'absolute', color: 'grey.500' }}
            >
              <Icon icon='ooui:previous-ltr' style={{ fontSize: themeObj.font_size.font1 }} />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Title style={{ padding: '0 0 1rem 0', margin: '0 auto', width: '100%', maxWidth: '700px' }}>
              휴대전화번호를 등록하셔야 멤버십 적립이 가능합니다.
              <br />
              개인정보 수탁사 : 업무의 내용 :  인증번호 문자 발송 대행
            </Title>
            <Content>
              <Title
                style={{
                  padding: '1rem 0 0.5rem 0',
                  fontWeight: 'bold'
                }}>휴대전화번호 입력</Title>
              <CustomTextField
                id='icons-start-adornment'
                label='휴대전화번호 입력'
                size='small'
                type='tel'
                onFocus={() => {
                  setFocusItem('phone_num');
                }}
                className='phone-num'
                onBlur={() => {
                  if (focusItem == 'phone_num') {
                    setFocusItem('')
                  }
                }}
                onChange={handleChange('phone_num')}
                style={{ width: '100%', marginTop: '0.5rem' }}
                InputProps={{
                  style: {
                    fontSize: (isMobile ? themeObj.font_size.font4 : ''),
                    height: '39px'
                  },
                  endAdornment: <InputAdornment position='end'>
                    <Button variant='contained' color='secondary'
                      style={{
                        transform: `translateX(14px)`,
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0',
                        fontSize: themeObj.font_size.font4,
                        padding: '8px',
                        background: `${focusItem == 'phone_num' ? dnsData?.theme_css?.main_color : ''}`,
                        width: '90px',
                        height: '39px'
                      }}
                      onClick={requestVerifyCode}
                    >
                      인증번호 발송
                    </Button>
                  </InputAdornment>
                }}
              />
              <CustomTextField
                id='icons-start-adornment'
                label='인증번호 입력'
                size='small'
                type='tel'
                style={{
                  width: '100%',
                  paddingRight: '0',
                  marginTop: '1rem',
                }}
                className='phone-check'
                onFocus={() => {
                  setFocusItem('rand_num');
                }}
                onBlur={() => {
                  if (focusItem == 'rand_num') {
                    setFocusItem('')
                  }
                }}
                onChange={handleChange('rand_num')}
                InputProps={{
                  style: {
                    fontSize: (isMobile ? themeObj.font_size.font4 : ''),
                    height: '39px'
                  },
                  endAdornment: <InputAdornment position='end'>
                    <Button variant='contained' color='secondary'
                      style={{
                        transform: `translateX(14px)`,
                        borderTopLeftRadius: '0',
                        borderBottomLeftRadius: '0',
                        fontSize: themeObj.font_size.font4,
                        background: `${isCheckPhone ? themeObj.green : (focusItem == 'rand_num' ? dnsData?.theme_css?.main_color : '')}`,
                        color: '#fff',
                        width: '90px',
                        height: '39px'
                      }}
                      onClick={requestVerify}
                      disabled={isCheckPhone}
                    >
                      {isCheckPhone ? '확인 완료' : '인증번호 확인'}
                    </Button>
                    {isSendSms && !isCheckPhone ?
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
                  </InputAdornment>
                }}
                InputLabelProps={{

                }}
              />
              <GreyContainer style={{ background: `${theme.palette.mode == 'dark' ? '' : themeObj.grey[100]}` }}>
                <Title
                  style={{
                    padding: '0',
                    fontWeight: 'bold'
                  }}>휴대전화번호 입력</Title>
                <div>목적: 스탬프 적립, 쿠폰사용 등 사용 및 취소정보, CS신청정보</div>
                <div>항목: 휴대전화번호</div>
                <div>보유기간: 회원탈퇴 즉시 또는 이용 목적 달성 즉시 파기</div>
              </GreyContainer>
              {/* <TextInputComponent
                dnsData={dnsData} />
              <TextInputComponent
                dnsData={dnsData} /> */}
            </Content>
          </DialogContent>
          <Button onClick={onConfirm} type='submit' variant='contained' sx={{ mr: 2, margin: 'auto auto 24px auto', height: '50px', width: '90%', maxWidth: '500px' }} >
            로그인
          </Button>
        </div>
        <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
      </Dialog>
    </div>
  )
}

export default DialogLoginForm
