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

//** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { axiosIns } from 'src/@fake-db/backend'

const ManagerOperatorEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory } = props;

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-0')
  const [userLevelList, setUserLevelList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [bDt, setBDt] = useState(new Date())
  const defaultObj = {
    profile_img: undefined,
    brand_id: brandList[0]?.id ?? 0,
    user_name: '',
    user_pw: '',
    nick_name: '',
    birth_date: returnMoment(false, new Date()).substring(0, 10),
    level: 0,
  }
  const [values, setValues] = useState(defaultObj);
  useEffect(() => {
    if (userLevelList.length > 0) {
      setLoading(false);
    }
  }, [userLevelList])
  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);
      const response = await axiosIns().get(`/api/v1/manager/brands?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01`);
      setBrandList(response?.data?.content);
      let user = await getLocalStorage('user_data');
      user = JSON.parse(user);
      let z_all_user = [];
      if (user?.level == 50) {
        z_all_user = [
          { level: 50, name: '?????????' },
          { level: 45, name: '?????????' },
          { level: 40, name: '??????' },
          { level: 35, name: '??????' },

          // { level: 30, name: '??????' },
          // { level: 20, name: '??????' },
          // { level: 15, name: '?????????' },
          // { level: 10, name: '?????????' },
          // { level: 0, name: '????????????' },
        ];
      } else if (user?.level == 40) {
        z_all_user = [
          //  { level: 50, name: '?????????' },
          // { level: 45, name: '?????????' },
          { level: 40, name: '??????' },
          { level: 35, name: '??????' },
          // { level: 30, name: '??????' },
          // { level: 20, name: '??????' },
          // { level: 15, name: '?????????' },
          // { level: 10, name: '?????????' },
          // { level: 0, name: '????????????' },
        ];
      }
      let user_level_list = [...z_all_user];

      let item = await getItem();
      if (item) {
        let obj = {};
        for (var i = 0; i < Object.keys(values).length; i++) {
          let key = Object.keys(values)[i];
          obj[key] = item[key];
        }
        setValues({ ...obj });
      } else {
        setValues({ ...values, 'level': user_level_list[0]?.level, 'brand_id': response?.data?.content[0]?.id });
      }
      setUserLevelList(user_level_list);
    } catch (err) {
      console.log(err);
    }
  }

  const getOneItem = async () => {
    let item = await getItem();
    let obj = {};
    if (item) {
      setBDt(new Date(item?.birth_date));
      for (var i = 0; i < Object.keys(values).length; i++) {
        let key = Object.keys(values)[i];
        obj[key] = item[key];
      }
    }
    return obj;
  }


  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const onReset = async () => {
    setBDt(new Date());
    setValues({ ...defaultObj, level: userLevelList[0].level });
  }
  const onEditItem = () => {
    let img_key_list = ['profile_img'];
    let obj = { ...values };
    for (var i = 0; i < img_key_list.length; i++) {
      if (!obj[img_key_list[i]] || typeof obj[img_key_list[i]] != 'object') {
        delete obj[img_key_list[i]];
      } else {
        obj[img_key_list[i]] = obj[img_key_list[i]][0];
      }
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
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>????????? ?????????</InputLabel>
                      <FileUploaderSingle
                        className='profile_img'
                        setValues={setValues}
                        values={values}
                        value={values?.profile_img}
                        sx={{ width: '120px', height: '120px' }}
                        placeholder={'120px * 120px'}
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card>
                <CardContent>
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>????????????</InputLabel>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>????????????</InputLabel>
                        <Select
                          label='Country'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='level'
                          onChange={handleChangeValue('brand_id')}
                          defaultValue={values?.brand_id}
                          value={values?.brand_id}
                        >
                          {brandList && brandList.map((item, idx) => {
                            return <MenuItem value={item?.id} key={idx}>{item?.name}</MenuItem>
                          })}

                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='???????????????'
                        placeholder='?????????????????? ????????? ?????????.'
                        disabled={editCategory == 'edit'}
                        onChange={handleChangeValue('user_name')} defaultValue={values?.user_name} value={values?.user_name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='tabler:user' />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    {editCategory == 'create' ?
                      <>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label='????????????'
                            placeholder='****'
                            type={'password'}
                            autoComplete={'new-password'}
                            onChange={handleChangeValue('user_pw')} defaultValue={values?.user_pw} value={values?.user_pw}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  <Icon icon='tabler:lock' />
                                </InputAdornment>
                              )
                            }}
                          />
                        </Grid>
                      </>
                      :
                      <>
                      </>}

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='?????????'
                        placeholder='???????????? ????????? ?????????.'
                        onChange={handleChangeValue('nick_name')} defaultValue={values?.nick_name} value={values?.nick_name}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <Icon icon='tabler:user' />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>????????????</InputLabel>
                        <Select
                          label='Country'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='level'
                          onChange={handleChangeValue('level')}
                          defaultValue={values?.level}
                          value={values?.level}
                        >
                          {userLevelList && userLevelList.map((item, idx) => {
                            return <MenuItem value={item?.level} key={idx}>{item?.name}</MenuItem>
                          })}

                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <DatePicker
                        showYearDropdown
                        showMonthDropdown
                        selected={bDt}
                        id='month-year-dropdown'
                        placeholderText='YYYY-MM-DD'
                        dateFormat={'yyyy-MM-dd'}
                        popperPlacement={popperPlacement}
                        onChange={async (date) => {
                          try {
                            setBDt(date);
                            handleChange('birth_date', returnMoment(false, date).substring(0, 10));
                          } catch (err) {
                            console.log(err);
                          }

                        }}
                        customInput={<CustomInput label='?????? ????????????' />}
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
                ??????
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={onReset}>
                ??????
              </Button>
            </CardContent>
          </Card>
        </>
      }

    </>
  )
}

export default ManagerOperatorEdit;
