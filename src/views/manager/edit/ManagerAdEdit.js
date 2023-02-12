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

const ManagerAdEdit = (props) => {
  const { getItem, editItem } = props;

  const [values, setValues] = useState({
    ad_name: '',
    ad_img: undefined,
    ad_type: 0,
  })
  useEffect(() => {
    getOneItem();
  }, [])

  const getOneItem = async () => {
    let item = await getItem();
    if (item) {
      setValues(item);
    }
  }


  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onReset = () => {
    setValues({
      ad_name: '',
      ad_img: undefined,
      ad_type: 0,
    })
  }

  return (
    <>
      <Card>


        <CardContent>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <InputLabel id='form-layouts-tabs-select-label'>광고 이미지</InputLabel>
              <CardSnippet
                title='Upload Single Files'
                code={{
                  tsx: null,
                  jsx: source.FileUploaderSingleJSXCode
                }}
              >
                <FileUploaderSingle
                  className='ad_img'
                  setValues={setValues}
                  values={values}
                  value={values?.ad_img}
                />
              </CardSnippet>
            </Grid>
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
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card style={{ marginTop: '24px' }}>
        <CardContent>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => editItem({ ...values, ad_img: (values?.ad_img[0] ?? undefined) })}>
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
