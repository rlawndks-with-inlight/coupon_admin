// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogForm = (props) => {
  const { open, setOpen, handleClickOpen, handleClose, data, changePassword } = props;

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{data?.table} {data?.user_name} 비밀번호 변경</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            {'변경할 비밀번호를 입력해 주세요.'}
          </DialogContentText>
          <TextField sx={{ marginBottom: '12px' }} autoComplete='new-password' id='new-pw' autoFocus fullWidth type='password' label='새비밀번호' />
          <TextField id='new-pw-check' autoComplete='new-password' fullWidth type='password' label='새비밀번호 확인' />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={changePassword}>저장</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogForm
