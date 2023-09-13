// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { objDataGridColumns } from 'src/data/manager-data'
import { useCallback, useEffect, useState } from 'react'
import TrManager from './TrManager'
import { useTheme } from '@emotion/react'


const isShowCell = (data, func) => {

  const {
    idx,
    param_table,
    user_data,
    obj_data_grid_columns,
    search_obj,
    column,
    is_head
  } = data;
  let result_obj = {
    show_flag: true,
    idx: idx
  }
  if (param_table == 'coupons') {
    if (column == 'on_connect_user_coupon') {
      if (search_obj?.status != 0) {
        result_obj['show_flag'] = false;
      }
    }
    if (column == 'on_use_coupon') {
      if (search_obj?.status != 7) {
        result_obj['show_flag'] = false;
      }
    }
    if (column == 'on_use_coupon_cxl') {
      if (search_obj?.status != 10) {
        result_obj['show_flag'] = false;
      }
    }
    if (user_data?.level == 45) {
      if (column == 'on_connect_user_coupon' || column == 'on_use_coupon' || column == 'on_use_coupon_cxl') {
        result_obj['show_flag'] = false;
      }
    }
  }
  if (param_table == 'coupon-models') {
    if (user_data?.level < 50) {
      if (['on_pub', 'on_pub_cxl', 'on_pub_del', 'edit'].includes(column)) {
        result_obj['show_flag'] = false;
      }
    }
    if (user_data?.level == 45) {

    }
  }
  if (param_table == 'brands') {
    if (user_data?.level < 40 || user_data?.level == 45) {
      if (['edit'].includes(column)) {
        result_obj['show_flag'] = false;
      }
    }
  }
  if (param_table == 'points') {
    if (user_data?.level == 45) {
      if (['edit'].includes(column)) {
        result_obj['show_flag'] = false;
      }
    }
  }
  if (param_table == 'users') {
    if (user_data?.level < 35) {
      if (column == 'edit') {
        result_obj['show_flag'] = false;
      }
    }
    if (!(search_obj?.mcht_id > 0)) {
      if (column == 'mcht_name') {
        result_obj['show_flag'] = false;
      }
    }
  }
  if (param_table == 'operators') {
    if (user_data?.level < 50) {
      if (column == 'api_key' || column == 'api_key_pub') {
        result_obj['show_flag'] = false;
      }
    }
  }
  // const {} = func;
  return result_obj;
}
const isShowDeleteButton = (param_table, user_data) => {
  let ans = true;
}
const settingColumnName = (col_, user_data, param_table) => {
  let col = col_;
  if (col.type == 'edit') {
    if (param_table == 'brands' && user_data?.level < 50) {
      return "수정";
    }
  }
  return col?.title;
}
const getTopMenuSize = (head_columns, item, idx, columns, notSearchOption, param_table, user_data, search_obj, onlyTeamSeeColumn) => {
  let size = head_columns[idx]?.size;
  let start_idx = 0;
  let host = window.location.host;
  for (var i = 0; i < idx; i++) {
    start_idx += head_columns[i]?.size;
  }
  for (var i = start_idx; i < start_idx + item?.size; i++) {
    let column = columns?.columns[i]?.column;
    if (
      !isShowCell({
        param_table: param_table,
        user_data: user_data,
        column: column,
        search_obj: search_obj
      })//함수에 의해 보이지 않는경루
      ||
      (notSearchOption['list'] && notSearchOption['list'].includes(column))//검색옵션에 의해 보이지 않는 경우
      ||
      (onlyTeamSeeColumn[param_table] && host != process.env.MAIN_FRONT_URL && onlyTeamSeeColumn[param_table].includes(column))// team.comagain.kr일때만 보이는 경우
    ) {
      size--;
    }
  }
  return size;
}
const TableManager = (props) => {
  const { userData, param_table, posts, columns, changePage, page, searchObj, notSearchOption, onlyTeamSeeColumn } = props;
  const theme = useTheme();
  useEffect(() => {
  }, [posts])

  const renderCard = useCallback((post, index, columns) => {
    return (
      <TrManager
        post={post}
        index={index}
        columns={columns}
        changePage={changePage}
        page={page}
        isShowCell={isShowCell}
        isShowDeleteButton={isShowDeleteButton}
        searchObj={searchObj}
        notSearchOption={notSearchOption}
        userData={userData}
        onlyTeamSeeColumn={onlyTeamSeeColumn}
        param_table={param_table}
      />
    )
  }, []);

  return (
    <TableContainer className={`table-container${theme.palette.mode == 'dark' ? '-dark' : ''}`} component={Paper}>
      <Table sx={{ minWidth: 1000, width: `${objDataGridColumns[param_table]?.table_width ? objDataGridColumns[param_table]?.table_width : "100%"}` }} aria-label='simple table'>
        <TableHead>
          {objDataGridColumns[param_table]?.head_columns && objDataGridColumns[param_table]?.head_columns.length > 0 ?
            <>
              <TableRow
                sx={{
                  borderTop: 'none',
                  backgroundColor: `${theme.palette.mode == 'dark' ? 'rgb(74, 80, 114)' : 'rgb(246, 246, 247)'}`,
                  padding: '1rem 0.3rem 1rem 0.5rem',
                }}>
                {objDataGridColumns[param_table]?.head_columns && objDataGridColumns[param_table]?.head_columns.map((item, idx) => (
                  <>
                    {getTopMenuSize(
                      objDataGridColumns[param_table]?.head_columns,
                      item,
                      idx,
                      objDataGridColumns[param_table],
                      notSearchOption,
                      param_table,
                      userData,
                      searchObj,
                      onlyTeamSeeColumn
                    ) > 0 ?
                      <>
                        <TableCell align='center'
                          colSpan={getTopMenuSize(
                            objDataGridColumns[param_table]?.head_columns,
                            item,
                            idx,
                            objDataGridColumns[param_table],
                            notSearchOption,
                            param_table,
                            userData,
                            searchObj,
                            onlyTeamSeeColumn
                          )}
                          sx={{
                            position: 'relative'
                          }}>
                          <div style={{
                            position: 'absolute',
                            width: '2px',
                            height: '100%',
                            display: 'flex',
                            left: '0',
                            top: '0'
                          }}>
                            <div style={{
                              width: '2px',
                              height: '14px',
                              margin: 'auto 0',
                              background: `${idx != 0 ? `${theme.palette.mode == 'dark' ? '#5d6282' : '#dedee0'}` : ''}`,
                            }} />
                          </div>
                          {item?.title}
                        </TableCell>
                      </>
                      :
                      <>
                      </>
                    }

                  </>
                ))}
              </TableRow>
            </>
            :
            <>
            </>}
          <TableRow
            sx={{
              borderTop: 'none',
              backgroundColor: `${theme.palette.mode == 'dark' ? 'rgb(74, 80, 114)' : 'rgb(246, 246, 247)'}`,
            }}>
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
                        {}).show_flag
                      ?
                      <>
                        <TableCell align='center'
                          sx={{
                            maxWidth: '300px',
                            position: 'relative',
                            padding: '1rem 0.1rem',
                          }}>
                          <div style={{
                            position: 'absolute',
                            width: '2px',
                            height: '100%',
                            display: 'flex',
                            left: '0',
                            top: '0'
                          }}>
                            <div style={{
                              width: '2px',
                              height: '14px',
                              margin: 'auto 0',
                              background: `${idx != 0 ? `${theme.palette.mode == 'dark' ? '#5d6282' : '#dedee0'}` : ''}`,
                            }} />
                          </div>
                          {settingColumnName(col, userData, param_table)}
                        </TableCell>
                      </>
                      :
                      <>
                      </>}
                  </>}


              </>
            ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, index) => (
            renderCard(post, index, columns)
          ))}
        </TableBody>
      </Table>

    </TableContainer >
  )
}

export default TableManager
