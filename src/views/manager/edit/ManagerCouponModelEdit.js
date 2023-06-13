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
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import DatePicker from 'react-datepicker'
// ** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { LOCALSTORAGE } from 'src/data/data'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { axiosIns } from 'src/@fake-db/backend'
import { Box, Chip } from '@mui/material'
import _ from 'lodash'

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
    coupon_name: '',
    coupon_type: 0,
    product_amount: 0,
    product_id: 0,
    spot_type: 0,
    mcht_ids: [],
    barcode_type: 0,
    valid_s_dt: returnMoment(false, new Date()).substring(0, 10),
    valid_e_dt: returnMoment(false, new Date()).substring(0, 10),
  }
  const [values, setValues] = useState(defaultObj)

  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])
  useEffect(() => {
    if (productList.length > 0 && mchtList.length > 0) {
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
      console.log(res_products?.data?.content)
      setProductList([...res_products?.data?.content]);
      const res_mchts = await axiosIns().get(`/api/v1/manager/utils/users?user=1&mcht=1`);
      if (res_mchts?.data?.mcht_id.length <= 0) {
        toast.error("가맹점부터 등록하셔야 장비를 추가하실 수 있습니다.");
        router.back();
      }
      let mcht_list = [...res_mchts?.data?.mcht_id];
      let mcht_id_obj = {};
      for (var i = 0; i < mcht_list.length; i++) {
        mcht_id_obj[mcht_list[i]?.id] = mcht_list[i];
      }
      setMchtIdObj(mcht_id_obj);
      setMchtList(mcht_list);
      let item = await getItem();
      if (item) {
        setSDt(new Date(item?.valid_s_dt));
        setEDt(new Date(item?.valid_e_dt));
        item['mcht_ids'] = item?.mchts.map(item => { return item?.id })
        delete item['mchts'];

        if (item['mcht_ids'].length == 0) {
          item['mcht_ids'] = [];
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
    if (prop == 'coupon_type') {
      if (event.target.value == 1) {
        setValues({
          ...values,
          [prop]: event.target.value,
          ['product_id']: productList[0]?.id,
          ['product_amount']: productList[0]?.item_pr
        });
        return;
      } else if (event.target.value == 0) {
        setValues({
          ...values,
          [prop]: event.target.value,
          ['product_id']: 0,
          ['product_amount']: 0
        });
        return;
      }
    }
    if (prop == 'product_id') {
      setValues({
        ...values,
        [prop]: event.target.value,
        ['product_amount']: _.find(productList, { id: event.target.value })?.item_pr
      });
      return;
    }
    if (prop == 'spot_type') {
      setValues({
        ...values,
        [prop]: event.target.value,
        ['mcht_ids']: []
      });
      return;
    }

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
                        onChange={handleChangeValue('coupon_name')} defaultValue={values?.coupon_name} value={values?.coupon_name}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>쿠폰타입</InputLabel>
                        <Select
                          label='Country'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='coupon_type'
                          onChange={handleChangeValue('coupon_type')}
                          defaultValue={values?.coupon_type ?? 0}
                          value={values?.coupon_type}
                        >
                          <MenuItem value={0}>{'할인쿠폰'}</MenuItem>
                          <MenuItem value={1}>{'교환쿠폰'}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='할인가'
                        placeholder='숫자를 입력해 주세요.'
                        type='number'
                        disabled={values?.coupon_type == 1}
                        onChange={handleChangeValue('product_amount')} defaultValue={values?.product_amount} value={values?.product_amount}
                      />
                    </Grid>
                    {values?.coupon_type == 1 ?
                      <>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-tabs-select-label'>상품선택</InputLabel>
                            <Select
                              label='상품선택'
                              id='form-layouts-tabs-select'
                              labelId='form-layouts-tabs-select-label'
                              className='product_id'
                              onChange={handleChangeValue('product_id')}
                              defaultValue={values?.product_id ?? 0}
                              value={values?.product_id}
                            >
                              {productList && productList.map((item, idx) => {
                                return <MenuItem value={item?.id} key={idx}>{item?.name}</MenuItem>
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      </>
                      :
                      <>
                      </>}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>사용장소타입</InputLabel>
                        <Select
                          label='사용장소타입'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='spot_type'
                          onChange={handleChangeValue('spot_type')}
                          defaultValue={values?.spot_type ?? 0}
                          value={values?.spot_type}
                        >
                          <MenuItem value={0}>{'모든가맹점'}</MenuItem>
                          <MenuItem value={1}>{'지정가맹점'}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {values?.spot_type == 1 ?
                      <>
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
                      </>
                      :
                      <>
                      </>}

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>바코드 타입</InputLabel>
                        <Select
                          label='바코드 타입'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='barcode_type'
                          onChange={handleChangeValue('barcode_type')}
                          defaultValue={values?.barcode_type ?? 0}
                          value={values?.barcode_type}
                        >
                          <MenuItem value={0} >{'바코드'}</MenuItem>
                          <MenuItem value={1} >{'QR코드'}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
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
                      <div>~</div>
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
