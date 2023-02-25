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
import { useEditPageImg } from 'src/@core/utils/function'
import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'

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

const ManagerBrandEdit = (props) => {
  const { getItem, editItem } = props;

  const [tabValue, setTabValue] = useState('tab-1')
  const defaultObj = {
    name: '',
    dns: '',
    og_description: '',
    logo_img: undefined,
    favicon_img: undefined,
    passbook_img: undefined,
    contract_img: undefined,
    id_img: undefined,
    og_img: undefined,
    ceo_nm: '',
    addr: '',
    phone_num: '',
    fax_num: '',
    template_id: 0,
    theme_css: {
      main_color: '#7367f0'
    },
    company_nm: '',
    pvcy_rep_nm: '',
    business_num: '',
    stamp_flag: 0,
    point_flag: 0,
    stamp_max_size: '',
    stamp_save_count: '',
    coupon_model_id: '',
    point_rate: '',
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
      obj['theme_css'] = JSON.parse(obj['theme_css']);
      setValues({ ...obj });
    }
  }

  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onReset = () => {
    setValues(defaultObj)
  }
  const onEditItem = () => {
    let img_key_list = ['logo_img', 'favicon_img', 'passbook_img', 'contract_img', 'id_img', 'og_img'];
    let obj = { ...values, ['theme_css']: JSON.stringify(values['theme_css']) };
    for (var i = 0; i < img_key_list.length; i++) {
      if (obj[img_key_list[i]] && typeof obj[img_key_list[i]] == 'object') {
        obj[img_key_list[i]] = obj[img_key_list[i]][0];
      } else {
        delete obj[img_key_list[i]];
      }
    }
    editItem(obj);
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
          <Tab value='tab-3' label='계약정보' sx={{ mr: 2 }} />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='tab-1'>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>로고 이미지</InputLabel>
                      <FileUploaderSingle
                        className='logo_img'
                        setValues={setValues}
                        values={values}
                        value={values?.logo_img}
                        sx={{ maxWidth: '256px', width: '90%', height: 'auto' }}
                        placeholder={'max-width: 256px, 이상은 자동으로 리사이징 됩니다.'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>favicon 이미지</InputLabel>
                      <FileUploaderSingle
                        className='favicon_img'
                        setValues={setValues}
                        values={values}
                        value={values?.favicon_img}
                        sx={{ width: '120px', height: '120px' }}
                        placeholder={'32px * 32px'}

                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>메타태그 오픈그래프 이미지</InputLabel>
                      <FileUploaderSingle
                        className='og_img'
                        setValues={setValues}
                        values={values}
                        value={values?.og_img}
                        sx={{ maxWidth: '256px', width: '90%', height: 'auto' }}
                        placeholder={'1200px * 630px'}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        sx={{ width: '100%' }}
                        onChange={handleChangeValue('og_description')} defaultValue={values?.og_description} value={values?.og_description}
                        rows={4}
                        multiline
                        label='메타태그 오픈그래프 내용'
                        variant='standard'
                        id='textarea-standard-static'
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='브랜드명' placeholder='브랜드명을 입력해 주세요.' className='name' onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='DNS 명' placeholder='DNS 명을 입력해 주세요.' className='dns' onChange={handleChangeValue('dns')} defaultValue={values?.dns} value={values?.dns} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='대표자 명' placeholder='대표자 명을 입력해 주세요.' className='ceo_nm' onChange={handleChangeValue('ceo_nm')} defaultValue={values?.ceo_nm} value={values?.ceo_nm} />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField fullWidth label='법인 주소' placeholder='법인 주소를 입력해 주세요.' className='addr' onChange={handleChangeValue('addr')} defaultValue={values?.addr} value={values?.addr} />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField fullWidth label='휴대폰 번호' placeholder='휴대폰 번호를 입력해 주세요.' className='phone_num' onChange={handleChangeValue('phone_num')} defaultValue={values?.phone_num} value={values?.phone_num} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='팩스 번호' placeholder='팩스 번호를 입력해 주세요.' className='fax_num' onChange={handleChangeValue('fax_num')} defaultValue={values?.fax_num} value={values?.fax_num} />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField fullWidth label='법인 상호' placeholder='법인 상호를 입력해 주세요.' className='company_nm' onChange={handleChangeValue('company_nm')} defaultValue={values?.company_nm} value={values?.company_nm} />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField fullWidth label='개인정보 책임자명' placeholder='개인정보 책임자명을 입력해 주세요.' className='pvcy_rep_nm' onChange={handleChangeValue('pvcy_rep_nm')} defaultValue={values?.pvcy_rep_nm} value={values?.pvcy_rep_nm} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='사업자 번호' placeholder='사업자 번호를 입력해 주세요.' className='business_num' onChange={handleChangeValue('business_num')} defaultValue={values?.business_num} value={values?.business_num} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='메인색상' type={'color'} placeholder='메인색상을 입력해 주세요.' className='main_color' onChange={(e) => {
                        let obj = { ...values };
                        obj['theme_css'].main_color = e.target.value
                        setValues(obj);
                      }} defaultValue={values?.theme_css?.main_color} value={values?.theme_css?.main_color} />
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                    {values?.stamp_flag == 1 ?
                      <>
                        <Grid item xs={12}>
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

        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='tab-3'>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>계약서 이미지</InputLabel>
                      <FileUploaderSingle
                        className='contract_img'
                        setValues={setValues}
                        values={values}
                        value={values?.contract_img}
                        boxStyle={{ height: `${window.innerWidth >= 900 ? '195%' : ''}` }}
                        sx={{ maxWidth: '256px', width: '90%', height: 'auto' }}
                        placeholder={'max-width: 500px, 이상은 자동으로 리사이징 됩니다.'}

                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>통장 사본 이미지</InputLabel>
                      <FileUploaderSingle
                        className='passbook_img'
                        setValues={setValues}
                        values={values}
                        value={values?.passbook_img}
                        sx={{ maxWidth: '256px', width: '90%', height: 'auto' }}
                        placeholder={'max-width: 500px, 이상은 자동으로 리사이징 됩니다.'}

                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>신분증 사본 이미지</InputLabel>
                      <FileUploaderSingle
                        className='id_img'
                        setValues={setValues}
                        values={values}
                        value={values?.id_img}
                        sx={{ maxWidth: '256px', width: '90%', height: 'auto' }}
                        placeholder={'max-width: 500px, 이상은 자동으로 리사이징 됩니다.'}

                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>




        </TabPanel >
      </TabContext >
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
  )
}

export default ManagerBrandEdit;
