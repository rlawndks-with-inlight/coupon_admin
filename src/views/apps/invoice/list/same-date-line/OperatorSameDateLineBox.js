
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

const OperatorSameDateLineBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj, userData } = props;
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const router = useRouter();
  const [userLevelList, setUserLevelList] = useState([]);
  const pub_type_list = [
    { name: '전체', level: -1 },
    { name: '직원', level: 35 },
    { name: '본사', level: 40 },
    { name: '협력사', level: 45 },
    { name: '개발사', level: 50 },
  ]
  const loading_condition = typeof searchObj?.level == 'number' && userLevelList.length > 0
  useEffect(() => {
    settings();
  }, [router.query])
  useEffect(() => {
    if (loading_condition) {
      setLoading(false);
    }
  }, [searchObj, userLevelList])

  const settings = async () => {
    if (!loading_condition) {
      setLoading(true);
    }
    let pub_type_list = [
      { name: '전체', level: -1 },
      { name: '본사', level: 40 },
      { name: '직원', level: 35 },
    ]
    if (userData?.level >= 50) {
      pub_type_list = [
        { name: '전체', level: -1 },
        { name: '개발사', level: 50 },
        { name: '협력사', level: 45 },
        { name: '본사', level: 40 },
        { name: '직원', level: 35 },
      ]
    }
    setUserLevelList(pub_type_list);
  }

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <FormControl sx={{ minWidth: '110px' }}>
            <InputLabel id='demo-simple-select-outlined-label'>유저레벨</InputLabel>
            <Select
              size='small'
              label='사용여부'
              value={searchObj?.level}
              id='demo-simple-select-outlined'
              labelId='demo-simple-select-outlined-label'
              onChange={async (e) => {
                try {
                  setLoading(true)
                  let obj = await handleChange('level', e.target.value);
                  changePage(1, false, obj);
                } catch (err) {
                  console.log(err);
                }

              }}
            >
              {userLevelList && userLevelList.map((item, idx) => {
                return <MenuItem key={idx} value={parseInt(item?.level)}>{item?.name}</MenuItem>
              }
              )}
            </Select>
          </FormControl>
        </>}


    </>
  )
}

export default OperatorSameDateLineBox;
