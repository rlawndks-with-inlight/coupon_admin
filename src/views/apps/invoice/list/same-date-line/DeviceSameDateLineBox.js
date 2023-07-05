
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

const DeviceSameDateLineBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const router = useRouter();
  const loading_condition = typeof searchObj?.appr_status == 'number';
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

    let z_status = [
      { appr_status: -1, name: '전체' },
      { appr_status: 1, name: '사용' },
      { appr_status: 0, name: '사용안함' },
    ];
    setStatusList(z_status);
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
              value={searchObj?.appr_status}
              id='demo-simple-select-outlined'
              labelId='demo-simple-select-outlined-label'
              onChange={async (e) => {
                try {
                  setLoading(true)
                  let obj = await handleChange('appr_status', e.target.value);
                  changePage(1, false, obj);
                } catch (err) {
                  console.log(err);
                }

              }}
            >
              {statusList && statusList.map((item, idx) => {
                return <MenuItem key={idx} value={parseInt(item?.appr_status)}>{item?.name}</MenuItem>
              }
              )}
            </Select>
          </FormControl>
        </>}


    </>
  )
}

export default DeviceSameDateLineBox;
