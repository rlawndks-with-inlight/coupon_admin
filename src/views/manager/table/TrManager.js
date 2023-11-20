import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { objDataGridColumns } from 'src/data/manager-data'
import { processCatch } from 'src/@core/utils/function'
import { toast } from "react-hot-toast";

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import { axiosIns } from 'src/@fake-db/backend'
import { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import DialogForm from 'src/views/components/dialogs/DialogForm'
import $ from 'jquery'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import DialogCouponModel from 'src/views/components/dialogs/DialogCouponModel'
import DialogImage from 'src/views/components/dialogs/DialogImage'
import { getItemByType } from './table-utils'
import DialogCoupon from 'src/views/components/dialogs/DialogCoupon'
import DialogApiKey from 'src/views/components/dialogs/DialogApiKey';
import DialogCouponMMS from 'src/views/components/dialogs/DialogCouponMMS';

const TrManager = (props) => {
  const { post, index, columns, changePage, page, isShowCell, searchObj, notSearchOption, userData, onlyTeamSeeColumn, param_table, mchtList } = props;
  const router = useRouter();
  const theme = useTheme();
  const [data, setData] = useState(post);
  const goTo = (link, state) => {
    router.push(link);
  }

  const isShowCellReturn = async (param_table, col, search_obj) => {
    let result = await isShowCell(param_table, col, search_obj);

    return result;
  }


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [popupData, setPopupData] = useState({});
  const [changePasswordUser, setChangePasswordUser] = useState({});
  const openChangePasswordPopUp = (data) => {
    handleClickOpen();
    setPopupData({ ...data, table: objDataGridColumns[router.query?.table]?.breadcrumb });
  }
  const changePassword = async () => {
    try {
      if ($('#new-pw').val() != $('#new-pw-check').val()) {
        toast.error('비밀번호가 일치하지 않습니다.');
        return;
      }
      const response = await axiosIns().put(`/api/v1/manager/${param_table}/${popupData?.id}/set-password`, {
        new_user_pw: $('#new-pw').val()
      })
      handleClose();
      if (response?.status == 201) {
        toast.success('성공적으로 변경 되었습니다.')
      }
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }

  const onChangeUserUnsubscribe = async (num, user) => {
    try {
      setData({ ...data, is_subscribe: 'loading' });
      const response = await axiosIns().post(`/api/v1/manager/users/subscribe/${user?.id}`, {
        is_subscribe: num
      })
      setData({ ...data, is_subscribe: num });
    } catch (err) {
      console.log(err)
    }
  }
  const [deleteOpen, setDeleteOpen] = useState(false);
  const onDeleteOpen = (id) => {
    setDeleteOpen(true);
    setDeleteData(id);
  }
  const handleDeleteClose = () => setDeleteOpen(false)
  const [deleteData, setDeleteData] = useState(0);
  const deleteItem = async (id) => {
    handleDeleteClose();
    try {
      const response = await axiosIns().delete(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}/${id}`);
      if (response?.status == 204) {
        toast.success("성공적으로 삭제되었습니다.");
        changePage(page);
      }
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }

  const [couponModelOpen, setCouponModelOpen] = useState(false);
  const [couponModelSubApiStr, setCouponModelSubApiStr] = useState('');
  const [couponModelId, setCouponModelId] = useState(0);
  const handleOpenCouponModel = () => setCouponModelOpen(true)
  const handleCloseCouponModel = () => setCouponModelOpen(false);

  const onChangeOnCouponModelPopUp = (data, str) => {
    handleOpenCouponModel();
    setCouponModelId(data?.id)
    setCouponModelSubApiStr(str);
  }
  const onCouponModelActive = async () => {

    try {
      if (!$('#coupon-number').val()) {
        toast.error('개수를 입력해 주세요.');
        return;
      }
      const response = await axiosIns().post(`/api/v1/manager/coupon-models/issuance${couponModelSubApiStr}`, {
        cp_mod_id: couponModelId,
        count: $('#coupon-number').val()
      })
      handleCloseCouponModel();
      if (response?.status == 201 || response?.status == 204) {
        toast.success('성공적으로 저장 되었습니다.')
        changePage(page);
      }
    } catch (err) {
      handleCloseCouponModel();
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }
  const returnCouponModelIcon = () => {
    let obj = {
      icon: '',
      title: '',
      sub_title: '',
      label: ''
    }
    if (couponModelSubApiStr == '') {
      obj['icon'] = <Icon icon='mdi:coupon-outline' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 발행하기'
      obj['label'] = '발행할 개수'
      obj['sub_title'] = '발행할 쿠폰 개수를 입력해 주세요.'
    } else if (couponModelSubApiStr == '-cancel') {
      obj['icon'] = <Icon icon='material-symbols:cancel-outline' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 발행 취소하기'
      obj['label'] = '발행취소할 개수'
      obj['sub_title'] = '발행취소할 쿠폰 개수를 입력해 주세요.'
    } else if (couponModelSubApiStr == '-destory') {
      obj['icon'] = <Icon icon='material-symbols:delete-forever-outline' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 발행 삭제하기'
      obj['label'] = '발행삭제할 개수'
      obj['sub_title'] = '발행삭제할 쿠폰 개수를 입력해 주세요.'
    }
    return obj
  }


  const [imageOpen, setImageOpen] = useState(false)
  const [openImageSrc, setOpenImageSrc] = useState('');
  const [openImageType, setOpenImageType] = useState('');
  const handleChangeImageOpen = () => setImageOpen(true)
  const handleChangeImageClose = () => setImageOpen(false)
  const onClickImage = (src, type) => {
    handleChangeImageOpen();
    setOpenImageSrc(src);
    setOpenImageType(type);
  }

  const [couponOpen, setCouponOpen] = useState(false);
  const [couponSubApiStr, setCouponSubApiStr] = useState('');
  const [couponId, setCouponId] = useState(0);
  const handleOpenCoupon = () => setCouponOpen(true)
  const handleCloseCoupon = () => setCouponOpen(false);

  const onChangeOnCouponPopUp = (data, str) => {
    setCouponId(data?.id)
    setCouponSubApiStr(str);
    handleOpenCoupon();
    setCouponSelectValue({
      vendor_code: null
    })
  }
  const onCouponActive = async () => {

    try {
      let find_user_obj = {
      }
      let api_obj = {

      }
      for (var i = 0; i < returnCouponIcon()?.label.length; i++) {
        let req_item = returnCouponIcon()?.label[i];

        if (!$(`#${req_item?.id}`).val() && !couponSelectValue[req_item?.id] && typeof couponSelectValue[req_item?.id] != 'number') {
          toast.error(`${req_item?.label}을(를) 입력해 주세요.`);
          handleCloseCoupon();
          return;
        }
        if (req_item?.id.includes('user')) {//유저나 가맹점 찾을때
          let type_name = req_item?.id.split('_')[0];
          if (req_item?.id.includes('user')) {
            find_user_obj = {
              user: 1,
              mcht: 0,
              phone_num: $(`#${req_item?.id}`).val()
            }
          }
          if (req_item?.id.includes('mcht')) {
            find_user_obj = {
              user: 0,
              mcht: 1,
              mcht_name: $(`#${req_item?.id}`).val()
            }
          }
          const res_find_user = await axiosIns().post(`/api/v1/manager/utils/search`, find_user_obj)
          if (res_find_user?.data[`${type_name}s`] && res_find_user?.data[`${type_name}s`].length == 0) {
            toast.error(`${req_item?.label}가 존재하지 않습니다.`);
            handleCloseCoupon();
            return;
          }
          api_obj[`${type_name}_id`] = res_find_user?.data[`${type_name}s`][0]?.id;
        } else {
          if (req_item?.type == 'input') {
            api_obj[req_item?.id] = $(`#${req_item?.id}`).val();
          } else if (req_item?.type == 'select') {
            api_obj[req_item?.id] = couponSelectValue[req_item?.id]
          } else if (req_item?.type == 'autocomplete') {
            api_obj[req_item?.id] = couponSelectValue[req_item?.id]
          }
        }
      }
      const response = await axiosIns().post(`api/v1/manager/coupons/${couponId}/${couponSubApiStr}`, api_obj)
      handleCloseCoupon();
      if (response?.status == 201 || response?.status == 204) {
        toast.success('성공적으로 저장 되었습니다.')
        changePage(page);
      }
    } catch (err) {

      handleCloseCoupon();
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }

  const [couponSelectValue, setCouponSelectValue] = useState({
    vendor_code: null
  })
  const returnCouponIcon = () => {
    let obj = {
      icon: '',
      title: '',
      sub_title: '',
      label: []
    }
    if (couponSubApiStr == 'match') {
      obj['icon'] = <Icon icon='fluent-mdl2:plug-connected' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 유저 지급하기'
      obj['label'] = [
        { label: '유저아이디', id: 'user_name', type: 'input' }
      ]
      obj['sub_title'] = '유저아이디를 입력해 주세요.'
    } else if (couponSubApiStr == 'approve') {
      obj['icon'] = <Icon icon='ic:outline-verified-user' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 사용하기'
      obj['label'] = [
        { label: '가맹점상호', id: 'mcht_id', type: 'autocomplete', list: mchtList, show_column: 'user_name' },
        { label: '사용할금액', id: 'use_amount', type: 'input' },
        // {
        //   label: '벤더사 코드', id: 'vendor_code', type: 'select', list: [
        //     { value: null, label: '선택안함' },
        //     { value: 0, label: '푸드테크' },
        //   ]
        // },
      ]
      obj['sub_title'] = '가맹점상호를 입력해 주세요.'
    } else if (couponSubApiStr == 'cancel') {
      obj['icon'] = <Icon icon='material-symbols:cancel-outline' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 사용 취소하기'
      obj['label'] = [
        { label: '승인번호', id: 'appr_num', type: 'input' },
        {
          label: '벤더사 코드', id: 'vendor_code', type: 'select', list: [
            { value: null, label: '선택안함' },
            { value: 0, label: '푸드테크' },
          ]
        },
      ]
      obj['sub_title'] = '승인번호를 입력해 주세요.'
    }
    return obj
  }

  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  const [apiKeyOpenData, setApiKeyOpenData] = useState({});
  const onApiKeyPubOpen = (data) => {
    setApiKeyOpenData(data);
    setApiKeyOpen(true);
  }
  const onApiKeyPub = async () => {
    try {
      const response = await axiosIns().post(`/api/v1/manager/operators/${apiKeyOpenData.id}/api-key`);
      if (response?.status == 201) {
        toast.success("성공적으로 발급 되었습니다.")
        changePage(page);
      }
    } catch (err) {
      let push_lick = await processCatch(err);
    }
    setApiKeyOpen(false);
  }
  const [couponMmsOpen, setCouponMmsOpen] = useState(false);
  const [couponMmsData, setCouponMmsData] = useState({});
  const handleChangeMmsOpen = (row) => {
    setCouponMmsOpen(true);
    setCouponMmsData({ ...couponMmsData, cp_mod_id: row?.id, coupon_name: row?.coupon_name });
  };
  const handleChangeMmsClose = () => setCouponMmsOpen(false);
  const onSendMmsCoupons = async () => {
    try {
      const response = await axiosIns().post(`/api/v1/manager/coupon-models/mms-send-reservation`, couponMmsData);
      if (response?.status == 201) {
        toast.success("성공적으로 발송 되었습니다.(순차적으로 발송됩니다.)")
        changePage(page);
      }
    } catch (err) {
      let push_lick = await processCatch(err);
    }
    setCouponMmsOpen(false);
  }
  return (
    <>
      <DialogConfirm
        open={deleteOpen}
        handleClose={handleDeleteClose}
        onKeepGoing={deleteItem}
        text={'정말 삭제 하시겠습니까?'}
        subText={'삭제하시면 복구할 수 없습니다.'}
        saveText={'삭제'}
        headIcon={<Icon icon='tabler:trash' style={{ fontSize: '40px' }} />}
        data={deleteData}
      />
      <DialogForm
        open={open}
        data={popupData}
        setOpen={setOpen}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        changePassword={changePassword}
        headIcon={<Icon icon='tabler:lock' style={{ fontSize: '40px' }} />}
      />
      <DialogImage
        open={imageOpen}
        setOpen={setImageOpen}
        handleClose={handleChangeImageClose}
        handleClickOpen={handleChangeImageOpen}
        imageSrc={openImageSrc}
        imageType={openImageType}
      />
      <DialogCouponMMS
        open={couponMmsOpen}
        setOpen={setCouponMmsOpen}
        handleClose={handleChangeMmsClose}
        handleClickOpen={handleChangeMmsOpen}
        onKeepGoing={onSendMmsCoupons}
        couponMmsData={couponMmsData}
        setCouponMmsData={setCouponMmsData}
        head={<Icon icon='ic:outline-mms' style={{ fontSize: '40px' }} />}
      />
      <DialogCouponModel
        open={couponModelOpen}
        setOpen={setCouponModelOpen}
        handleClose={handleCloseCouponModel}
        handleClickOpen={handleOpenCouponModel}
        onKeepGoing={onCouponModelActive}
        head={returnCouponModelIcon()}
      />
      <DialogCoupon
        open={couponOpen}
        setOpen={setCouponOpen}
        handleClose={handleCloseCoupon}
        handleClickOpen={handleOpenCoupon}
        onKeepGoing={onCouponActive}
        head={returnCouponIcon()}
        setCouponSelectValue={setCouponSelectValue}
        couponSelectValue={couponSelectValue}
      />
      <DialogApiKey
        open={apiKeyOpen}
        handleClose={() => { setApiKeyOpen(false) }}
        onKeepGoing={onApiKeyPub}
        text={'정말 발급 하시겠습니까?'}
        subText={''}
        saveText={'발급'}
        headIcon={<Icon icon='ic:outline-publish' style={{ fontSize: '40px' }} />}
        data={deleteData}
      />
      <TableRow
        key={index}
        className={`table-cell-hover-${theme.palette.mode}`}
      >
        {columns && columns.map((col, idx) => (
          <>
            {(onlyTeamSeeColumn[param_table] && window.location.host != process.env.MAIN_FRONT_URL && onlyTeamSeeColumn[param_table].includes(col?.column)) ?
              <>
              </>
              :
              <>
                {notSearchOption['list'] && !notSearchOption['list'].includes(col?.column)
                  && isShowCell({
                    idx: idx,
                    param_table: param_table,
                    user_data: userData,
                    obj_data_grid_columns: objDataGridColumns[param_table],
                    search_obj: searchObj,
                    column: col?.column
                  },
                    {})?.show_flag ?
                  <>
                    <TableCell align='center'
                      style={{
                        maxWidth: '300px',
                        color: `${theme.palette.mode == 'dark' ? '#eeeeee' : '#222222'}`,
                        whiteSpace: 'pre-wrap',
                        padding: '1rem 0.1rem',
                        margin: '0'
                      }}>
                      {getItemByType(data, col, router.query?.table, false, userData, {
                        goTo,
                        onDeleteOpen,
                        openChangePasswordPopUp,
                        onChangeOnCouponModelPopUp,
                        onChangeOnCouponPopUp,
                        onClickImage,
                        onApiKeyPubOpen,
                        onChangeUserUnsubscribe,
                        handleChangeMmsOpen,
                      })}
                    </TableCell>
                  </>
                  :
                  <>
                  </>}
              </>}

          </>
        ))}
      </TableRow>
    </>
  )
}

export default TrManager;
