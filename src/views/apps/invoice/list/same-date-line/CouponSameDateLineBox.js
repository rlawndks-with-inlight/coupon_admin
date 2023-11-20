
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

const CouponSameDateLineBox = (props) => {

  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const router = useRouter();
  const loading_condition = typeof searchObj?.status == 'number';

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
      { status: -1, name: '전체' },
      { status: 0, name: '발행완료' },
      { status: 5, name: '발행취소' },
      { status: 7, name: '지급완료' },//이 아래일때, user_name, user_dt
      { status: 10, name: '사용완료' },
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
            <InputLabel id='demo-simple-select-outlined-label'>발행타입</InputLabel>
            <Select
              size='small'
              label='발행타입'
              value={searchObj?.status}
              id='demo-simple-select-outlined'
              labelId='demo-simple-select-outlined-label'
              onChange={async (e) => {
                try {
                  setLoading(true)
                  let obj = await handleChange('status', e.target.value);
                  changePage(1, false, obj);
                } catch (err) {
                  console.log(err);
                }

              }}
            >
              {statusList && statusList.map((item, idx) => {
                return <MenuItem key={idx} value={parseInt(item?.status)}>{item?.name}</MenuItem>
              }
              )}
            </Select>
          </FormControl>
        </>}


    </>
  )
}

export default CouponSameDateLineBox;
