import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { objDataGridColumns } from 'src/data/manager-data'
import { commarNumber, getUserLevelByNumber } from 'src/@core/utils/function'
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
export const getItemByType = (data, column, table, goTo, deleteItem, is_excel, openChangePasswordPopUp) => {
  try {
    let result = "---";

    if (column?.type == 'text') {//
      result = data[column?.column];
    }
    if (column?.type == 'number') {//
      if (typeof data[column?.column] != 'number') {
        return "---";
      }
      result = commarNumber(data[column?.column]);
    }
    if (column?.type == 'percent') {//
      if (!data[column?.column]) {
        return "---";
      }
      result = commarNumber(data[column?.column]) + '%';
    }
    if (column?.type == 'img') {//
      let style = { maxWidth: '128px', height: 'auto' };
      if (column?.type_option?.is_square) {
        style = {
          height: '32px', width: '32px'
        }
      }
      result = (<img src={data[column?.column]} style={style} />);

      if (column?.type_option?.is_profile) {
        style = {
          height: '50px', width: '50px'
        }
        result = <Avatar alt='John Doe' src={data[column?.column]} sx={{ ...style, borderRadius: '50%' }} />
      }

      if (is_excel) result = data[column?.column];
    }
    if (column?.type == 'datetime') {//
      if (!data[column?.column]) {
        return "---";
      }
      let datetime = data[column?.column];
      datetime = datetime.substring(0, 19);
      datetime = datetime.replace('T', ' ');
      result = datetime;
    }
    if (column?.type == 'use_status') {//
      result = data[column?.column] == 1 ?
        <CustomChip rounded label='사용' skin='light' color='success' />
        :
        <CustomChip rounded label='사용안함' skin='light' color='error' />;
      if (is_excel) result = data[column?.column] == 1 ? '사용' : '사용안함';

    }
    if (column?.type == 'appr_status') {//
      result = data[column?.column] == 1 ?
        <CustomChip rounded label='승인' skin='light' color='success' />
        :
        <CustomChip rounded label='승인안됨' skin='light' color='error' />;
      if (is_excel) result = data[column?.column] == 1 ? '승인' : '승인안됨';

    }
    if (column?.type == 'ad_type') {//
      if (data[column?.column] == 0)
        result = '사용안함';
      if (data[column?.column] == 1)
        result = '메인광고';
      if (data[column?.column] == 2)
        result = '슬라이드광고';
    }
    if (column?.type == 'user_level') {
      result = getUserLevelByNumber(data[column?.column]);
    }
    if (column?.type == 'edit') {
      result = (
        <>
          <Tooltip title='수정'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { goTo(`/manager/${table}/edit/${data?.id}`) }}
            >
              <Icon icon='tabler:edit' />
            </IconButton>
          </Tooltip>
          <Tooltip title='삭제'>
            <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => { deleteItem(data?.id) }}>
              <Icon icon='tabler:trash' />
            </IconButton>
          </Tooltip>
          {column?.column == 'edit_ch' ?
            <>
              <Tooltip title='비밀번호변경'>
                <IconButton
                  size='small'
                  sx={{ color: 'text.secondary' }}
                  onClick={() => { openChangePasswordPopUp(data) }}
                >
                  <Icon icon='tabler:lock' />
                </IconButton>
              </Tooltip>
            </>
            :
            <>
            </>}
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'change_pw') {
      result = (
        <>
          <Tooltip title='비밀번호변경'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { openChangePasswordPopUp(data) }}
            >
              <Icon icon='tabler:lock' />
            </IconButton>
          </Tooltip>
        </>
      )
    }

    return result;

  } catch (err) {
    console.log(err);

    return "---";
  }

}

const TrManager = (props) => {
  const { post, index, columns, changePage, page, isShowCell, searchObj } = props;
  const router = useRouter();
  const theme = useTheme();

  const goTo = (link) => {
    router.push(link);
  }
  useEffect(() => {

  }, [searchObj])

  const isShowCellReturn = async (param_table, col, search_obj) => {
    let result = await isShowCell(param_table, col, search_obj);

    return result;
  }

  const deleteItem = async (id) => {
    try {
      if (!window.confirm("정말 삭제 하시겠습니까?"))
        return;
      const response = await axiosIns().delete(`/api/v1/manager/${objDataGridColumns[router.query?.table]?.table}/${id}`)
      if (response?.status == 204) {
        toast.success("성공적으로 삭제되었습니다.");
        changePage(page);
      }
    } catch (err) {
      if (err?.response?.status == 401) {
        router.push('/manager/login')
      }
      toast.error(err?.response?.data?.message || err?.message);
    }
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
      const response = await axiosIns().put(`/api/v1/manager/users/${popupData?.id}/set-password`, {
        new_user_pw: $('#new-pw').val()
      })
      console.log(response)
    } catch (err) {
      if (err?.response?.status == 401) {
        router.push('/manager/login')
      }
      toast.error(err?.response?.data?.message || err?.message);
    }

  }
  return (
    <>
      <DialogForm
        open={open}
        data={popupData}
        setOpen={setOpen}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        changePassword={changePassword}
      />
      <TableRow
        key={index}
        className={`table-cell-hover-${theme.palette.mode}`}
      >
        {columns && columns.map((col, idx) => (
          <>
            {isShowCell(router.query?.table, col, searchObj) ?
              <>
                <TableCell align='left'
                  style={{
                    maxWidth: '300px',
                    color: `${theme.palette.mode == 'dark' ? '#eeeeee' : '#222222'}`,
                  }}>
                  {getItemByType(post, col, router.query?.table, goTo, deleteItem, false, openChangePasswordPopUp)}
                </TableCell>
              </>
              :
              <>
              </>}
          </>
        ))}
      </TableRow>
    </>
  )
}

export default TrManager;
