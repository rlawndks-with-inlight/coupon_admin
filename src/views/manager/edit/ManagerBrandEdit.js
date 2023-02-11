import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
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

const ManagerBrandEdit = (props) => {
  const { getItem, editItem } = props;

  const [tabValue, setTabValue] = useState('tab-0')

  const [values, setValues] = useState({
    name: '',
    dns: '',
    logo_img: undefined,
    favicon_img: undefined,
    ceo_nm: '',
    addr: '',
    phone_num: '',
    fax_num: '',
    template_id: '',
    theme_css: '{}',
    company_nm: '',
    pvcy_rep_nm: '',
    business_num: '',
    stamp_flag: 0,
    point_flag: 0,
    stamp_max_size: '',
    stamp_save_count: '',
    coupon_model_id: '',
    point_rate: '',
  })
  useEffect(() => {
    getOneItem();
  }, [])

  const getOneItem = async () => {
    let item = await getItem();
    console.log(item)
    if (item) {
      setValues(item);
    }
  }

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onReset = () => {
    setValues({
      name: '',
      dns: '',
      logo_img: undefined,
      favicon_img: undefined,
      ceo_nm: '',
      addr: '',
      phone_num: '',
      fax_num: '',
      template_id: '',
      theme_css: '',
      company_nm: '',
      pvcy_rep_nm: '',
      business_num: '',
      stamp_flag: 0,
      point_flag: 0,
      stamp_max_size: '',
      stamp_save_count: '',
      coupon_model_id: '',
      point_rate: '',
    })
  }

  return (
    <>
      <Card>
        <TabContext value={tabValue}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, '& .MuiTab-root': { py: 3.5 } }}
          >
            <Tab value='tab-0' label='이미지' />
            <Tab value='tab-1' label='기본정보' />
            <Tab value='tab-2' label='적립설정' />
          </TabList>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='tab-0'>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel id='form-layouts-tabs-select-label'>로고 이미지</InputLabel>
                  <CardSnippet
                    title='Upload Single Files'
                    code={{
                      tsx: null,
                      jsx: source.FileUploaderSingleJSXCode
                    }}
                  >
                    <FileUploaderSingle
                      className='logo_img'
                      setValues={setValues}
                      values={values}
                      value={values?.logo_img}
                    />
                  </CardSnippet>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='form-layouts-tabs-select-label'>favicon 이미지</InputLabel>
                  <CardSnippet
                    title='Upload Single Files'
                    code={{
                      tsx: null,
                      jsx: source.FileUploaderSingleJSXCode
                    }}
                  >
                    <FileUploaderSingle
                      className='favicon_img'
                      setValues={setValues}
                      values={values}
                      value={values?.favicon_img}
                    />
                  </CardSnippet>
                </Grid>
              </Grid>

            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='tab-1'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='브랜드명' placeholder='브랜드명을 입력해 주세요.' className='name' onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='DNS 명' placeholder='DNS 명을 입력해 주세요.' className='dns' onChange={handleChangeValue('dns')} defaultValue={values?.dns} value={values?.dns} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='대표자 명' placeholder='대표자 명을 입력해 주세요.' className='ceo_nm' onChange={handleChangeValue('ceo_nm')} defaultValue={values?.ceo_nm} value={values?.ceo_nm} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='법인 주소' placeholder='법인 주소를 입력해 주세요.' className='addr' onChange={handleChangeValue('addr')} defaultValue={values?.addr} value={values?.addr} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='휴대폰 번호' placeholder='휴대폰 번호를 입력해 주세요.' className='phone_num' onChange={handleChangeValue('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='팩스 번호' placeholder='팩스 번호를 입력해 주세요.' className='fax_num' onChange={handleChangeValue('fax_num')} defaultValue={values?.fax_num} value={values?.fax_num} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='법인 상호' placeholder='법인 상호를 입력해 주세요.' className='company_nm' onChange={handleChangeValue('company_nm')} defaultValue={values?.company_nm} value={values?.company_nm} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='개인정보 책임자명' placeholder='개인정보 책임자명을 입력해 주세요.' className='pvcy_rep_nm' onChange={handleChangeValue('pvcy_rep_nm')} defaultValue={values?.pvcy_rep_nm} value={values?.pvcy_rep_nm} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='사업자 번호' placeholder='사업자 번호를 입력해 주세요.' className='business_num' onChange={handleChangeValue('business_num')} defaultValue={values?.business_num} value={values?.business_num} />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='tab-2'>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-tabs-select-label'>템플릿 ID</InputLabel>
                    <Select
                      label='Country'
                      id='form-layouts-tabs-select'
                      labelId='form-layouts-tabs-select-label'
                      className='template_id'
                      onChange={handleChangeValue('template_id')}
                      defaultValue={values?.template_id ?? 0}
                      value={values?.template_id}
                    >
                      <MenuItem value='0'>0</MenuItem>
                      <MenuItem value='1'>1</MenuItem>
                      <MenuItem value='2'>2</MenuItem>
                      <MenuItem value='3'>3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
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
                        label='스탬프 쿠폰변환 최소개수'
                        placeholder='스탬프 쿠폰변환 최소개수를 입력해 주세요.'
                        className='stamp_max_size'
                        onChange={handleChangeValue('stamp_max_size')}
                        defaultValue={values?.stamp_max_size}
                        value={values?.stamp_max_size}
                      />
                    </Grid>
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
            </TabPanel>
          </CardContent>
        </TabContext>
      </Card>
      <Card style={{ marginTop: '24px' }}>
        <CardContent>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => editItem({ ...values, logo_img: (values?.logo_img[0] ?? undefined), favicon_img: (values?.favicon_img[0] ? values?.favicon_img[0] : undefined) })}>
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

export default ManagerBrandEdit;
