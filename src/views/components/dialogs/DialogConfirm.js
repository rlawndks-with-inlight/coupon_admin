// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
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
const DialogConfirm = (props) => {
  const { open, handleClose, onKeepGoing, text, subText, data, saveText } = props;

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{text}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            {subText}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={() => onKeepGoing(data)}>{saveText}</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogConfirm
