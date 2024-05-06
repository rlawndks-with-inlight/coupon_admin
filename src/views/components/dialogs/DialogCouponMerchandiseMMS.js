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
import { Autocomplete, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useSettings } from 'src/@core/hooks/useSettings'
import toast from 'react-hot-toast'
import _ from 'lodash'

const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(2px)'
  },
})
const DialogCouponMerchandiseMMS = (props) => {
  const { open, handleClose, data, onKeepGoing, head, couponMmsData, setCouponMmsData } = props;
  const [clickCount, setClickCount] = useState(0);
  const { settings } = useSettings();
  console.log(settings)
  const [mchtList, setMchtList] = useState([]);
  const [couponModelList, setCouponModelList] = useState([]);
  useEffect(() => {
    setClickCount(0);
    if (!open) {
      setCouponMmsData({});
    }
    if (open) {
      settingPage();
    }
  }, [open])
  const settingPage = async () => {
    let mcht_list = _.sortBy(settings?.mchts, 'mcht_name');
    for (var i = 0; i < mcht_list.length; i++) {
      mcht_list[i]['mcht_id'] = mcht_list[i]['id'];
    }
    if (mcht_list.length <= 0) {
      toast.error("가맹점부터 등록하셔야 MMS 발송을 하실 수 있습니다.");
      return;
    }
    setMchtList(_.sortBy(mcht_list, 'mcht_name'));

    let coupon_model_list = _.sortBy(settings?.coupon_models, 'coupon_name');
    for (var i = 0; i < coupon_model_list.length; i++) {
      coupon_model_list[i]['cp_mod_id'] = coupon_model_list[i]['id'];
    }
    if (coupon_model_list.length <= 0) {
      toast.error("쿠폰모델부터 등록하셔야 MMS 발송을 하실 수 있습니다.");
      return;
    }
    setCouponModelList(_.sortBy(coupon_model_list, 'coupon_name'));
  }
  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', width: '50vw', maxWidth: "600px" }}>
          <div style={{ margin: '0 auto' }}>{head?.icon}</div>
          <DialogTitle id='form-dialog-title' style={{ margin: "0 auto" }}>{data?.table} {data?.user_name} {head?.title}</DialogTitle>
          <DialogContentText style={{ margin: "0 auto" }} >
            {couponMmsData?.coupon_name} <br />쿠폰을 선택하고 수량 입력후 저장해 주세요
          </DialogContentText>
          <DialogContent style={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }}>
            {/* <Autocomplete
              id="mcht_id"
              defaultValue={_.find(mchtList, { mcht_id: couponMmsData?.mcht_id })?.mcht_name}
              onChange={(e, value) => {
                let item = _.find(mchtList, { mcht_name: value });
                setCouponMmsData({ ...couponMmsData, mcht_id: item?.id });
              }}
              options={mchtList && mchtList.map((option) => option.mcht_name)}
              renderInput={(params) => <TextField {...params} label="가맹점상호" />}
            /> */}
            <FormControl fullWidth>
              <InputLabel id={couponMmsData?.cp_mod_id}>쿠폰모델선택</InputLabel>
              <Select
                label={'쿠폰모델선택'}
                className='cp_mod_id'
                onChange={(e) => {
                  setCouponMmsData({ ...couponMmsData, cp_mod_id: e.target.value });
                }}
                defaultValue={couponMmsData?.cp_mod_id}
                value={couponMmsData?.cp_mod_id}
              >
                {couponModelList && couponModelList.map((itm, idx) => {
                  return <MenuItem value={itm?.id} key={idx}>{itm?.coupon_name}</MenuItem>
                })}

              </Select>
            </FormControl>
            <TextField
              sx={{ marginBottom: '12px' }}
              id='send_count'
              autoComplete='new-password'
              fullWidth
              label={'수량'}
              type='number'
              value={couponMmsData?.send_count}
              onChange={(e) => {
                setCouponMmsData({
                  ...couponMmsData,
                  send_count: parseInt(e.target.value)
                })
              }}
            />
            <TextField
              sx={{ marginBottom: '12px' }}
              id='coupon-number'
              autoComplete='new-password'
              fullWidth
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

export default DialogCouponMerchandiseMMS
