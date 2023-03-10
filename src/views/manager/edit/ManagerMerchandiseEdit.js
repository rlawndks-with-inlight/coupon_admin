import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
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
import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'

// ** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { LOCALSTORAGE } from 'src/data/data'
import { axiosIns } from 'src/@fake-db/backend'
import { useTheme } from '@emotion/react'

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: '0 !important',
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius
  }
}))

const ManagerMerchandiseEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory, userData } = props;

  const theme = useTheme();

  const [tabValue, setTabValue] = useState('tab-1')
  const [bDt, setBDt] = useState(new Date())
  const [mchtList, setMchtList] = useState([]);
  const [userList, setUserList] = useState([]);
  const defaultObj = {
    profile_img: undefined,
    user_name: '',
    user_pw: '',
    nick_name: '',
    birth_date: returnMoment(false, new Date()).substring(0, 10),
    group_id: 0,
    mcht_name: '',
    addr: '',
    stamp_flag: 0,
    point_flag: 0,
    stamp_save_count: 0,
    point_rate: 0,
  }
  const [values, setValues] = useState(defaultObj)
  useEffect(() => {
    settingPage();
  }, [])

  const settingPage = async () => {
    try {
      const response = await axiosIns().get(`/api/v1/manager/users/sub/users?user=1&mcht=1`);
      let user_list = [...response?.data?.mcht_id ?? []];
      for (var i = 0; i < user_list.length; i++) {
        user_list[i]['group_id'] = user_list[i]['id'];
      }
      setUserList(user_list);
      let obj = await getOneItem();
      setValues({ ...obj, 'group_id': user_list[0]['group_id'] });
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
      setValues({ ...obj });
    } else {
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      obj = { ...values, point_flag: dns_data?.point_flag, point_rate: dns_data?.point_rate, stamp_flag: dns_data?.stamp_flag, stamp_save_count: dns_data?.stamp_save_count };
      setValues({ ...obj });
    }
    return obj;
  }

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onReset = () => {
    setBDt(new Date());
    setValues(defaultObj)
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
                    customInput={<CustomInput label='????????????' />}
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
                  <TextField fullWidth label='????????? ?????????' placeholder='????????? ???????????? ????????? ?????????.' className='user_name' disabled={editCategory == 'edit'} onChange={handleChangeValue('user_name')} defaultValue={values?.user_name} value={values?.user_name} />
                </Grid>
                {editCategory == 'create' ?
                  <>
                    <Grid item xs={12}>
                      <TextField fullWidth label='????????????' placeholder='??????????????? ????????? ?????????.' type={'password'} autoComplete={'new-password'} className='user_pw' onChange={handleChangeValue('user_pw')} defaultValue={values?.user_pw} value={values?.user_pw} />
                    </Grid>
                  </>
                  :
                  <>
                  </>}
                <Grid item xs={12}>
                  <TextField fullWidth label='????????????' placeholder='??????????????? ????????? ?????????.' className='nick_name' onChange={handleChangeValue('nick_name')} defaultValue={values?.nick_name} value={values?.nick_name} />
                </Grid>
                {/* {userData?.level >= 15 ?
                  <>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>?????? ID</InputLabel>
                        <Select
                          label='Country'
                          id='form-layouts-tabs-select'
                          labelId='form-layouts-tabs-select-label'
                          className='group_id'
                          onChange={handleChangeValue('group_id')}
                          defaultValue={values?.group_id ?? 0}
                          value={values?.group_id}
                        >
                          {userList && userList.map((item, idx) => {
                            return <MenuItem value={item?.group_id} key={idx}>{item?.mcht_name}</MenuItem>
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                  :
                  <>
                  </>} */}

                <Grid item xs={12}>
                  <TextField fullWidth label='????????? ??????' placeholder='????????? ????????? ????????? ?????????.' className='mcht_name' onChange={handleChangeValue('mcht_name')} defaultValue={values?.mcht_name} value={values?.mcht_name} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='????????? ??????' placeholder='????????? ????????? ????????? ?????????.' className='addr' onChange={handleChangeValue('addr')} defaultValue={values?.addr} value={values?.addr} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>????????? ????????????</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='stamp_flag'
                      onChange={handleChangeValue('stamp_flag')}
                      defaultValue={values?.stamp_flag}
                      value={values?.stamp_flag}
                    >
                      <MenuItem value='0'>????????????</MenuItem>
                      <MenuItem value='1'>??????</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {values?.stamp_flag == 1 ?
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='????????? ????????? ????????????'
                        placeholder='????????? ????????? ??????????????? ????????? ?????????.'
                        className='stamp_save_count'
                        onChange={handleChangeValue('stamp_save_count')}
                        defaultValue={values?.stamp_save_count}
                        value={values?.stamp_save_count}
                      />
                    </Grid>
                  </>
                  :
                  <>
                  </>}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>????????? ????????????</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='point_flag'
                      onChange={handleChangeValue('point_flag')}
                      defaultValue={values?.point_flag}
                      value={values?.point_flag}
                    >
                      <MenuItem value='0'>????????????</MenuItem>
                      <MenuItem value='1'>??????</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {values?.point_flag == 1 ?
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='????????? ?????????'
                        placeholder='????????? ???????????? ????????? ?????????.'
                        className='point_rate'
                        onChange={handleChangeValue('point_rate')}
                        defaultValue={values?.point_rate}
                        value={values?.point_rate}
                      />
                    </Grid>
                  </>
                  :
                  <>
                  </>}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      <Card style={{ marginTop: '24px' }}>
        <CardContent>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={onEditItem}>
            ??????
          </Button>
          <Button type='reset' variant='outlined' color='secondary' onClick={onReset}>
            ??????
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default ManagerMerchandiseEdit;
