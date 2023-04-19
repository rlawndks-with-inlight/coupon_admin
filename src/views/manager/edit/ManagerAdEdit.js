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
import { useEditPageImg } from 'src/@core/utils/function'

const ManagerAdEdit = (props) => {
  const { getItem, editItem } = props;
  const defaultObj = {
    ad_name: '',
    ad_img: undefined,
    ad_type: 0,
  }
  const [values, setValues] = useState(defaultObj)
  useEffect(() => {
    getOneItem();
  }, [])

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


  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onReset = () => {
    setValues(defaultObj)
  }
  const onEditItem = () => {
    let img_key_list = ['ad_img'];
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
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Grid item xs={12}>
                <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>광고 이미지</InputLabel>
                <FileUploaderSingle
                  className='ad_img'
                  setValues={setValues}
                  values={values}
                  value={values?.ad_img}
                  placeholder={'max-width:1024px 이상은 리사이징 됩니다.'}
                  sx={{ height: '90%', width: 'auto' }}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField fullWidth label='광고명' placeholder='광고명을 입력해 주세요.' className='ad_name' onChange={handleChangeValue('ad_name')} defaultValue={values?.ad_name} value={values?.ad_name} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>광고타입</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='ad_type'
                      onChange={handleChangeValue('ad_type')}
                      defaultValue={values?.ad_type ?? 0}
                      value={values?.ad_type}
                    >
                      <MenuItem value={0}>사용안함</MenuItem>
                      <MenuItem value={1}>메인광고</MenuItem>
                      <MenuItem value={2}>슬라이드광고</MenuItem>
                      <MenuItem value={3}>쇼핑몰 슬라이드광고</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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

export default ManagerAdEdit;
