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
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'
import axiosIns from 'src/@fake-db/backend'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { toast } from "react-hot-toast";


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

  return show_flag;
}

const TableManager = (props) => {
  const { param_table, posts, columns, changePage, page, searchObj } = props;
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
        searchObj={searchObj}
      />
    )
  }, [])

  return (
    <TableContainer className='table-container' component={Paper}>
      <Table sx={{ minWidth: 1000, width: `${objDataGridColumns[param_table]?.table_width ? objDataGridColumns[param_table]?.table_width : "100%"}` }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {columns && columns.map((col, idx) => (
              <>
                {isShowCell(param_table, col, searchObj) ?
                  <>
                    <TableCell align='center' style={{ maxWidth: '300px' }}>{col?.title}</TableCell>
                  </>
                  :
                  <>
                  </>}
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post, index, param_table) => (
            renderCard(post, index, columns)
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  )
}

export default TableManager
