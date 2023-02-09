// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { objDataGridColumns } from 'src/data/manager-data'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import UserOptionBox from './option-box/UserOptionBox'
import PointOptionBox from './option-box/PointOptionBox'

const optionBox = (param_table, changePage, page, searchObj, setSearchObj, handleChange, defaultSearchObj) => {

  if (param_table == 'users')
    return <UserOptionBox defaultSearchObj={defaultSearchObj} changePage={changePage} page={page} searchObj={searchObj} setSearchObj={setSearchObj} handleChange={handleChange} />
  else if (param_table == 'points')
    return <PointOptionBox defaultSearchObj={defaultSearchObj} changePage={changePage} page={page} searchObj={searchObj} setSearchObj={setSearchObj} handleChange={handleChange} />

}

const TableHeader = props => {
  // ** Props
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props
  const router = useRouter();
  const page_size_list = [10, 20, 25, 50, 100];



  return (
    <>
      {optionBox(router.query?.table, changePage, page, searchObj, setSearchObj, handleChange, defaultSearchObj)}
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <FormControl>
          <InputLabel id='demo-simple-select-outlined-label'>보여줄갯수</InputLabel>
          <Select
            label='보여줄갯수'
            value={searchObj?.page_size}
            id='demo-simple-select-outlined'
            labelId='demo-simple-select-outlined-label'
            onChange={async (e) => {
              let obj = await handleChange('page_size', e.target.value);
              changePage(page, false, obj);
            }}
          >
            {page_size_list && page_size_list.map((item, idx) => {
              return <MenuItem value={item} key={idx}>{item}</MenuItem>
            }
            )}
          </Select>
        </FormControl>


        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size='small'
            sx={{ mr: 4, mb: 2 }}
            onChange={e => handleChange('search', e.target.value)}
            onKeyPress={e => e.key == 'Enter' ? changePage(page) : console.log(null)}
            placeholder={`${objDataGridColumns[router.query?.table]?.search_placeholder ?? "검색명을 입력해 주세요."}`}
            className="search"
          />
          {objDataGridColumns[router.query?.table]?.is_add ?
            <>
              <Button sx={{ mb: 2 }} component={Link} variant='contained' href={`/manager/${router.query?.table}/create`}>
                {objDataGridColumns[router.query?.table]?.breadcrumb} 추가
              </Button>
            </>
            :
            <>
            </>}
        </Box>
      </Box>
    </>
  )
}

export default TableHeader
