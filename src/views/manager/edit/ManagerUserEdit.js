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
import { returnMoment } from 'src/@core/utils/function'

const ManagerUserEdit = (props) => {
  const { getItem, editItem, popperPlacement } = props;

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-0')
  const [userLevelList, setUserLevelList] = useState([]);
  const [bDt, setBDt] = useState(new Date())

  const [values, setValues] = useState({
    user_name: '',
    user_pw: '',
    nick_name: '',
    birth_date: returnMoment(false, new Date()).substring(0, 10),
  })
  useEffect(() => {
    if (userLevelList.length > 0) {
      setLoading(false);
    }
  }, [userLevelList])
  useEffect(() => {
    // settingPage();
    getOneItem();
  }, [])

  // const settingPage = async () => {
  //   setLoading(true);
  //   let user = await getLocalStorage('user_auth');
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

  const getOneItem = async () => {
    let item = await getItem();
    console.log(item)
    if (item) {
      setValues(item);
    }
  }


  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const onReset = () => {
    setBDt(new Date());
    setValues({
      user_name: '',
      user_pw: '',
      nick_name: '',
      birth_date: returnMoment(false, new Date()).substring(0, 10),
    })
  }

  return (
    <>
      {loading ?
        <>
        </>
        :
        <>
          <Card>
            <CardHeader title='기본정보' />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='유저아이디'
                    placeholder='유저아이디를 입력해 주세요.'
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
                    customInput={<CustomInput label='유저 생년월일' />}
                  />
                </Grid>

              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'
                onClick={() => {
                  editItem({ ...values })
                }}>
                저장
              </Button>
              <Button type='reset' size='large' variant='outlined' color='secondary' onClick={onReset}>
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
