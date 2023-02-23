// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import MuiDialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import $ from 'jquery';
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})
const DialogCongraturation = (props) => {
  const { open, handleClose, saveSearchOption, goToManagerPage } = props;
  const [checked, setChecked] = useState(true)
  const checkRef = useRef();
  const [notSearchOptions, setNotSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Fragment>
      <Dialog open={open} onClose={goToManagerPage} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>등록에 성공하였습니다!</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3, display: 'flex', flexDirection: 'column', lineHeight: '30px' }}>
            <div style={{ marginBottom: '22px' }}>최초 접속 후 하단 순서대로 세팅을 진행해주세요.</div>
            <div style={{ fontWeight: 'bold' }}>1. 브랜드 관리</div>
            <div style={{ fontWeight: 'bold' }}>2. 가맹점 관리</div>
            <div style={{ fontWeight: 'bold' }}>3. 장비 관리</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={goToManagerPage}>확인</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogCongraturation
