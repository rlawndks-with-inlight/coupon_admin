// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

const DialogAlert = (props) => {
  const { handleClickOpen, handleClose, isOpen } = props;


  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Use Google's location service?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no
          apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions className='dialog-actions-dense'>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>

  )
}

export default DialogAlert
