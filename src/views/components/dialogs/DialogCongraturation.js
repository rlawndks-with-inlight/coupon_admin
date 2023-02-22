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
          <DialogContentText sx={{ mb: 3, alignItems: 'center', display: 'flex' }}>
            <div>상세한 정보는</div> <div style={{ margin: '0 0 0 6px', fontWeight: 'bold' }}>브랜드 관리</div> <div>에서 작성해주세요.</div>
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
