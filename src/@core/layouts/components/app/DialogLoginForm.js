// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import { InputAdornment, TextField } from '@mui/material'
import { useTheme } from '@emotion/react'
import styled from 'styled-components'
import { themeObj } from './style-component'
import { Icon } from '@iconify/react'

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

const DialogLoginForm = (props) => {
  // ** State
  const { open, handleClose, onKeepGoing } = props;

  const theme = useTheme();

  const [keyword, setKeyword] = useState('');
  return (
    <div>

      <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open}>
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
            휴대전화번호를 등록하셔야 스탬프 적립이 가능합니다.
            <br />
            개인정보 수탁사 : 업무의 내용 :  인증번호 문자 발송 대행
          </Title>
          <Content>
            <Title
              style={{
                padding: '1rem 0 0.5rem 0',
                fontWeight: 'bold'
              }}>휴대전화번호 입력</Title>
            <TextField
              id='icons-start-adornment'
              label='휴대전화번호 입력'
              size='small'
              style={{ width: '100%' }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <Button variant='contained' color='secondary'
                    style={{
                      transform: `translateX(13px)`,
                      borderTopLeftRadius: '0',
                      borderBottomLeftRadius: '0',
                      fontSize: themeObj.font_size.font3,
                      padding: '9px'
                    }}>
                    인증번호 발송
                  </Button>
                </InputAdornment>
              }}
            />
            <TextField
              id='icons-start-adornment'
              label='인증번호 입력'
              size='small'
              style={{ width: '100%', paddingRight: '0', marginTop: '0.5rem' }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <Button variant='contained' color='secondary'
                    style={{
                      transform: `translateX(13px)`,
                      borderTopLeftRadius: '0',
                      borderBottomLeftRadius: '0',
                      fontSize: themeObj.font_size.font3,
                      padding: '9px'
                    }}>
                    인증번호 확인
                  </Button>
                </InputAdornment>
              }}
            />
          </Content>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogLoginForm
