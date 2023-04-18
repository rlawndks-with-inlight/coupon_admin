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
import dynamic from 'next/dynamic'
//** Custom Component Imports
import CustomInput from '/src/views/forms/form-elements/pickers/PickersCustomInput'
import { base64toFile, returnMoment, useEditPageImg } from 'src/@core/utils/function'
import { axiosIns } from 'src/@fake-db/backend'
// ** Third Party Imports
import { EditorState } from 'draft-js'
// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { backUrl } from 'src/data/data'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const ManagerProductEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-0')
  const [userLevelList, setUserLevelList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [bDt, setBDt] = useState(new Date())
  const [categoryList, setCategoryList] = useState([]);
  const defaultObj = {
    product_img: undefined,
    cate_id: categoryList[0]?.id ?? 0,
    name: '',
    price: '',
    content: '',
  }
  const [content, setContent] = useState(EditorState.createEmpty())
  const [values, setValues] = useState(defaultObj);


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
      } else {
        setValues({ ...values, 'cate_id': response?.data?.content[0]?.id });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getOneItem = async () => {
    let item = await getItem();
    let obj = {};
    if (item) {
      setBDt(new Date(item?.birth_date));
      for (var i = 0; i < Object.keys(values).length; i++) {
        let key = Object.keys(values)[i];
        obj[key] = item[key];
      }
    }
    return obj;
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
  const onEditItem = () => {
    let img_key_list = ['product_img'];
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
      {loading ?
        <>
        </>
        :
        <>
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
                        sx={{ height: '60%', width: 'auto' }}
                        placeholder={'max-width: 256px, 이상은 리사이징'}
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card>
                <CardContent>
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>상품정보</InputLabel>
                  <Grid container spacing={5}>
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
                    <Grid item xs={12}>
                      <TextField fullWidth label='상품명' placeholder='상품명을 입력해 주세요.' className='name' onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label='가격' placeholder='가격을 입력해 주세요.' className='price' onChange={handleChangeValue('price')} defaultValue={values?.price} value={values?.price} type='number' />
                    </Grid>
                    <Grid item xs={12}>
                      <EditorWrapper>
                        <ReactDraftWysiwyg
                          editorState={content}
                          onEditorStateChange={data => setContent(data)}
                        />
                      </EditorWrapper>

                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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
      }

    </>
  )
}

export default ManagerProductEdit;
