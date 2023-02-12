
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
  useEffect(() => {
    settings();
  }, [router.query])
  useEffect(() => {
    if (typeof searchObj?.appr_status == 'number') {
      setLoading(false);
    }
  }, [searchObj])

  const settings = async () => {
    setLoading(true);

    let z_status = [
      { appr_status: -1, name: '전체' },
      { appr_status: 1, name: '사용' },
      { appr_status: 0, name: '사용안함' },
    ];

    setStatusList(z_status);
    let obj = { ...defaultSearchObj, appr_status: z_status[0]?.appr_status };
    changePage(1, false, obj);
  }

  return (
    <>
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
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
                    console.log(e.target.value)
                    let obj = await handleChange('appr_status', e.target.value);
                    changePage(page, false, obj);
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
      </Box>
      <Divider />
    </>
  )
}

export default DeviceSameDateLineBox;
