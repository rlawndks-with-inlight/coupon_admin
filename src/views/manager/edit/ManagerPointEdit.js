import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import { axiosIns } from 'src/@fake-db/backend'
import DatePicker from 'react-datepicker'
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { commarNumber, returnMoment } from 'src/@core/utils/function'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Autocomplete } from '@mui/material'
import _ from 'lodash'
import { themeObj } from 'src/@core/layouts/components/app/style-component'
import { useSettings } from 'src/@core/hooks/useSettings'

const ManagerPointEdit = (props) => {
  const { getItem, editItem, popperPlacement } = props;

  const router = useRouter();
  const { settings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [pubDt, setPubDt] = useState(new Date())

  const [values, setValues] = useState({
    phone_num: '',
    mcht_id: mchtList[0]?.id,
    purchase_price: 0,
    use_amount: 0,
    point_rate: 0,
    created_at: returnMoment(false, new Date()),
    is_cancel: 0
  })
  useEffect(() => {
    if (mchtList.length > 0) {
      if (router.query?.edit_category == 'edit') {
        if (values?.phone_num) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [mchtList, values]);
  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);
      let mcht_list = settings?.mchts;
      setMchtList(_.sortBy(mcht_list, 'user_name'));
      if (mcht_list.length <= 0) {
        toast.error("가맹점부터 등록하셔야 장비를 추가하실 수 있습니다.");
        router.back();
      }
      let item = await getItem();
      if (item) {
        let obj = {};
        for (var i = 0; i < Object.keys(values).length; i++) {
          let key = Object.keys(values)[i];
          obj[key] = item[key];
        }
        setValues({ ...obj });
      } else {
        setValues({ ...values, 'mcht_id': _.sortBy(mcht_list, 'mcht_name')[0]?.id });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const getOneItem = async () => {
  //   let item = await getItem();
  //   if (item) {
  //     let obj = {};
  //     for (var i = 0; i < Object.keys(values).length; i++) {
  //       let key = Object.keys(values)[i];
  //       obj[key] = item[key];
  //     }
  //     setValues({ ...obj });
  //   }
  // }

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
      phone_num: '',
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
    let find_user_obj = {
      user: 1,
      mcht: 0,
      phone_num: values?.phone_num
    }
    const res_find_user = await axiosIns().post(`/api/v1/manager/utils/search`, find_user_obj)
    if (res_find_user?.data?.users.length > 0) {
      obj['user_id'] = res_find_user?.data?.users[0]?.id
      //user_id
    } else {
      toast.error(`유저가 존재하지 않습니다.`);
      return;
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
                  <TextField fullWidth label='유저아이디(전화번호)' placeholder='유저아이디를 입력해 주세요.' className='phone_num' onChange={handleChangeValue('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num} />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>가맹점상호</InputLabel>
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
                        return <MenuItem value={item?.id} key={idx}>{item?.user_name}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <Autocomplete
                    id="mcht_id"
                    defaultValue={_.find(mchtList, { id: values?.mcht_id })?.mcht_name ?? ""}
                    onChange={(e, value) => {
                      let item = _.find(mchtList, { mcht_name: value });
                      setValues({ ...values, mcht_id: item?.id, point_rate: item?.point_rate });
                    }}
                    options={mchtList && mchtList.map((option) => option.mcht_name)}
                    renderInput={(params) => <TextField {...params} label="가맹점상호" />}
                  />
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
                <Grid item xs={12} sm={6}>
                  <div style={{ fontWeight: 'bold', color: themeObj.grey[400] }}>적립 포인트: {values?.is_cancel == 1 ? '-' : '+'}{commarNumber(parseInt((parseInt(values?.purchase_price) - parseInt(values?.use_amount)) * (parseInt(values?.point_rate)) / 100) ?? "0")}</div>
                </Grid>
                <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
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

