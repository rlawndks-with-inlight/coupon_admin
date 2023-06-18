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
import { InputAdornment, TextField } from '@mui/material'
import { useTheme } from '@emotion/react'
import styled from 'styled-components'
import { themeObj } from './style-component'
import { Icon } from '@iconify/react'
import { axiosIns } from 'src/@fake-db/backend'
import { getCookie, setCookie } from 'src/@core/utils/react-cookie'
import $ from 'jquery';
import { Toaster, toast } from 'react-hot-toast'
import { setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

import Slide from '@mui/material/Slide'
import { useEffect } from 'react'
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />
})

const Title = styled.div`
font-size: ${themeObj.font_size.font4};
padding: 0 0 1rem 0;
`
const Content = styled.div`
display:flex;
flex-direction:column;
width:100%;
max-width:700px;
margin: 0 auto;
`
const DialogResign = (props) => {
  // ** State
  const { open, handleClose, style, } = props;

  return (
    <div>
      <Dialog fullScreen aria-labelledby='full-screen-dialog-title' open={open} TransitionComponent={Transition}>
        <div style={{ ...style, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <DialogTitle id='full-screen-dialog-title' style={{ paddingBottom: '0rem' }}>
            <Typography variant='h6' component='span' style={{ display: 'flex' }}>
              <div style={{ display: 'flex', margin: 'auto', fontWeight: 'bold' }}>
                회원탈퇴
              </div>
            </Typography>
            <IconButton
              aria-label='close'
              onClick={() => handleClose(true)}
              sx={{ top: 18, left: 10, position: 'absolute', color: 'grey.500' }}
            >
              <Icon icon='ooui:previous-ltr' style={{ fontSize: themeObj.font_size.font1 }} />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Title style={{ padding: '0 0 1rem 0', margin: '0 auto', width: '100%', maxWidth: '700px', fontSize: themeObj.font_size.font2, fontWeight: 'bold' }}>
              정말로 탈퇴하시겠습니까?
            </Title>
            <Title style={{ padding: '0 0 1rem 0', margin: '0 auto', width: '100%', maxWidth: '700px' }}>
              한번 삭제된 정보는 복구가 불가능합니다.
              <br />
              재가입은 탈퇴일로부터 30일 후 가능합니다.
            </Title>
            <Button type='submit' variant='contained' sx={{ mr: 2, margin: 'auto auto 8rem auto', height: '50px', width: '90%', maxWidth: '500px' }} >
              탈퇴
            </Button>
          </DialogContent>

        </div>
        <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
      </Dialog>
    </div>
  )
}

export default DialogResign
