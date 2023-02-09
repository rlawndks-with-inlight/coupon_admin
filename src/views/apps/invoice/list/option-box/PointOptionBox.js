
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
import DatePicker from 'react-datepicker'
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { useTheme } from '@mui/material/styles'
import { returnMoment } from 'src/@core/utils/function'
import $ from 'jquery';

const PointOptionBox = (props) => {
  const { changePage, page, handleChange, searchObj, setSearchObj, defaultSearchObj } = props;
  const [userLevelList, setUserLevelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [sDt, setSDt] = useState(new Date());
  const [eDt, setEDt] = useState(new Date());
  const isSeeRef = useRef([]);

  const pub_type_list = [
    { name: '전체', pub_type: 10 },
    { name: '발급', pub_type: 0 },
    { name: '사용', pub_type: 1 },
    { name: '발급취소', pub_type: 2 },
    { name: '사용취소', pub_type: 3 },
  ]
  useEffect(() => {
    if ($('.css-x2in24-MuiInputBase-input-MuiOutlinedInput-input').offset()?.top) {
      $('.css-x2in24-MuiInputBase-input-MuiOutlinedInput-input').attr('style', 'padding: 8.5px 14px !important;');
    }
  }, [$('.css-x2in24-MuiInputBase-input-MuiOutlinedInput-input').offset()])
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement = direction === 'ltr' ? 'bottom-start' : 'bottom-end'
  useEffect(() => {
    settings();
  }, [router.query])
  useEffect(() => {
    if (typeof searchObj?.pub_type == 'number' && searchObj?.pub_type >= 0) {
      setLoading(false);
    }
  }, [searchObj])

  const settings = async () => {
    setLoading(true);
    let date = new Date();

    let first_day = new Date(date.getFullYear(), date.getMonth(), 1);
    setSDt(first_day)
    setEDt(new Date())
    let today = returnMoment().substring(0, 10);
    let obj = { ...defaultSearchObj, pub_type: pub_type_list[0]?.pub_type, s_dt: returnMoment(false, first_day).substring(0, 10), e_dt: today };
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
            <FormControl sx={{ mr: 4 }}>
              <InputLabel id='demo-simple-select-outlined-label'>발급타입</InputLabel>
              <Select
                size='small'
                label='발급타입'
                value={searchObj?.pub_type}
                id='demo-simple-select-outlined'
                labelId='demo-simple-select-outlined-label'
                onChange={async (e) => {
                  try {
                    setLoading(true)
                    let obj = await handleChange('pub_type', e.target.value);
                    changePage(page, false, obj);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                {pub_type_list && pub_type_list.map((item, idx) => {
                  return <MenuItem key={idx} value={parseInt(item?.pub_type)}>{item?.name}</MenuItem>
                }
                )}
              </Select>
            </FormControl>
            <div style={{ marginRight: '1rem' }} >
              <DatePicker
                selected={sDt}
                dateFormat="yyyy-MM-dd"
                popperPlacement={popperPlacement}
                onChange={async (date) => {
                  try {
                    setLoading(true)
                    setSDt(date);
                    let obj = await handleChange('s_dt', returnMoment(false, date).substring(0, 10));
                    changePage(page, false, obj);
                  } catch (err) {
                    console.log(err);
                  }

                }}
                placeholderText='Click to select a date'
                customInput={<CustomInput label='시작일' ref={(el) => (isSeeRef.current[0] = el)} />}

              />
            </div>
            <div>
              <DatePicker
                selected={eDt}
                dateFormat="yyyy-MM-dd"
                popperPlacement={popperPlacement}
                onChange={async (date) => {
                  setLoading(true)
                  setEDt(date);
                  let obj = await handleChange('e_dt', returnMoment(false, date).substring(0, 10));
                  changePage(page, false, obj);
                }}
                placeholderText='Click to select a date'
                customInput={<CustomInput label='종료일' ref={(el) => (isSeeRef.current[1] = el)} />}

              />
            </div>
          </>}
      </Box>
      <Divider />
    </>
  )
}

export default PointOptionBox;
