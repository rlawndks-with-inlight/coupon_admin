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
import DaumPostcode from 'react-daum-postcode';

const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})
const DialogAddress = (props) => {
  const { open, handleClose, onKeepGoing } = props;

  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    setClickCount(0);
  }, [open])
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogContent style={{ width: `${window.innerWidth >= 1000 ? '500px' : ''}` }}>
          <DaumPostcode style={postCodeStyle} onComplete={onKeepGoing} />
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
const postCodeStyle = {
  display: 'block',
  position: 'relative',
  top: '0%',
  width: '90%',
  maxWidth: '700px',
  height: '500px',
  margin: '0 auto',
};
export default DialogAddress;
