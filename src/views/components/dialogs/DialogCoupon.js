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
const DialogCoupon = (props) => {
  const { open, handleClose, data, onKeepGoing, head } = props;
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    setClickCount(0);
  }, [open])
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: '0 auto' }}>{head?.icon}</div>
          <DialogTitle id='form-dialog-title' style={{ margin: "0 auto" }}>{data?.table} {data?.user_name} {head?.title}</DialogTitle>
          <DialogContentText style={{ margin: "0 auto" }} >
            {head?.sub_title}
          </DialogContentText>
          <DialogContent>
            <TextField sx={{ marginBottom: '12px' }} id='user-name' autoComplete='new-password' autoFocus fullWidth label={head?.label} />
          </DialogContent>
          <DialogActions className='dialog-actions-dense'>
            <Button sx={{ ml: "auto" }} type='submit' variant='contained' onClick={() => {
              onKeepGoing();
              setClickCount(clickCount + 1);
            }}>저장</Button>
            <Button sx={{ mr: "auto" }} type='submit' variant='contained' onClick={handleClose}>취소</Button>
          </DialogActions>
        </div>
      </Dialog>
    </Fragment>
  )
}

export default DialogCoupon
