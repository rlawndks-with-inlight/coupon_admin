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
import { onPostWebview } from 'src/@core/utils/webview-connect'
import Loading from './Loading'
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />
})


const DialogLoading = (props) => {

  // ** State
  const { open, handleClose, style, theme } = props;

  return (
    <div style={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', display: 'flex', background: '#00000059', zIndex: '9' }}>
      <img src={`/images/gifs/${theme.palette.mode == 'dark' ? 'dark' : 'light'}-loading.gif`}
        style={{
          margin: 'auto',
          width: '100%',
          maxWidth: '700px',
        }} />
    </div>
  )
}

export default DialogLoading
