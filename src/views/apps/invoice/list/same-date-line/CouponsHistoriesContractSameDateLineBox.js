
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Autocomplete, Divider } from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { isConditionNumber } from 'src/@core/utils/function'
import { useSettings } from 'src/@core/hooks/useSettings'

const CouponsHistoriesContractSameDateLineBox = (props) => {

  const { settings } = useSettings();
  const { mchts = [] } = settings;
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const pub_type_list = [
    { name: '승인', is_cancel: 0 },
    { name: '취소', is_cancel: 1 },
  ]
  const loading_condition = isConditionNumber(searchObj?.is_cancel) && isConditionNumber(searchObj?.mcht_id)

  useEffect(() => {
    if (loading_condition) {
      setLoading(false);
    }
  }, [searchObj])
  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <FormControl sx={{ minWidth: '110px' }} size='small'>
            <InputLabel id='demo-simple-select-outlined-label'>조회 타입</InputLabel>
            <Select
              size='small'
              label='조회 타입'
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
          <Autocomplete
            size='small'
            sx={{ minWidth: '250px' }}
            id="mcht_id"
            defaultValue={_.find(mchts, { id: parseInt(searchObj?.mcht_id) })?.user_name ?? ""}
            onChange={async (e, value) => {
              let item = _.find(mchts, { user_name: value });
              let obj = await handleChange('mcht_id', item?.id ?? -1);
              changePage(1, false, obj);
            }}
            options={mchts && mchts.map((option) => option.user_name)}
            renderInput={(params) => <TextField {...params} label="가맹점상호" />}
          />
        </>}


    </>
  )
}
export default CouponsHistoriesContractSameDateLineBox;
