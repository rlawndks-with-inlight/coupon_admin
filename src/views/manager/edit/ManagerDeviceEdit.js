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
import { LOCALSTORAGE } from 'src/data/data'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

const ManagerDeviceEdit = (props) => {
  const { getItem, editItem } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);

  const [values, setValues] = useState({
    mcht_id: mchtList[0]?.id ?? 0,
    partner_id: partnerList[0]?.id ?? 0,
    mac_addr: '',
    comment: '',
  })
  useEffect(() => {
    if (mchtList.length > 0) {
      setLoading(false);
    }
  }, [mchtList])
  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);
      let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
      user = JSON.parse(user);

      const response = await axiosIns().get(`/api/v1/manager/users/sub/users?user=1&mcht=1`);
      let partner_list = [...response?.data?.user_id?.partners];
      let mcht_list = [...response?.data?.mcht_id];
      for (var i = 0; i < mcht_list.length; i++) {
        mcht_list[i]['mcht_id'] = mcht_list[i]['id'];
      }
      setMchtList(response?.data?.mcht_id);
      setPartnerList(response?.data?.user_id?.partners);
      if (response?.data?.mcht_id.length <= 0) {
        toast.error("??????????????? ??????????????? ????????? ???????????? ??? ????????????.");
        router.back();
      }
      let item = await getItem();
      if (item) {
        setValues({ ...item });
      } else {
        setValues({ ...values, 'mcht_id': mcht_list[0]['mcht_id'], 'partner_id': partner_list[0]['id'] });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getOneItem = async () => {
    let item = await getItem();
    if (item) {
      let obj = {};
      for (var i = 0; i < Object.keys(values).length; i++) {
        let key = Object.keys(values)[i];
        obj[key] = item[key];
      }
      setValues({ ...obj });
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
      mcht_id: mchtList[0]?.id ?? 0,
      partner_id: partnerList[0]?.id ?? 0,
      mac_addr: '',
      comment: '',
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
                    <InputLabel id='form-layouts-tabs-select-label'>????????????</InputLabel>
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
                        return <MenuItem value={item?.mcht_id} key={idx}>{item?.user_name}</MenuItem>
                      })}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>????????????</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='partner_id'
                      onChange={handleChangeValue('partner_id')}
                      defaultValue={values?.partner_id ?? 0}
                      value={values?.partner_id}
                    >
                      {partnerList && partnerList.map((item, idx) => {
                        return <MenuItem value={item?.id} key={idx}>{item?.user_name}</MenuItem>
                      })}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label='?????????' placeholder='???????????? ????????? ?????????.' className='mac_addr' onChange={handleChangeValue('mac_addr')} defaultValue={values?.mac_addr} value={values?.mac_addr} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: '100%' }}
                    onChange={handleChangeValue('comment')} defaultValue={values?.comment} value={values?.comment}
                    rows={4}
                    multiline
                    label='??????'
                    variant='standard'
                    id='textarea-standard-static'
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>????????????</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='appr_status'
                      onChange={handleChangeValue('appr_status')}
                      defaultValue={values?.appr_status ?? 0}
                      value={values?.appr_status}
                    >
                      <MenuItem value={1}>{'??????'}</MenuItem>
                      <MenuItem value={0}>{'????????????'}</MenuItem>

                    </Select>
                  </FormControl>
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => editItem({ ...values })}>
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

export default ManagerDeviceEdit;
