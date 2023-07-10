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
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { axiosIns } from 'src/@fake-db/backend'
import { LOCALSTORAGE } from 'src/data/data'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import _ from 'lodash'
import { Autocomplete } from '@mui/material'

const ManagerDeviceEdit = (props) => {
  const { getItem, editItem } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [mchtList, setMchtList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);

  const [values, setValues] = useState({
    mcht_id: mchtList[0]?.id ?? 0,
    partner_id: partnerList[0]?.id ?? null,
    mac_addr: '',
    comment: ' ',
    device_type: 0,
    pos_code: ''
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

      const response = await axiosIns().get(`/api/v1/manager/utils/users?mcht=1&partner=1`);
      if (response?.data?.partner_id.length <= 0) {
        toast.error("협력사를 등록하셔야 장비를 추가하실 수 있습니다.");
        router.back();
        return;
      }
      let partner_list = [...response?.data?.partner_id];
      let mcht_list = _.sortBy(response?.data?.mcht_id, 'user_name');
      for (var i = 0; i < mcht_list.length; i++) {
        mcht_list[i]['mcht_id'] = mcht_list[i]['id'];
      }
      setPartnerList(partner_list);
      if (response?.data?.mcht_id.length <= 0) {
        toast.error("가맹점부터 등록하셔야 장비를 추가하실 수 있습니다.");
        router.back();
        return;
      }
      let item = await getItem();
      if (item) {
        setValues({ ...item });
      } else {
        setValues({ ...values, 'mcht_id': mcht_list[0]['mcht_id'], 'partner_id': partner_list[0]['id'] });
      }
      setMchtList(_.sortBy(response?.data?.mcht_id, 'user_name'));
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
                {/* <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>가맹점상호</InputLabel>
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
                </Grid> */}
                <Grid item xs={12}>
                  <Autocomplete
                    id="mcht_id"
                    defaultValue={_.find(mchtList, { mcht_id: values?.mcht_id })?.user_name}
                    onChange={(e, value) => {
                      let item = _.find(mchtList, { user_name: value });
                      setValues({ ...values, mcht_id: item?.id });
                    }}
                    options={mchtList && mchtList.map((option) => option.user_name)}
                    renderInput={(params) => <TextField {...params} label="가맹점상호" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>협력사명</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='partner_id'
                      onChange={handleChangeValue('partner_id')}
                      defaultValue={values?.partner_id ?? 0}
                      value={values?.partner_id}
                    >
                      {partnerList.length == 0 &&
                        <>
                          <MenuItem value={null}>미존재</MenuItem>
                        </>}
                      {partnerList && partnerList.map((item, idx) => {
                        return <MenuItem value={item?.id} key={idx}>{item?.user_name}</MenuItem>
                      })}

                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>장비타입</InputLabel>
                    <Select
                      label='장비타입'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='device_type'
                      onChange={handleChangeValue('device_type')}
                      defaultValue={values?.device_type ?? 0}
                      value={values?.device_type}
                    >
                      <MenuItem value={0}>{'키오스크'}</MenuItem>
                      <MenuItem value={1}>{'POS'}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {values?.device_type == 0 &&
                  <>
                    <Grid item xs={12}>
                      <TextField fullWidth label='맥주소' placeholder='맥주소를 입력해 주세요.' className='mac_addr' onChange={handleChangeValue('mac_addr')} defaultValue={values?.mac_addr} value={values?.mac_addr} />
                    </Grid>
                  </>}

                {values?.device_type == 1 &&
                  <>
                    <Grid item xs={12}>
                      <TextField fullWidth label='POS코드' placeholder='pos코드를 입력해 주세요.' className='pos_code' onChange={handleChangeValue('pos_code')} defaultValue={values?.pos_code} value={values?.pos_code} />
                    </Grid>
                  </>}

                <Grid item xs={12}>
                  <TextField
                    sx={{ width: '100%' }}
                    onChange={handleChangeValue('comment')} defaultValue={values?.comment} value={values?.comment}
                    rows={4}
                    multiline
                    label='비고'
                    variant='standard'
                    id='textarea-standard-static'
                  />
                </Grid>
                {/* <Grid item xs={12}>
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
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '24px' }}>
            <CardContent>
              <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => {
                editItem({ ...values })
              }}>
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

export default ManagerDeviceEdit;
