
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Autocomplete, Divider } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { axiosIns } from 'src/@fake-db/backend'
import { isConditionNumber } from 'src/@core/utils/function'

const UserSameDateLineBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);
  const router = useRouter();

  const pub_type_list = [
    { name: '전체', unsubscribe: -1 },
    { name: '수신', unsubscribe: 0 },
    { name: '수신거부', unsubscribe: 1 },
  ]
  const loading_condition = isConditionNumber(searchObj?.unsubscribe) && isConditionNumber(searchObj?.mcht_id)
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
    let mchts = [];
    try {
      mchts = await axiosIns().get(`/api/v1/manager/utils/users?mcht=1`);
      mchts = mchts?.data?.mcht_id ?? []
    } catch (err) {

    }
    mchts.unshift({
      id: -1,
      mcht_name: '전체',
      user_name: '전체'
    })
    setMchtList(mchts)
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
          <Autocomplete
            size='small'
            sx={{ minWidth: '250px' }}
            id="mcht_id"
            defaultValue={_.find(mchtList, { id: parseInt(searchObj?.mcht_id) })?.user_name ?? ""}
            onChange={async (e, value) => {
              let item = _.find(mchtList, { user_name: value });
              let obj = await handleChange('mcht_id', item?.id);
              changePage(1, false, obj);
            }}
            options={mchtList && mchtList.map((option) => option.user_name)}
            renderInput={(params) => <TextField {...params} label="가맹점상호" />}
          />
        </>}


    </>
  )
}

export default UserSameDateLineBox;
