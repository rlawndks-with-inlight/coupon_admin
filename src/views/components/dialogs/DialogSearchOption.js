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
const DialogSearchOption = (props) => {
  const { open, setOpen, handleClickOpen, handleClose, data, saveSearchOption, param_table, onlyTeamSeeColumn } = props;
  const [checked, setChecked] = useState(true)
  const checkRef = useRef();
  const [notSearchOptions, setNotSearchOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    initialCheck();
  }, [param_table, open])

  const initialCheck = async () => {
    setLoading(true);
    let not_search_option = await getLocalStorage(LOCALSTORAGE.NOT_SEARCH_OPTION);
    not_search_option = JSON.parse(not_search_option) ?? {};
    not_search_option = not_search_option[param_table] ?? [];
    not_search_option.push('&A%D#A%^D$A&^D&F^A')
    await setNotSearchOptions(not_search_option);
  }
  useEffect(() => {
    if (notSearchOptions.length > 0) {
      setLoading(false);
    }
  }, [notSearchOptions]);
  useEffect(() => {
    setClickCount(0);
  }, [open])
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{data?.breadcrumb} 검색옵션 변경</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            {'설정할 옵션을 체크해 주세요.'}
          </DialogContentText>
          {loading ?
            <>
            </>
            :
            <>
              <FormGroup row sx={{ maxWidth: '425px' }} ref={checkRef}>
                {data?.columns && data?.columns.map((item, idx) => (
                  <>
                    {(onlyTeamSeeColumn[param_table] && window.location.host != process.env.MAIN_FRONT_URL && onlyTeamSeeColumn[param_table].includes(item?.column)) ?
                      <>
                      </>
                      :
                      <>
                        <FormControlLabel label={(item?.type_option?.search_option_label ?? "") + item?.title} sx={{ margin: 0, width: '200px' }} control={<Checkbox defaultChecked={!notSearchOptions.includes(item?.column)} name={item?.column} />} />
                      </>
                    }
                  </>
                ))}
              </FormGroup>
            </>}

        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={() => {
            if (clickCount == 0) {
              saveSearchOption()
            }
            setClickCount(clickCount + 1);
          }}>저장</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogSearchOption
