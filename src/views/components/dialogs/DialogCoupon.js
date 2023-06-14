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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})
const DialogCoupon = (props) => {
  const { open, handleClose, data, onKeepGoing, head, couponSelectValue, setCouponSelectValue } = props;
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
            {head?.label && head?.label.map((item, idx) => (
              <>
                {item?.type == 'input' ?
                  <TextField sx={{ marginBottom: '12px' }} id={`${item?.id}`} autoComplete='new-password' fullWidth label={item?.label} />
                  :
                  ''
                }
                {item?.type == 'select' ?
                  <FormControl fullWidth>
                    <InputLabel id={item?.id}>{item?.label}</InputLabel>
                    <Select
                      label={item?.label}
                      id={item?.id}
                      labelId={item?.id}
                      className={item?.id}
                      onChange={(e) => {
                        setCouponSelectValue({ ...couponSelectValue, [item?.id]: e.target.value });
                      }}
                      defaultValue={couponSelectValue[item?.id]}
                      value={couponSelectValue[item?.id]}
                    >
                      {item?.list && item?.list.map((itm, idx) => {
                        return <MenuItem value={itm?.value} key={idx}>{itm?.label}</MenuItem>
                      })}

                    </Select>
                  </FormControl>
                  :
                  ''
                }
              </>
            ))}
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
