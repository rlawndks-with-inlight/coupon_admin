import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import CardActions from '@mui/material/CardActions'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import CardSnippet from 'src/@core/components/card-snippet'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'
import Icon from 'src/@core/components/icon'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { axiosIns } from 'src/@fake-db/backend'
import DatePicker from 'react-datepicker'
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment } from 'src/@core/utils/function'
import { toast } from 'react-hot-toast'

const ManagerPointEdit = (props) => {
  const { getItem, editItem, popperPlacement } = props;

  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [pubDt, setPubDt] = useState(new Date())

  const [values, setValues] = useState({
    user_name: '',
    mcht_id: mchtList[0]?.id,
    purchase_price: 0,
    use_amount: 0,
    point_rate: 0,
    created_at: returnMoment(false, new Date()),
    is_cancel: 0
  })
  useEffect(() => {
    if (mchtList.length > 0) {
      setLoading(false);
    }
  }, [mchtList])
  useEffect(() => {
    settingPage();
    getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);
      const response = await axiosIns().get(`/api/v1/manager/users/sub/users?user=1&mcht=1`);
      setMchtList(response?.data?.mcht_id);
      setUserList(response?.data?.user_id?.normals);
      setValues({ ...values, 'mcht_id': response?.data?.mcht_id[0]?.id });
    } catch (err) {
      console.log(err);
    }
  }

  const getOneItem = async () => {
    let item = await getItem();
    if (item) {
      let obj = {};
      for (var i = 0; i < Object.keys(values).length; i++) {
        let key = Object.keys(values)[i];
        obj[key] = item[key];
      }
      setValues({ ...obj });
    }
  }

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const onReset = () => {
    setValues({
      user_name: '',
      mcht_id: mchtList[0]?.id,
      purchase_price: 0,
      use_amount: 0,
      point_rate: 0,
      created_at: returnMoment(false, new Date()),
      is_cancel: 0
    })
    setPubDt(new Date());
  }

  const onSaveItem = async (obj_) => {
    let obj = obj_;

    let user_idx = userList.map(item => {
      return item?.user_name
    }).findIndex((e) => e == values?.user_name);
    if (user_idx < 0) {
      toast.error('유저아이디를 찾을 수 없습니다.');
    } else {
      obj['user_id'] = userList[user_idx]?.id;
      delete obj['user_name'];
    }
    editItem(obj);
  }

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <Card>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='유저아이디(전화번호)' placeholder='유저아이디를 입력해 주세요.' className='user_name' onChange={handleChangeValue('user_name')} defaultValue={values?.user_name} value={values?.user_name} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>가맹점명</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='mcht_id'
                      onChange={(e) => {
                        for (var i = 0; i < mchtList.length; i++) {
                          if (e.target.value == mchtList[i].id) {
                            setValues({ ...values, mcht_id: e.target.value, point_rate: mchtList[i].point_rate });
                            return;
                          }
                        }
                      }}
                      defaultValue={values?.mcht_id ?? 0}
                      value={values?.mcht_id}
                    >
                      {mchtList && mchtList.map((item, idx) => {
                        return <MenuItem value={item?.id} key={idx}>{item?.mcht_name}</MenuItem>
                      })}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='결제금액' placeholder='결제금액을 입력해 주세요.' className='name' onChange={handleChangeValue('purchase_price')} defaultValue={values?.purchase_price} value={values?.purchase_price} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='사용포인트' placeholder='사용포인트를 입력해 주세요.' className='use_amount' onChange={handleChangeValue('use_amount')} defaultValue={values?.use_amount} value={values?.use_amount} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='포인트 변환률' placeholder='포인트 변환률을 입력해 주세요.' className='name' onChange={handleChangeValue('point_rate')} defaultValue={values?.point_rate} value={values?.point_rate} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>사용 타입</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='is_cancel'
                      onChange={handleChangeValue('is_cancel')}
                      defaultValue={values?.is_cancel ?? 0}
                      value={values?.is_cancel}
                    >
                      <MenuItem value={0} >{'적립'}</MenuItem>
                      <MenuItem value={1} >{'적립취소'}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    selected={pubDt}
                    id='date-time-picker'
                    dateFormat='yyyy-MM-dd h:mm aa'
                    popperPlacement={popperPlacement}
                    onChange={async (date) => {
                      try {
                        setPubDt(date);
                        handleChange('created_at', returnMoment(false, date));
                      } catch (err) {
                        console.log(err);
                      }

                    }}
                    customInput={<CustomInput label='발행시간' />}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => {
                onSaveItem({ ...values })
              }}>
                저장
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={onReset}>
                리셋
              </Button>
            </CardContent>
          </Card>
        </>
      }

    </>
  )
}

export default ManagerPointEdit;
