import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
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
import { useEffect, useMemo, useState } from 'react'
import CardSnippet from 'src/@core/components/card-snippet'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'
import Icon from 'src/@core/components/icon'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import DatePicker from 'react-datepicker'
import dynamic from 'next/dynamic'
//** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { base64toFile, returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { axiosIns } from 'src/@fake-db/backend'
// ** Third Party Imports
import { EditorState, convertFromHTML, convertToRaw } from 'draft-js'
// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { backUrl } from 'src/data/data'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from "draftjs-to-html";
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

const ManagerProductEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-1')
  const [userLevelList, setUserLevelList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [bDt, setBDt] = useState(new Date())
  const [categoryList, setCategoryList] = useState([]);
  const defaultObj = {
    product_img: undefined,
    cate_id: categoryList[0]?.id ?? 0,
    name: '',
    mkt_pr: '',
    item_pr: '',
    brand_nm: '',
    origin_nm: '',
    mfg_nm: '',
    model_nm: '',
  }
  const [content, setContent] = useState(EditorState.createEmpty())
  const [values, setValues] = useState(defaultObj);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setValues({ ...values, ['content']: content })

  }, [content])

  useEffect(() => {
    if (categoryList.length > 0) {
      setContent(values?.content)
      setLoading(false);
    }
  }, [categoryList])
  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);
      const response = await axiosIns().get(`/api/v1/manager/categories?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01`);
      if (response?.data?.content.length == 0) {
        toast.error("카테고리를 먼저 등록해 주세요.");
        router.back();
      }
      setCategoryList(response?.data?.content);
      let item = await getItem();
      if (item) {
        let obj = {};
        for (var i = 0; i < Object.keys(values).length; i++) {
          let key = Object.keys(values)[i];
          obj[key] = item[key];
        }
        setValues({ ...obj });
        getOptions();
      } else {
        setValues({ ...values, 'cate_id': response?.data?.content[0]?.id });
      }

    } catch (err) {
      console.log(err);
    }
  }
  const handleChange = async (field, value) => {
    setValues({ ...values, [field]: value });
  }

  const handleChangeValue = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }

  const onReset = async () => {
    setBDt(new Date());
    setValues({ ...defaultObj, level: userLevelList[0].level });
  }
  const handleTabsChange = (event, newValue) => {
    setTabValue(newValue)
  }
  const getOptions = async () => {
    const response = await axiosIns().get(`/api/v1/manager/products/${router.query?.id}/options`);
    console.log(response)
    let option_list = [...response?.data];
    for (var i = 0; i < option_list; i++) {
      option_list[i]['is_saved'] = true;
    }
    setOptions(option_list);
  }
  const saveOptions = async () => {

  }
  const onEditItem = () => {
    let img_key_list = ['product_img'];
    let obj = {
      ...values,
      ['content']: draftToHtml(convertToRaw(content.getCurrentContent()))
    };
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
              <Tab value='tab-2' label='옵션정보' sx={{ mr: 2 }} />
            </TabList>
            <TabPanel sx={{ p: 0 }} value='tab-1'>
              <Grid container spacing={6}>
                <Grid item xs={12} md={5}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>상품 이미지</InputLabel>
                          <FileUploaderSingle
                            className='product_img'
                            setValues={setValues}
                            values={values}
                            value={values?.product_img}
                            sx={{ height: '80%', width: 'auto' }}
                            placeholder={'max-width: 256px, 이상은 리사이징'}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='상품명' placeholder='상품명을 입력해 주세요.' className='name' onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='시장가' placeholder='시장가를 입력해 주세요.' className='mkt_pr' onChange={handleChangeValue('mkt_pr')} defaultValue={values?.mkt_pr} value={values?.mkt_pr} type='number' />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='판매가' placeholder='판매가를 입력해 주세요.' className='item_pr' onChange={handleChangeValue('item_pr')} defaultValue={values?.item_pr} value={values?.item_pr} type='number' />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='브랜드명' placeholder='브랜드명을 입력해 주세요.' className='brand_nm' onChange={handleChangeValue('brand_nm')} defaultValue={values?.brand_nm} value={values?.brand_nm} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='원산지명' placeholder='원산지명을 입력해 주세요.' className='origin_nm' onChange={handleChangeValue('origin_nm')} defaultValue={values?.origin_nm} value={values?.origin_nm} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='제조사명' placeholder='제조사명을 입력해 주세요.' className='mfg_nm' onChange={handleChangeValue('mfg_nm')} defaultValue={values?.mfg_nm} value={values?.mfg_nm} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth label='모델명' placeholder='모델명을 입력해 주세요.' className='model_nm' onChange={handleChangeValue('model_nm')} defaultValue={values?.model_nm} value={values?.model_nm} />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-tabs-select-label'>카테고리</InputLabel>
                            <Select
                              label='Country'
                              id='form-layouts-tabs-select'
                              labelId='form-layouts-tabs-select-label'
                              className='level'
                              onChange={handleChangeValue('cate_id')}
                              defaultValue={values?.cate_id}
                              value={values?.cate_id}
                            >
                              {categoryList && categoryList.map((item, idx) => {
                                return <MenuItem value={item?.id} key={idx}>{item?.name}</MenuItem>
                              })}

                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Card style={{ height: '100%' }}>
                    <CardContent>
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>상품정보</InputLabel>
                      <Grid container spacing={5}>
                        <Grid item xs={12}>
                          <EditorWrapper>
                            <ReactDraftWysiwyg
                              editorClassName='editor-edit'
                              editorState={content}
                              onEditorStateChange={data => {
                                setContent(data)
                              }}
                            />
                          </EditorWrapper>

                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

            </TabPanel>
            <TabPanel sx={{ p: 0 }} value='tab-2'>
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    {options && options.map((item, idx) => (
                      <>
                        <Grid container spacing={6}>
                          <Grid item xs={12} md={5}>
                            <Grid container spacing={5}>
                              <Grid item xs={12}>
                                <FileUploaderSingle
                                  className='product_img'
                                  setValues={setValues}
                                  values={values}
                                  value={values?.product_img}
                                  sx={{ height: '60%', width: 'auto' }}
                                  placeholder={'max-width: 256px, 이상은 리사이징'}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} md={7} >
                            <Grid container spacing={5}>
                              <Grid item xs={12}>
                                <TextField fullWidth label='옵션명' placeholder='상품명을 입력해 주세요.' className='name' onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name} />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField fullWidth label='시장가' placeholder='시장가를 입력해 주세요.' className='mkt_pr' onChange={handleChangeValue('mkt_pr')} defaultValue={values?.mkt_pr} value={values?.mkt_pr} type='number' />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    ))}


                  </Grid>
                </CardContent>
              </Card>
            </TabPanel>
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
          </TabContext>
        </>
      }

    </>
  )
}

export default ManagerProductEdit;
