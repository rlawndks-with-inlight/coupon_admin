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
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useState } from 'react'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import MuiTabList from '@mui/lab/TabList'
import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'
import { useSettings } from 'src/@core/hooks/useSettings'
import { getLocalStorage, setLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE, zRedirectType } from 'src/data/data'

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
  const { getItem, editItem, userData } = props;
  const theme = useTheme();
  const { settings, saveSettings } = useSettings();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-1')
  const defaultObj = {
    name: '',
    dns: '',
    og_description: '',
    note: '',
    logo_img: undefined,
    dark_logo_img: undefined,
    favicon_img: undefined,
    passbook_img: undefined,
    contract_img: undefined,
    id_img: undefined,
    og_img: undefined,
    bsin_lic_img: undefined,
    map_marker_img: undefined,
    ceo_nm: '',
    addr: '',
    phone_num: '',
    fax_num: '',
    mbr_type: 0,
    redirect_type: 0,
    guide_type: 0,
    theme_css: {
      main_color: '#7367f0',
    },
    options: {
      app: {
        is_use_coupon: 0,//쿠폰 탭  사용할지
        is_use_gift: 0,//선물하기 탭 사용할지
        is_use_order: 0,//주문 탭 사용할지
        dark_background_color: '#000000',//다크모드 배경색
        dark_box_color: '#222224',// 다크모드 컨텐츠 색
        dark_font_color: '#ffffff',// 다크모드 폰트 색
      },
      shop: {
        demo_num: 1, //쇼핑몰 데모숫자,
        dark_background_color: '#000000',//다크모드 배경색
        dark_box_color: '#222224',// 다크모드 컨텐츠 색
        dark_font_color: '#ffffff',// 다크모드 폰트 색
      },
      bonaeja: {
        api_key: "",
        user_id: "",
        sender_phone: "",
        receive_phone: "",
        min_balance_limit: 5
      }
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
    point_min_amount: '',
  }
  const [values, setValues] = useState(defaultObj)
  useEffect(() => {
    getOneItem();
  }, [])
  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData, values])
  const getOneItem = async () => {
    setLoading(true);
    let item = await getItem();
    if (item) {
      let obj = {};
      for (var i = 0; i < Object.keys(values).length; i++) {
        let key = Object.keys(values)[i];
        obj[key] = item[key];
      }
      if (!obj['theme_css']) {
        obj['theme_css'] = "{}";
      }
      obj['theme_css'] = JSON.parse(obj['theme_css']);
      obj['theme_css'] = Object.assign(defaultObj.theme_css, obj['theme_css']);
      if (!obj['options']) {
        obj['options'] = "{}";
      }
      obj['options'] = JSON.parse(obj['options']);
      obj['options'] = Object.assign(defaultObj.options, obj['options']);
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
  const onEditItem = async () => {
    let img_key_list = ['logo_img', 'dark_logo_img', 'favicon_img', 'passbook_img', 'contract_img', 'id_img', 'og_img', 'bsin_lic_img', 'map_marker_img'];
    let obj = { ...values, ['theme_css']: JSON.stringify(values['theme_css'] ?? {}), ['options']: JSON.stringify(values['options'] ?? {}) };
    for (var i = 0; i < img_key_list.length; i++) {
      if (obj[img_key_list[i]] && typeof obj[img_key_list[i]] == 'object') {
        obj[img_key_list[i]] = obj[img_key_list[i]][0];
      } else {
        delete obj[img_key_list[i]];
      }
    }
    let local_dns_data = settings.dnsData;
    local_dns_data['theme_css'] = values['theme_css'];
    local_dns_data['options'] = values['options'];
    local_dns_data['redirect_type'] = values['redirect_type'];
    editItem(obj);
  }
  return (
    <>
      {loading ?
        <>
        </>
        :
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
              <Tab value='tab-5' label='어플정보' sx={{ mr: 2 }} />
              <Tab value='tab-7' label='쇼핑몰정보' sx={{ mr: 2 }} />
              <Tab value='tab-8' label='문자정보' sx={{ mr: 2 }} />
            </TabList>
            <TabPanel sx={{ p: 0 }} value='tab-1'>
              <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                  <Card style={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>로고 이미지</InputLabel>
                          <FileUploaderSingle
                            className='logo_img'
                            setValues={setValues}
                            values={values}
                            value={values?.logo_img}
                            sx={{ width: 'auto', height: '60%' }}
                            placeholder={'max-width: 512px, 이상은 자동으로 리사이징 됩니다.'}
                            boxStyle={{ minHeight: '180px' }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>다크모드 로고 이미지</InputLabel>
                          <FileUploaderSingle
                            className='dark_logo_img'
                            setValues={setValues}
                            values={values}
                            value={values?.dark_logo_img}
                            sx={{ width: 'auto', height: '60%' }}
                            placeholder={'max-width: 512px, 이상은 자동으로 리사이징 됩니다.'}
                            boxStyle={{ minHeight: '180px' }}
                          />
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>favicon 이미지</InputLabel>
                          <FileUploaderSingle
                            className='favicon_img'
                            setValues={setValues}
                            values={values}
                            value={values?.favicon_img}
                            sx={{ width: '32px', height: '32px' }}
                            boxStyle={{ minHeight: '50px', height: '84px', width: '84px' }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>메타태그 오픈그래프 이미지</InputLabel>
                          <FileUploaderSingle
                            className='og_img'
                            setValues={setValues}
                            values={values}
                            value={values?.og_img}
                            sx={{ maxWidth: '312px', width: '90%', height: 'auto' }}
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
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>법인정보</InputLabel>
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
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>

                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>운영정보</InputLabel>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-tabs-select-label'>멤버쉽 적용 타입</InputLabel>
                            <Select
                              label='멤버쉽 적용 타입'
                              id='form-layouts-tabs-select'
                              labelId='form-layouts-tabs-select-label'
                              className='mbr_type'
                              onChange={handleChangeValue('mbr_type')}
                              defaultValue={values?.mbr_type ?? 0}
                              value={values?.mbr_type}
                            >
                              <MenuItem value='0'>유입된 가맹점에서만 사용</MenuItem>
                              <MenuItem value='1'>모든 가맹점에서 사용</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-tabs-select-label'>기본 uri 이동 경로</InputLabel>
                            <Select
                              label='기본 uri 이동 경로'
                              id='form-layouts-tabs-select'
                              labelId='form-layouts-tabs-select-label'
                              className='redirect_type'
                              onChange={handleChangeValue('redirect_type')}
                              defaultValue={values?.redirect_type ?? 0}
                              value={values?.redirect_type}
                            >
                              {zRedirectType.map((item, idx) => {
                                return <MenuItem value={item.val}>{item.name}</MenuItem>
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-tabs-select-label'>안내 타입</InputLabel>
                            <Select
                              label='안내 타입'
                              id='form-layouts-tabs-select'
                              labelId='form-layouts-tabs-select-label'
                              className='guide_type'
                              onChange={handleChangeValue('guide_type')}
                              defaultValue={values?.guide_type ?? 0}
                              value={values?.guide_type}
                            >
                              <MenuItem value='0'>친화적</MenuItem>
                              <MenuItem value='1'>일반형</MenuItem>
                            </Select>
                          </FormControl>
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
                            <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>스탬프 사용여부</InputLabel>
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
                            <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>포인트 사용여부</InputLabel>
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
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label='포인트 최소사용금액'
                                placeholder='포인트 최소사용금액을 입력해 주세요.'
                                className='point_min_amount'
                                onChange={handleChangeValue('point_min_amount')}
                                defaultValue={values?.point_min_amount}
                                value={values?.point_min_amount}
                              />
                            </Grid>
                          </>
                          :
                          <>
                          </>}
                        <Grid item xs={12}>
                          <TextField
                            sx={{ width: '100%' }}
                            onChange={handleChangeValue('note')} defaultValue={values?.note} value={values?.note}
                            rows={4}
                            multiline
                            label='비고'
                            variant='standard'
                            id='textarea-standard-static'
                          />
                        </Grid>
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
                            sx={{ maxWidth: '256px', width: '90%', height: 'auto' }}
                            placeholder={'max-width: 500px, 이상은 자동으로 리사이징 됩니다.'}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>사업자등록증 이미지</InputLabel>
                          <FileUploaderSingle
                            className='bsin_lic_img'
                            setValues={setValues}
                            values={values}
                            value={values?.bsin_lic_img}
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
            <TabPanel sx={{ p: 0 }} value='tab-5'>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>지도 마커 이미지</InputLabel>
                          <FileUploaderSingle
                            className='map_marker_img'
                            setValues={setValues}
                            values={values}
                            value={values?.map_marker_img}
                            sx={{ width: '40px', height: '60px' }}
                            boxStyle={{ minHeight: '50px', height: '104px', width: '104px' }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <iframe className='none-show-scroll' src={`${window.location.origin}/app/home?dark_background_color=${(values?.options?.app.dark_background_color ?? "").replace('#', '%23')}&dark_box_color=${(values?.options?.app.dark_box_color ?? "").replace('#', '%23')}&dark_font_color=${(values?.options?.app?.dark_font_color ?? "").replace('#', '%23')}`} style={{ border: 'none', height: '500px' }} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        {userData?.level >= 50 ?
                          <>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>쿠폰탭 사용여부</InputLabel>
                                <Select
                                  label='쿠폰탭 사용여부'
                                  id='form-layouts-tabs-select'
                                  labelId='form-layouts-tabs-select-label'
                                  className='is_use_coupon'
                                  onChange={(e) => {
                                    let obj = { ...values };
                                    obj['options']['app'].is_use_coupon = e.target.value
                                    setValues(obj);
                                  }}
                                  defaultValue={values?.options?.app?.is_use_coupon ?? 0}
                                  value={values?.options?.app?.is_use_coupon}
                                >
                                  <MenuItem value='0'>사용안함</MenuItem>
                                  <MenuItem value='1'>사용</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>주문탭 사용여부</InputLabel>
                                <Select
                                  label='주문탭 사용여부'
                                  id='form-layouts-tabs-select'
                                  labelId='form-layouts-tabs-select-label'
                                  className='is_use_order'
                                  onChange={(e) => {
                                    let obj = { ...values };
                                    obj['options']['app'].is_use_order = e.target.value
                                    setValues(obj);
                                  }}
                                  defaultValue={values?.options?.app?.is_use_order ?? 0}
                                  value={values?.options?.app?.is_use_order}
                                >
                                  <MenuItem value='0'>사용안함</MenuItem>
                                  <MenuItem value='1'>사용</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>선물탭 사용여부</InputLabel>
                                <Select
                                  label='선물탭 사용여부'
                                  id='form-layouts-tabs-select'
                                  labelId='form-layouts-tabs-select-label'
                                  className='is_use_gift'
                                  onChange={(e) => {
                                    let obj = { ...values };
                                    obj['options']['app'].is_use_gift = e.target.value
                                    setValues(obj);
                                  }}
                                  defaultValue={values?.options?.app?.is_use_gift ?? 0}
                                  value={values?.options?.app?.is_use_gift}
                                >
                                  <MenuItem value='0'>사용안함</MenuItem>
                                  <MenuItem value='1'>사용</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </>
                          :
                          <>
                          </>}
                        <Grid item xs={12}>
                          <TextField fullWidth label='다크모드 배경색' type={'color'} placeholder='다크모드 배경색을 입력해 주세요.' className='dark_background_color' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['app'].dark_background_color = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.app.dark_background_color}
                            value={values?.options?.app.dark_background_color} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='다크모드 컨텐츠 배경색' type={'color'} placeholder='다크모드 컨텐츠 배경색을 입력해 주세요.' className='dark_box_color' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['app'].dark_box_color = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.app.dark_box_color}
                            value={values?.options?.app.dark_box_color} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='다크모드 폰트색' type={'color'} placeholder='다크모드 폰트색을 입력해 주세요.' className='dark_font_color' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['app'].dark_font_color = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.app?.dark_font_color}
                            value={values?.options?.app?.dark_font_color} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='tab-7'>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-tabs-select-label' sx={{ background: `${theme.palette.mode == 'dark' ? '#2f3349f2' : '#fff'}`, pr: '4px' }}>쇼핑몰데모버전</InputLabel>
                            <Select
                              label='쇼핑몰데모'
                              id='form-layouts-tabs-select'
                              labelId='form-layouts-tabs-select-label'
                              className='is_use_gift'
                              onChange={(e) => {
                                let obj = { ...values };
                                obj['options']['shop'].demo_num = e.target.value
                                setValues(obj);
                              }}
                              defaultValue={values?.options?.shop?.demo_num}
                              value={values?.options?.shop?.demo_num}
                            >
                              <MenuItem value='1'>데모1</MenuItem>
                              <MenuItem value='2'>데모2</MenuItem>
                              <MenuItem value='3'>데모3</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <TextField fullWidth label='다크모드 배경색' type={'color'} placeholder='다크모드 배경색을 입력해 주세요.' className='dark_background_color' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['shop'].dark_background_color = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.shop.dark_background_color}
                            value={values?.options?.shop.dark_background_color} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='다크모드 컨텐츠 배경색' type={'color'} placeholder='다크모드 컨텐츠 배경색을 입력해 주세요.' className='dark_box_color' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['shop'].dark_box_color = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.shop.dark_box_color}
                            value={values?.options?.shop.dark_box_color} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='다크모드 폰트색' type={'color'} placeholder='다크모드 폰트색을 입력해 주세요.' className='dark_font_color' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['shop'].dark_font_color = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.shop?.dark_font_color}
                            value={values?.options?.shop?.dark_font_color} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='tab-8'>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <TextField fullWidth label='API KEY' placeholder='' className='api_key' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['bonaeja'].api_key = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.bonaeja?.api_key}
                            value={values?.options?.bonaeja?.api_key} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='USER ID' placeholder='' className='user_id' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['bonaeja'].user_id = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.bonaeja?.user_id}
                            value={values?.options?.bonaeja?.user_id} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>

                        <Grid item xs={12}>
                          <TextField fullWidth label='발송번호' placeholder='' className='sender_phone' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['bonaeja'].sender_phone = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.bonaeja?.sender_phone}
                            value={values?.options?.bonaeja?.sender_phone} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='수신번호' placeholder='' className='receive_phone' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['bonaeja'].receive_phone = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.bonaeja?.receive_phone}
                            value={values?.options?.bonaeja?.receive_phone} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='최소잔액알림한도' type='number' placeholder='' className='min_balance_limit' onChange={(e) => {
                            let obj = { ...values };
                            obj['options']['bonaeja'].min_balance_limit = e.target.value
                            setValues(obj);
                          }}
                            defaultValue={values?.options?.bonaeja?.min_balance_limit}
                            value={values?.options?.bonaeja?.min_balance_limit} />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
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
        </>}

    </>
  )
}

export default ManagerBrandEdit;
