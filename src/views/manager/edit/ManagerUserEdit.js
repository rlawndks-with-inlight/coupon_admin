import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import { useEffect, useState } from 'react'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import Icon from 'src/@core/components/icon'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { LOCALSTORAGE } from 'src/data/data'
import { useRouter } from 'next/router'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Autocomplete } from '@mui/material'


const ManagerUserEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory } = props;
  const { settings } = useSettings();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-0')
  const [userLevelList, setUserLevelList] = useState([]);
  const [bDt, setBDt] = useState(new Date());
  const [userData, setUserData] = useState();
  const [mchtList, setMchtList] = useState([]);

  const defaultObj = {
    profile_img: undefined,
    phone_num: '',
    user_pw: '',
    nick_name: '',
  }
  const [values, setValues] = useState(defaultObj)

  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

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
      setMchtList(settings?.mchts ?? []);
      let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
      user = JSON.parse(user);

      let item = await getItem();
      if (item) {
        setValues({ ...item });
      } else {
        setValues({ ...values });
      }
      setLoading(false);

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

  const onReset = () => {
    setBDt(new Date());
    setValues(defaultObj);
  }
  const onEditItem = () => {
    try {
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
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>기본정보</InputLabel>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <Autocomplete
                        id="mcht_id"
                        defaultValue={_.find(mchtList, { id: values?.mcht_id })?.mcht_name ?? ""}
                        onChange={(e, value) => {
                          let item = _.find(mchtList, { mcht_name: value });
                          setValues({ ...values, mcht_id: item?.id });
                        }}
                        options={mchtList && mchtList.map((option) => option.mcht_name)}
                        renderInput={(params) => <TextField {...params} label="가맹점상호" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label='유저휴대폰번호'
                        placeholder='유저휴대폰번호를 입력해 주세요.'
                        disabled={editCategory == 'edit'}
                        onChange={handleChangeValue('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num}
                        type='number'
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
                            label='비밀번호'
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
                        label='유저명'
                        placeholder='유저명를 입력해 주세요.'
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

export default ManagerUserEdit;
