// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import MuiDialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})
const DialogForm = (props) => {
  const { open, setOpen, handleClickOpen, handleClose, data, changePassword, headIcon } = props;
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    setClickCount(0);
  }, [open])
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: '0 auto' }}>{headIcon}</div>
          <DialogTitle id='form-dialog-title' style={{ margin: "0 auto" }}>{data?.table} {data?.phone_num || data?.user_name} 비밀번호 변경</DialogTitle>
          <DialogContentText style={{ margin: "0 auto" }} >
            {'변경할 비밀번호를 입력해 주세요.'}
          </DialogContentText>
          <DialogContent>
            <TextField sx={{ marginBottom: '12px' }} autoComplete='new-password' id='new-pw' autoFocus fullWidth type='password' label='새비밀번호' />
            <TextField id='new-pw-check' autoComplete='new-password' fullWidth type='password' label='새비밀번호 확인' />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button sx={{ ml: "auto" }} type='submit' variant='contained' onClick={() => {
              if (clickCount == 0) {
                changePassword();
              }
              setClickCount(clickCount + 1);
            }}>저장</Button>
            <Button sx={{ mr: "auto" }} type='submit' variant='contained' onClick={handleClose}>취소</Button>
          </DialogActions>
        </div>
      </Dialog>
    </Fragment>
  )
}

export default DialogForm
