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
import { Icon } from '@iconify/react'
import $ from 'jquery';
import * as XLSX from 'xlsx';
import { Row } from 'src/@core/layouts/components/app/style-component'
import { commarNumber } from 'src/@core/utils/function'

const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})
const DialogCouponMMS = (props) => {
  const { open, handleClose, data, onKeepGoing, head, couponMmsData, setCouponMmsData } = props;
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    setClickCount(0);
    if (!open) {
      setCouponMmsData({});
    }
  }, [open])
  const uploadExcel = (e) => {
    e.preventDefault();
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = async function (e) {
      let data = e.target.result;
      let readedData = XLSX.read(data, { type: 'binary' });
      let sheet_name = readedData.SheetNames[0];
      let sheets = readedData.Sheets[sheet_name];
      let phone_list = XLSX.utils.sheet_to_json(sheets, { header: 1 });
      phone_list.shift();
      phone_list = phone_list.map(item => {
        return item[0]
      })
      setCouponMmsData({
        ...couponMmsData,
        phone_nums: phone_list
      })
    }
    reader.readAsBinaryString(f);
    $("#excel_upload").val("");
  }
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', width: '50vw', maxWidth: "600px" }}>
          <div style={{ margin: '0 auto' }}>{head?.icon}</div>
          <DialogTitle id='form-dialog-title' style={{ margin: "0 auto" }}>{data?.table} {data?.user_name} {head?.title}</DialogTitle>
          <DialogContentText style={{ margin: "0 auto" }} >
            {couponMmsData?.coupon_name} <br />대량등록할 유저를 등록해주세요.
          </DialogContentText>
          {couponMmsData?.phone_nums?.length > 0 &&
            <>
              <Row style={{ margin: 'auto' }}>
                {couponMmsData?.phone_nums[0]}외 {commarNumber(couponMmsData?.phone_nums?.length - 1)}명
              </Row>
            </>}
          <DialogContent style={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }}>
            <Row style={{ margin: 'auto' }}>
              <label htmlFor={'excel_upload'}>
                <Button variant='contained' component="span" startIcon={<Icon icon='uiw:file-excel' />} sx={{ margin: 'auto' }} >
                  파일등록
                </Button>
              </label>
              <input type={'file'} onChange={uploadExcel} id='excel_upload' style={{ display: 'none' }} />
              <Button sx={{ mb: 2, ml: 2 }} href={"/file/쿠폰 대량발송 양식_v1.0.xlsx"} download={true} variant='contained' startIcon={<Icon icon='uiw:file-excel' />}>
                양식추출
              </Button>
            </Row>

            <TextField
              sx={{ marginBottom: '12px' }}
              id='coupon-number'
              autoComplete='new-password'
              autoFocus fullWidth
              label={'제목'}
              value={couponMmsData?.title}
              onChange={(e) => {
                setCouponMmsData({
                  ...couponMmsData,
                  title: e.target.value
                })
              }}
            />
            <TextField
              sx={{ marginBottom: '12px' }}
              id='coupon-number'
              label={'내용'}
              rows={6}
              multiline
              value={couponMmsData?.message}
              onChange={(e) => {
                setCouponMmsData({
                  ...couponMmsData,
                  message: e.target.value
                })
              }}
            />

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

export default DialogCouponMMS
