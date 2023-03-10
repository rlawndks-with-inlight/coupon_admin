// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import Icon from 'src/@core/components/icon'
// ** Third Party Components
import axios from 'axios'

// ** Demo Components Imports
import AddCard from 'src/views/apps/invoice/add/AddCard'
import AddActions from 'src/views/apps/invoice/add/AddActions'
import AddNewCustomers from 'src/views/apps/invoice/add/AddNewCustomer'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useRouter } from 'next/router'
import ManagerUserEdit from 'src/views/manager/edit/ManagerUserEdit'
import ManagerAdEdit from 'src/views/manager/edit/ManagerAdEdit'
import ManagerNoticeEdit from 'src/views/manager/edit/ManagerNoticeEdit'
import ManagerBrandEdit from 'src/views/manager/edit/ManagerBrandEdit'
import { objDataGridColumns } from 'src/data/manager-data'
import { axiosIns } from 'src/@fake-db/backend'
import DialogAlert from 'src/views/components/dialogs/DialogAlert'
import { toast } from "react-hot-toast";
import { getCookie } from 'src/@core/utils/react-cookie'
import ManagerDeviceEdit from 'src/views/manager/edit/ManagerDeviceEdit'
import ManagerPointEdit from 'src/views/manager/edit/ManagerPointEdit'
import ManagerMerchandiseEdit from 'src/views/manager/edit/ManagerMerchandiseEdit'
import ManagerOperatorEdit from 'src/views/manager/edit/ManagerOperatorEdit'
import HeadContent from 'src/@core/components/head'
import { processCatch } from 'src/@core/utils/function'
import DialogConfirm from 'src/views/components/dialogs/DialogConfirm'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

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
    else
      return <div>?????? ????????? ?????????.</div>
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
        toast.success("??????????????? ?????????????????????." + `${router.query?.edit_category == 'edit' ? '????' : '????'}`);
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
        text={`?????? ${router.query?.edit_category == 'edit' ? '??????' : '??????'} ???????????????????`}
        //subText={'??????????????? ????????? ??? ????????????.'}
        headIcon={<Icon icon='tabler:edit' style={{ fontSize: '40px' }} />}
        saveText={'??????'}
        data={editConfirmData}
      />
      {/* <HeadContent title={`${objDataGridColumns[router.query?.table]?.breadcrumb} ${router.query?.edit_category == 'edit' ? '??????' : '??????'}`} dns_data={dns_data} /> */}
      <DropzoneWrapper>
        <DatePickerWrapper sx={{ '& .react-datepicker-wrapper': { width: 'auto' } }}>
          {renderPage({
            posts: editSetting?.posts,
            table: objDataGridColumns[router.query?.table]?.table,
            editItem: onEditConfirmOpen,
            getItem: getItem,
            popperPlacement: popperPlacement,
            breadcrumb: `${objDataGridColumns[router.query?.table]?.breadcrumb} ${router.query?.edit_category == 'create' ? '??????' : '??????'}`,
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
