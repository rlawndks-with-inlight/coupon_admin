// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports

import { useTheme } from '@mui/material/styles'

import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import Icon from 'src/@core/components/icon'
// ** Third Party Components


// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useRouter } from 'next/router'
import ManagerUserEdit from 'src/views/manager/edit/ManagerUserEdit'
import ManagerAdEdit from 'src/views/manager/edit/ManagerAdEdit'
import ManagerBrandEdit from 'src/views/manager/edit/ManagerBrandEdit'
import { objDataGridColumns } from 'src/data/manager-data'
import { axiosIns } from 'src/@fake-db/backend'
import { toast } from "react-hot-toast";
import ManagerDeviceEdit from 'src/views/manager/edit/ManagerDeviceEdit'
import ManagerPointEdit from 'src/views/manager/edit/ManagerPointEdit'
import ManagerMerchandiseEdit from 'src/views/manager/edit/ManagerMerchandiseEdit'
import ManagerOperatorEdit from 'src/views/manager/edit/ManagerOperatorEdit'
import { processCatch } from 'src/@core/utils/function'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import ManagerCategoryEdit from 'src/views/manager/edit/ManagerCategoryEdit'
import ManagerProductEdit from 'src/views/manager/edit/ManagerProductEdit'
import ManagerCouponModelEdit from 'src/views/manager/edit/ManagerCouponModelEdit'
const Edit = ({ dns_data }) => {
  const [editSetting, setEditSetting] = useState({
    posts: {}
  })
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // if (router.query?.edit_category == 'edit' && router.query?.id) {
    //   console.log(1);
    // } else if (router.query?.edit_category == 'create') {
    //   console.log(2);
    // } else {
    //   router.back();
    // }
    getUserData();
  }, [])
  const getUserData = async () => {
    let user_data = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data ?? "{}") ?? {};
    setUserData(user_data);
  }
  const renderPage = (common) => {
    if (router.query?.table == 'users')
      return <ManagerUserEdit {...common} />
    else if (router.query?.table == 'brands')
      return <ManagerBrandEdit {...common} />
    // else if (router.query?.table == 'notices')
    //   return <ManagerNoticeEdit {...common} />
    else if (router.query?.table == 'devices')
      return <ManagerDeviceEdit {...common} />
    else if (router.query?.table == 'advertisements')
      return <ManagerAdEdit {...common} />
    else if (router.query?.table == 'points')
      return <ManagerPointEdit {...common} />
    else if (router.query?.table == 'merchandises')
      return <ManagerMerchandiseEdit {...common} />
    else if (router.query?.table == 'operators')
      return <ManagerOperatorEdit {...common} />
    else if (router.query?.table == 'categories')
      return <ManagerCategoryEdit {...common} />
    else if (router.query?.table == 'products')
      return <ManagerProductEdit {...common} />
    else if (router.query?.table == 'coupon-models')
      return <ManagerCouponModelEdit {...common} />
    else
      return <div>없는 페이지 입니다.</div>
  }
  const editItem = async (obj_) => {
    handleEditConfirmClose();
    try {
      let obj = { ...obj_ };
      let formData = new FormData();
      let keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        formData.append(keys[i], obj[keys[i]]);
      }
      let response = undefined;
      let config = {
        headers: {
          'Content-Type': "multipart/form-data",
        }
      };
      if (router.query?.edit_category == 'edit' && router.query?.id) {
        response = await axiosIns().put(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}/${router.query?.id}`, formData, config);
      }
      else if (router.query?.edit_category == 'create')
        response = await axiosIns().post(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}`, formData, config);
      if (response?.status == 201) {
        toast.success("성공적으로 저장되었습니다." + `${router.query?.edit_category == 'edit' ? '😊' : '😻'}`);
        setTimeout(() => {
          if (router.query?.table == 'brands') {
            window.location.href = `/manager/${router.query?.table}`;
          } else {
            router.push(`/manager/${router.query?.table}`);
          }
        }, 1000)
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

  const getItem = async () => {
    try {
      if (router.query?.edit_category == 'edit' && router.query?.id) {
        const response = await axiosIns().get(`api/v1/manager/${objDataGridColumns[router.query?.table]?.table}/${router.query?.id}`);

        return { ...response?.data };
      } else {
        return false;
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
      return false;
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleClickOpen = () => {
    setIsOpen(true);
  }
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);
  const handleEditConfirmClose = () => setEditConfirmOpen(false)
  const [editConfirmData, setEditConfirmData] = useState({});
  const onEditConfirmOpen = (obj) => {
    setEditConfirmOpen(true);
    setEditConfirmData(obj);
  }
  return (
    <>
      <DialogConfirm
        open={editConfirmOpen}
        handleClose={handleEditConfirmClose}
        onKeepGoing={editItem}
        text={`정말 ${router.query?.edit_category == 'edit' ? '수정' : '추가'} 하시겠습니까?`}
        //subText={'삭제하시면 복구할 수 없습니다.'}
        headIcon={<Icon icon='tabler:edit' style={{ fontSize: '40px' }} />}
        saveText={'저장'}
        data={editConfirmData}
      />
      <DropzoneWrapper>
        <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
          {renderPage({
            posts: editSetting?.posts,
            table: objDataGridColumns[router.query?.table]?.table,
            editItem: onEditConfirmOpen,
            getItem: getItem,
            popperPlacement: popperPlacement,
            breadcrumb: `${objDataGridColumns[router.query?.table]?.breadcrumb} ${router.query?.edit_category == 'create' ? '추가' : '수정'}`,
            editCategory: router.query?.edit_category,
            userData: userData
          })}
        </DatePickerWrapper>
      </DropzoneWrapper>
      {/* <DialogAlert
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        isOpen={isOpen}
      /> */}
    </>


  )
}

export default Edit
