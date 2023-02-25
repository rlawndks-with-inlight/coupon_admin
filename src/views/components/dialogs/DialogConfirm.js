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
  const { open, handleClose, onKeepGoing, text, subText, data, saveText, headIcon } = props;

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: '0 auto' }}>{headIcon}</div>
          <DialogTitle id='form-dialog-title'>{text}</DialogTitle>
          <DialogContent>
            {subText ?
              <>
                <DialogContentText sx={{ mb: 3 }}>
                  {subText}
                </DialogContentText>
              </>
              :
              <>
              </>}
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button sx={{ ml: "auto" }} type='submit' variant='contained' onClick={() => onKeepGoing(data)}>{saveText}</Button>
            <Button sx={{ mr: "auto" }} type='submit' variant='contained' onClick={handleClose}>취소</Button>
          </DialogActions>
        </div>

      </Dialog>
    </Fragment>
  )
}

export default DialogConfirm;
