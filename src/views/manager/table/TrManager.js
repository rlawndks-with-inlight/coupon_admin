import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { objDataGridColumns } from 'src/data/manager-data'
import { commarNumber, getUserLevelByNumber, objToQuery, processCatch } from 'src/@core/utils/function'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { toast } from "react-hot-toast";
import CustomChip from 'src/@core/components/mui/chip'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import { axiosIns } from 'src/@fake-db/backend'
import { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import Avatar from '@mui/material/Avatar'
import DialogForm from 'src/views/components/dialogs/DialogForm'
import $ from 'jquery'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import DialogCouponModel from 'src/views/components/dialogs/DialogCouponModel'
import { Chip } from '@mui/material'
import DialogImage from 'src/views/components/dialogs/DialogImage'
import { getItemByType } from './table-utils'
import DialogCoupon from 'src/views/components/dialogs/DialogCoupon'

const TrManager = (props) => {
  const { post, index, columns, changePage, page, isShowCell, searchObj, notSearchOption, userData, onlyTeamSeeColumn, param_table } = props;
  const router = useRouter();
  const theme = useTheme();

  const goTo = (link, state) => {
    router.push(link);
  }
  useEffect(() => {

  }, [searchObj])

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
      const response = await axiosIns().put(`/api/v1/manager/${param_table == 'merchandises' ? param_table : 'users'}/${popupData?.id}/set-password`, {
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
      const response = await axiosIns().post(`/api/v1/manager/couponModels/issuance${couponModelSubApiStr}`, {
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
  }
  const onCouponActive = async () => {

    try {
      let user_category = '유저휴대폰번호';
      let user_category_en = 'user'
      let find_user_obj = {
        user: 1,
        mcht: 0,
        user_name: $('#user-name').val()
      }
      let api_obj = {

      }
      if (couponSubApiStr != 'match') {
        user_category = '가맹점상호'
        user_category_en = 'mcht'
        find_user_obj['user'] = 0;
        find_user_obj['mcht'] = 1;
        delete find_user_obj['user_name'];
        find_user_obj['mcht_name'] = $('#user-name').val();
        if (couponSubApiStr.includes('-cancel')) {
          api_obj['is_cancel'] = 1;
        } else {
          api_obj['is_cancel'] = 0;
        }
      }
      if (!$('#user-name').val()) {
        toast.error(`${user_category}를 입력해 주세요.`);
        handleCloseCoupon();
        return;
      }

      const res_find_user = await axiosIns().post(`/api/v1/manager/utils/search`, find_user_obj)
      if (res_find_user?.data[`${user_category_en}s`] && res_find_user?.data[`${user_category_en}s`].length == 0) {
        toast.error(`${user_category}가 존재하지 않습니다.`);
        return;
      }
      api_obj[`${user_category_en}_id`] = res_find_user?.data[`${user_category_en}s`][0]?.id;

      const response = await axiosIns().post(`api/v1/manager/coupons/${couponId}/${couponSubApiStr.split('-')[0]}`, api_obj)
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
  const returnCouponIcon = () => {
    let obj = {
      icon: '',
      title: '',
      sub_title: '',
      label: ''
    }
    if (couponSubApiStr == 'match') {
      obj['icon'] = <Icon icon='fluent-mdl2:plug-connected' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 유저 지급하기'
      obj['label'] = '유저아이디'
      obj['sub_title'] = '유저아이디를 입력해 주세요.'
    } else if (couponSubApiStr == 'order') {
      obj['icon'] = <Icon icon='ic:outline-verified-user' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 사용하기'
      obj['label'] = '가맹점아이디'
      obj['sub_title'] = '가맹점아이디를 입력해 주세요.'
    } else if (couponSubApiStr == 'order-cancel') {
      obj['icon'] = <Icon icon='material-symbols:cancel-outline' style={{ fontSize: '40px' }} />
      obj['title'] = '쿠폰 사용 취소하기'
      obj['label'] = '가맹점아이디'
      obj['sub_title'] = '가맹점아이디를 입력해 주세요.'
    }
    return obj
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
                    <TableCell align='left'
                      style={{
                        maxWidth: '300px',
                        color: `${theme.palette.mode == 'dark' ? '#eeeeee' : '#222222'}`,
                        whiteSpace: 'pre-wrap'
                      }}>
                      {getItemByType(post, col, router.query?.table, false, userData, {
                        goTo: goTo,
                        onDeleteOpen: onDeleteOpen,
                        openChangePasswordPopUp: openChangePasswordPopUp,
                        onChangeOnCouponModelPopUp: onChangeOnCouponModelPopUp,
                        onChangeOnCouponPopUp: onChangeOnCouponPopUp,
                        onClickImage: onClickImage,
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
