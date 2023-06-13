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

import DialogAddress from 'src/views/components/dialogs/DialogAddress'

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
    group_id: 0,
    mcht_name: '',
    phone_num: '',
    addr: '',
    detail_addr: ' ',
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
      const response = await axiosIns().get(`/api/v1/manager/utils/users?user=1&mcht=1`);
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
  const [selectAddressOpen, setSelectAddressOpen] = useState(false);
  const onSelectAddressOpen = () => {
    setSelectAddressOpen(true);
  }
  const handletSelectAddressClose = () => setSelectAddressOpen(false);
  const onSelectAddress = (data) => {
    handletSelectAddressClose();
    setValues({ ...values, ['addr']: data?.address })
  }
  return (
    <>
      <DialogAddress
        open={selectAddressOpen}
        handleClose={handletSelectAddressClose}
        onKeepGoing={onSelectAddress}
        text={'주소 선택'}
        subText={'삭제하시면 복구할 수 없습니다.'}
        saveText={'삭제'}
        headIcon={<Icon icon='tabler:trash' style={{ fontSize: '40px' }} />}
      />
      <Grid container spacing={6}>
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>기본정보</InputLabel>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='가맹점 아이디' placeholder='가맹점 아이디를 입력해 주세요.' className='user_name' inputProps={{
                    readOnly: (editCategory == 'edit')
                  }} onChange={handleChangeValue('user_name')} defaultValue={values?.user_name} value={values?.user_name} />
                </Grid>
                {editCategory == 'create' ?
                  <>
                    <Grid item xs={12}>
                      <TextField fullWidth label='비밀번호' placeholder='비밀번호를 입력해 주세요.' type={'password'} autoComplete={'new-password'} className='user_pw' onChange={handleChangeValue('user_pw')} defaultValue={values?.user_pw} value={values?.user_pw} />
                    </Grid>
                  </>
                  :
                  <>
                  </>}
                <Grid item xs={12}>
                  <TextField fullWidth label='대표자명' placeholder='대표자명을 입력해 주세요.' className='nick_name' onChange={handleChangeValue('nick_name')} defaultValue={values?.nick_name} value={values?.nick_name} />
                </Grid>
                {/* {userData?.level >= 15 ?
                  <>
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
                  <TextField fullWidth label='가맹점 상호' placeholder='가맹점 상호를 입력해 주세요.' className='mcht_name' onChange={handleChangeValue('mcht_name')} defaultValue={values?.mcht_name} value={values?.mcht_name} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='가맹점 주소' placeholder='가맹점 주소를 입력해 주세요.' className='addr' onChange={handleChangeValue('addr')} inputProps={{
                    readOnly: true,
                  }} defaultValue={values?.addr} value={values?.addr}
                    onClick={onSelectAddressOpen}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='가맹점 상세주소' placeholder='가맹점 상세주소를 입력해 주세요.' className='detail_addr' onChange={handleChangeValue('detail_addr')} defaultValue={values?.detail_addr} value={values?.detail_addr} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='휴대폰번호' placeholder='휴대폰번호를 입력해 주세요.' className='phone_num' onChange={handleChangeValue('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num} type='number' />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>스탬프 사용여부</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='stamp_flag'
                      onChange={handleChangeValue('stamp_flag')}
                      defaultValue={values?.stamp_flag}
                      value={values?.stamp_flag}
                    >
                      <MenuItem value='0'>사용안함</MenuItem>
                      <MenuItem value='1'>사용</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {values?.stamp_flag == 1 ?
                  <>
                    <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>포인트 사용여부</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='point_flag'
                      onChange={handleChangeValue('point_flag')}
                      defaultValue={values?.point_flag}
                      value={values?.point_flag}
                    >
                      <MenuItem value='0'>사용안함</MenuItem>
                      <MenuItem value='1'>사용</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {values?.point_flag == 1 ?
                  <>
                    <Grid item xs={12}>
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
        </Grid>
      </Grid>
      <Card style={{ marginTop: '24px' }}>
        <CardContent>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={onEditItem}>
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
