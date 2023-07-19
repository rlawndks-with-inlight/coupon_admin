
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

const UserSameDateLineBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const router = useRouter();

  const pub_type_list = [
    { name: '전체', unsubscribe: -1 },
    { name: '수신', unsubscribe: 0 },
    { name: '수신거부', unsubscribe: 1 },
  ]
  const loading_condition = typeof searchObj?.unsubscribe == 'number'
  useEffect(() => {
    settings();
  }, [router.query])
  useEffect(() => {
    if (loading_condition) {
      setLoading(false);
    }
  }, [searchObj])

  const settings = async () => {
    if (!loading_condition) {
      setLoading(true);
    }
  }

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <FormControl sx={{ minWidth: '110px' }}>
            <InputLabel id='demo-simple-select-outlined-label'>수신여부</InputLabel>
            <Select
              size='small'
              label='수신여부'
              value={searchObj?.unsubscribe}
              id='demo-simple-select-outlined'
              labelId='demo-simple-select-outlined-label'
              onChange={async (e) => {
                try {
                  setLoading(true)
                  let obj = await handleChange('unsubscribe', e.target.value);
                  changePage(1, false, obj);
                } catch (err) {
                  console.log(err);
                }

              }}
            >
              {pub_type_list && pub_type_list.map((item, idx) => {
                return <MenuItem key={idx} value={parseInt(item?.unsubscribe)}>{item?.name}</MenuItem>
              }
              )}
            </Select>
          </FormControl>
        </>}


    </>
  )
}

export default UserSameDateLineBox;
