
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router'

const PointSameDateLineBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const router = useRouter();

  const pub_type_list = [
    { name: '전체', is_cancel: -1 },
    { name: '발급', is_cancel: 0 },
    { name: '발급취소', is_cancel: 1 },
  ]
  useEffect(() => {
    settings();
  }, [router.query])
  useEffect(() => {
    if (typeof searchObj?.is_cancel == 'number') {
      setLoading(false);
    }
  }, [searchObj])

  const settings = async () => {
    setLoading(true);
  }

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <FormControl sx={{ minWidth: '110px' }}>
            <InputLabel id='demo-simple-select-outlined-label'>사용여부</InputLabel>
            <Select
              size='small'
              label='사용여부'
              value={searchObj?.is_cancel}
              id='demo-simple-select-outlined'
              labelId='demo-simple-select-outlined-label'
              onChange={async (e) => {
                try {
                  setLoading(true)
                  let obj = await handleChange('is_cancel', e.target.value);
                  changePage(1, false, obj);
                } catch (err) {
                  console.log(err);
                }

              }}
            >
              {pub_type_list && pub_type_list.map((item, idx) => {
                return <MenuItem key={idx} value={parseInt(item?.is_cancel)}>{item?.name}</MenuItem>
              }
              )}
            </Select>
          </FormControl>
        </>}


    </>
  )
}

export default PointSameDateLineBox;
