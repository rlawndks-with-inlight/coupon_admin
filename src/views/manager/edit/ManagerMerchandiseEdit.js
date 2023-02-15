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
  const { getItem, editItem, popperPlacement } = props;

  const [tabValue, setTabValue] = useState('tab-1')
  const [bDt, setBDt] = useState(new Date())
  const [mchtList, setMchtList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [values, setValues] = useState({
    profile_img: undefined,
    user_name: '',
    user_pw: '',
    nick_name: '',
    birth_date: returnMoment(false, new Date()).substring(0, 10),
    group_id: '',
    mcht_name: '',
    addr: '',
    stamp_flag: 0,
    point_flag: 0,
    stamp_save_count: 0,
    point_rate: 0,
  })
  useEffect(() => {
    settingPage();
    getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      const response = await axiosIns().get(`/api/v1/manager/users/sub/users?user=1&mcht=0`);
      console.log(response)
      let user_list = [...response?.data?.user_id?.agencys, ...response?.data?.user_id?.branchs, ...response?.data?.user_id?.dists];
      for (var i = 0; i < user_list.length; i++) {
        user_list[i]['group_id'] = user_list[i]['id'];
      }
      setUserList(user_list);
      setValues({ ...values, 'group_id': user_list[0]?.group_id });
    } catch (err) {
      console.log(err);
    }
  }

  const getOneItem = async () => {
    let item = await getItem();
    if (item) {
      setBDt(new Date(item?.birth_date));
      console.log(item)
      let obj = {};
      for (var i = 0; i < Object.keys(values).length; i++) {
        let key = Object.keys(values)[i];
        obj[key] = item[key];
      }
      setValues({ ...obj });
    } else {
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      setValues({ ...values, ['point_flag']: dns_data?.point_flag, ['point_rate']: dns_data?.point_rate, ['stamp_flag']: dns_data?.stamp_flag, ['stamp_save_count']: dns_data?.stamp_save_count });
    }
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
    setValues({
      profile_img: undefined,
      user_name: '',
      user_pw: '',
      nick_name: '',
      birth_date: returnMoment(false, new Date()).substring(0, 10),
      group_id: '',
      mcht_name: '',
      addr: '',
      stamp_flag: 0,
      point_flag: 0,
      stamp_save_count: 0,
      point_rate: 0,
    })
  }

  return (
    <>

      <TabContext value={tabValue}>
        <TabList
          variant='scrollable'
          scrollButtons={false}
          onChange={handleTabsChange}
          sx={{ mb: 4 }}
        >
          <Tab value='tab-1' label='기본정보' sx={{ mr: 2 }} />
          <Tab value='tab-2' label='적립설정' sx={{ mr: 2 }} />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='tab-1'>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>프로필 이미지</InputLabel>
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
                            console.log(date)
                            handleChange('birth_date', returnMoment(false, date).substring(0, 10));
                          } catch (err) {
                            console.log(err);
                          }

                        }}
                        customInput={<CustomInput label='유저 생년월일' />}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='유저아이디' placeholder='유저아이디를 입력해 주세요.' className='user_name' onChange={handleChangeValue('user_name')} defaultValue={values?.user_name} value={values?.user_name} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='유저 패스워드' placeholder='유저 패스워드를 입력해 주세요.' type={'password'} autoComplete={'new-password'} className='user_pw' onChange={handleChangeValue('user_pw')} defaultValue={values?.user_pw} value={values?.user_pw} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='유저명' placeholder='유저명을 입력해 주세요.' className='nick_name' onChange={handleChangeValue('nick_name')} defaultValue={values?.nick_name} value={values?.nick_name} />
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-tabs-select-label'>그룹 ID</InputLabel>
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
                            return <MenuItem value={item?.group_id} key={idx}>{item?.user_name}</MenuItem>
                          })}

                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='가맹점 상호' placeholder='가맹점 상호를 입력해 주세요.' className='mcht_name' onChange={handleChangeValue('mcht_name')} defaultValue={values?.mcht_name} value={values?.mcht_name} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='가맹점 주소' placeholder='가맹점 주소를 입력해 주세요.' className='addr' onChange={handleChangeValue('addr')} defaultValue={values?.addr} value={values?.addr} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='tab-2'>
          <Card>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>스탬프 사용여부</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='stamp_flag'
                      onChange={handleChangeValue('stamp_flag')}
                      defaultValue={values?.stamp_flag ?? 0}
                      value={values?.stamp_flag}
                    >
                      <MenuItem value='0'>사용안함</MenuItem>
                      <MenuItem value='1'>사용</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>포인트 사용여부</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='point_flag'
                      onChange={handleChangeValue('point_flag')}
                      defaultValue={values?.point_flag ?? 0}
                      value={values?.point_flag}
                    >
                      <MenuItem value='0'>사용안함</MenuItem>
                      <MenuItem value='1'>사용</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {values?.stamp_flag == 1 ?
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='상품당 스탬프 저장개수'
                        placeholder='상품당 스탬프 저장개수를 입력해 주세요.'
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
                {values?.point_flag == 1 ?
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='포인트 변환률'
                        placeholder='포인트 변환률을 입력해 주세요.'
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
        </TabPanel>

      </TabContext>
      <Card style={{ marginTop: '24px' }}>
        <CardContent>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => {
            console.log(values)
            editItem({ ...values, profile_img: useEditPageImg(values?.profile_img) })
          }}>
            저장
          </Button>
          <Button type='reset' variant='outlined' color='secondary' onClick={onReset}>
            리셋
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default ManagerMerchandiseEdit;
