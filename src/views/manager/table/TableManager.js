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


const isShowCell = (param_table, col, search_obj) => {
  let show_flag = true;
  if (param_table == 'users') {
    let z_over_level_10 = ['group_id'];
    let z_same_level_10 = ['mcht_name', 'addr', 'point_flag', 'point_rate', 'stamp_flag', 'stamp_save_count', 'number'];
    let z_same_level_0 = ['a', 'b', 'c'];
    if (z_same_level_10.includes(col?.column)) {
      if (search_obj?.level == 10) {
        show_flag = true;
      } else {
        show_flag = false;
      }
    }
    if (z_over_level_10.includes(col?.column)) {
      if (search_obj?.level >= 10) {
        show_flag = true;
      } else {
        show_flag = false;
      }
    }
    if (z_same_level_0.includes(col?.column)) {
      if (search_obj?.level == 0) {
        show_flag = true;
      } else {
        show_flag = false;
      }
    }
  }
  return true;
}
const isShowDeleteButton = (param_table, user_data) => {
  let ans = true;

}
const settingColumnName = (col_, user_data, param_table) => {
  let col = col_;
  console.log(col)
  if (col.type == 'edit') {
    if (param_table == 'brands' && user_data?.level < 50) {
      return "수정";
    }
  }
  return col?.title;
}
const TableManager = (props) => {
  const { userData, param_table, posts, columns, changePage, page, searchObj, notSearchOption } = props;

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
        //isShowCell={isShowCell}
        isShowDeleteButton={isShowDeleteButton}
        searchObj={searchObj}
        notSearchOption={notSearchOption}
        userData={userData}
      />
    )
  }, []);
  useEffect(() => {
  }, [])

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
                }}>
                {objDataGridColumns[param_table]?.head_columns && objDataGridColumns[param_table]?.head_columns.map((item, idx) => (
                  <>
                    <TableCell align='center'
                      colSpan={notSearchOption['head_columns'] && (item?.size - (notSearchOption['head_columns'][idx] ?? 0))}
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
                {notSearchOption['list'] && !notSearchOption['list'].includes(col?.column) ?
                  <>
                    <TableCell align='left'
                      sx={{
                        maxWidth: '300px',
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
                      {settingColumnName(col, userData, param_table)}
                    </TableCell>
                  </>
                  :
                  <>
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
