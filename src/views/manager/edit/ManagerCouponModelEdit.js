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
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { LOCALSTORAGE } from 'src/data/data'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { axiosIns } from 'src/@fake-db/backend'
import Typography from '@mui/material/Typography'
import { Box, Chip } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}
const ManagerCouponModelEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-0')
  const [userLevelList, setUserLevelList] = useState([]);
  const [sDt, setSDt] = useState(new Date());
  const [eDt, setEDt] = useState(new Date());
  const [userData, setUserData] = useState();
  const [productList, setProductList] = useState([]);
  const [mchtList, setMchtList] = useState([]);
  const [mchtIdObj, setMchtIdObj] = useState([]);
  const defaultObj = {
    coupon_img: undefined,
    name: '',
    sale_amt: '',
    valid_s_dt: returnMoment(false, new Date()).substring(0, 10),
    valid_e_dt: returnMoment(false, new Date()).substring(0, 10),
    code_type: 0,
    prod_id: 0,
    mcht_ids: []
  }
  const [values, setValues] = useState(defaultObj)

  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])
  useEffect(() => {
    if (productList.length > 0 && mchtList.length > 0) {
      console.log(productList)
      setLoading(false);
    }
  }, [productList, mchtList])
  // const settingPage = async () => {
  //   setLoading(true);
  //   let user = await getLocalStorage('user_data');
  //   user = JSON.parse(user);

  //   let z_all_user = [
  //     { level: 50, name: '개발사' },
  //     { level: 40, name: '본사' },
  //     { level: 30, name: '지사' },
  //     { level: 20, name: '총판' },
  //     { level: 15, name: '대리점' },
  //     { level: 10, name: '가맹점' },
  //     { level: 0, name: '일반유저' },
  //   ];
  //   let user_level_list = [];
  //   for (var i = 0; i < z_all_user.length; i++) {
  //     if (z_all_user[i].level < user?.level) {
  //       user_level_list.push(z_all_user[i]);
  //     }
  //   }
  //   setValues({ ...values, 'level': user_level_list[0]?.level })
  //   setUserLevelList(user_level_list);
  // }
  const settingPage = async () => {
    try {
      setLoading(true);
      let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
      user = JSON.parse(user);
      const res_products = await axiosIns().get(`/api/v1/manager/products?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01`)
      setProductList([...[{ id: 0, name: '일반할인쿠폰' }], ...res_products?.data?.content]);
      const res_mchts = await axiosIns().get(`/api/v1/manager/utils/users?user=1&mcht=1`);
      if (res_mchts?.data?.mcht_id.length <= 0) {
        toast.error("가맹점부터 등록하셔야 장비를 추가하실 수 있습니다.");
        router.back();
      }
      let mcht_list = [...[{ id: 0, user_name: '모든 가맹점' }], ...res_mchts?.data?.mcht_id];
      let mcht_id_obj = {};
      for (var i = 0; i < mcht_list.length; i++) {
        mcht_id_obj[mcht_list[i]?.id] = mcht_list[i];
      }
      setMchtIdObj(mcht_id_obj);
      setMchtList(mcht_list);
      let item = await getItem();
      if (item) {
        console.log(item)
        setSDt(new Date(item?.valid_s_dt));
        setEDt(new Date(item?.valid_e_dt));
        item['mcht_ids'] = JSON.parse(item?.mcht_ids ?? '[]');
        if (item['mcht_ids'].length == 0) {
          item['mcht_ids'] = [0];
        }
        setValues({ ...item, ['mcht_ids']: item['mcht_ids'] });
      } else {
        setValues({ ...values });
      }
    } catch (err) {
      console.log(err);
    }
  }
  // const getOneItem = async () => {
  //   let item = await getItem();
  //   if (item) {
  //     setBDt(new Date(item?.birth_date));
  //     let obj = {};
  //     for (var i = 0; i < Object.keys(values).length; i++) {
  //       let key = Object.keys(values)[i];
  //       obj[key] = item[key];
  //     }
  //     setValues({ ...obj });
  //   }
  // }

  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }
  const handleChangeMultiSelect = event => {
    let list = [...event.target.value];
    if (list[list.length - 1] == 0) {
      setValues({ ...values, ['mcht_ids']: [0] })
    } else {
      if (list[0] == 0) {
        list.shift();
      }
      setValues({ ...values, ['mcht_ids']: list })
    }
  }
  const onReset = () => {
    setBDt(new Date());
    setValues(defaultObj);
  }
  const onEditItem = () => {
    try {
      let img_key_list = ['coupon_img'];
      let make_json_string_list = ['mcht_ids'];
      let obj = { ...values };
      for (var i = 0; i < img_key_list.length; i++) {
        if (!obj[img_key_list[i]] || typeof obj[img_key_list[i]] != 'object') {
          delete obj[img_key_list[i]];
        } else {
          obj[img_key_list[i]] = obj[img_key_list[i]][0];
        }
      }
      for (var i = 0; i < make_json_string_list.length; i++) {
        if (obj[make_json_string_list[i]].includes(0)) {
          obj[make_json_string_list[i]] = [];
        }
        obj[make_json_string_list[i]] = JSON.stringify(obj[make_json_string_list[i]]);
      }
      editItem(obj);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>쿠폰 이미지</InputLabel>
                      <FileUploaderSingle
                        className='coupon_img'
                        setValues={setValues}
                        values={values}
                        value={values?.coupon_img}
                        sx={{ width: 'auto', height: '240px' }}
                        placeholder={'max-width: 512px, 이상은 리사이징'}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>기본정보</InputLabel>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='쿠폰명'
                        placeholder='쿠폰명를 입력해 주세요.'
                        onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='할인가'
                        placeholder='숫자를 입력해 주세요.'
                        type='number'
                        onChange={handleChangeValue('sale_amt')} defaultValue={values?.sale_amt} value={values?.sale_amt}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>쿠폰 타입</InputLabel>
                        <Select
                          label='Country'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='code_type'
                          onChange={handleChangeValue('code_type')}
                          defaultValue={values?.code_type ?? 0}
                          value={values?.code_type}
                        >
                          <MenuItem value={0} >{'바코드'}</MenuItem>
                          <MenuItem value={1} >{'QR코드'}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        selected={sDt}
                        id='month-year-dropdown'
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        popperPlacement={popperPlacement}
                        onChange={async (date) => {
                          try {
                            setSDt(date);
                            handleChange('valid_s_dt', returnMoment(false, date).substring(0, 10));
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        customInput={<CustomInput label='유효기간 시작일' />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        selected={eDt}
                        id='month-year-dropdown'
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        popperPlacement={popperPlacement}
                        onChange={async (date) => {
                          try {
                            setEDt(date);
                            handleChange('valid_e_dt', returnMoment(false, date).substring(0, 10));
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                        customInput={<CustomInput label='유효기간 종료일' />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>상품</InputLabel>
                        <Select
                          label='상품'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='prod_id'
                          onChange={handleChangeValue('prod_id')}
                          defaultValue={values?.prod_id ?? 0}
                          value={values?.prod_id}
                        >
                          {productList && productList.map((item, idx) => {
                            return <MenuItem value={item?.id} key={idx}>{item?.name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='demo-multiple-chip-label'>적용할 가맹점</InputLabel>
                        <Select
                          multiple
                          label='적용할 가맹점'
                          value={values?.mcht_ids}
                          MenuProps={MenuProps}
                          id='demo-multiple-chip'
                          onChange={handleChangeMultiSelect}
                          labelId='demo-multiple-chip-label'
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              {selected.map((item, idx) => (
                                <Chip key={idx} label={mchtIdObj[item]?.user_name} sx={{ m: 0.75 }} />
                              ))}
                            </Box>
                          )}
                        >
                          {mchtList && mchtList.map((item, idx) => (
                            <MenuItem key={idx} value={item?.id}>
                              {item?.user_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button type='submit' sx={{ mr: 2 }} variant='contained'
                onClick={onEditItem}>
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

export default ManagerCouponModelEdit;
