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

const ManagerPointEdit = (props) => {
  const { getItem, editItem } = props;

  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);

  const [values, setValues] = useState({
    mcht_id: 0,
    mac_addr: '',
    appr_status: 1,
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
      let user = await getLocalStorage('user_auth');
      user = JSON.parse(user);

      const response = await axiosIns().get(`/api/v1/manager/users?page=1&page_size=10000&level=10`);
      setMchtList(response?.data?.content);
      setValues({ ...values, 'mcht_id': response?.data?.content[0]?.id });
    } catch (err) {
      console.log(err);
    }

  }

  const getOneItem = async () => {
    let item = await getItem();
    if (item) {
      setValues(item);
    }
  }

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const onReset = () => {
    setValues({
      mcht_id: mchtList[0]?.id,
      mac_addr: '',
      appr_status: 1,
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
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>가맹점명</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='mcht_id'
                      onChange={handleChangeValue('mcht_id')}
                      defaultValue={values?.mcht_id ?? 0}
                      value={values?.mcht_id}
                    >
                      {mchtList && mchtList.map((item, idx) => {
                        return <MenuItem value={item?.id} key={idx}>{item?.mcht_name}</MenuItem>
                      })}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='맥주소' placeholder='맥주소를 입력해 주세요.' className='mac_addr' onChange={handleChangeValue('mac_addr')} defaultValue={values?.mac_addr} value={values?.mac_addr} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>사용여부</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='appr_status'
                      onChange={handleChangeValue('appr_status')}
                      defaultValue={values?.appr_status ?? 0}
                      value={values?.appr_status}
                    >
                      <MenuItem value={1}>{'사용'}</MenuItem>
                      <MenuItem value={0}>{'사용안함'}</MenuItem>

                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => editItem({ ...values })}>
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

export default ManagerPointEdit;
