// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** MUI Imports
import MuiDialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import $ from 'jquery'
import { DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { Icon } from '@iconify/react'
import Barcode from 'react-barcode'

const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})

const returnImage = (src, type) => {
  if (type == 'img')
    return <img src={src} style={{ width: '100%', height: 'auto' }} />
  else if (type == 'barcode')
    return <Barcode
      format='CODE128'
      textMargin={10}
      value={src}
    />
}
const DialogImage = (props) => {
  const { open, handleClose, imageSrc, imageType } = props;
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setClickCount(0);
  }, [open])

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='full-screen-dialog-title' style={{ paddingBottom: '1rem' }}>
          <Typography variant='h6' component='span'>
          </Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
          >
            <Icon icon='tabler:x' />
          </IconButton>
        </DialogTitle>
        <DialogContent className='img-content'>
          {returnImage(imageSrc, imageType)}
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default DialogImage
