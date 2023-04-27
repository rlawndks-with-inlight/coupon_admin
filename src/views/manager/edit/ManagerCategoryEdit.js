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
const ManagerCategoryEdit = (props) => {
  const { getItem, editItem, popperPlacement, editCategory } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState('tab-0')
  const [userLevelList, setUserLevelList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [bDt, setBDt] = useState(new Date())
  const [categoryList, setCategoryList] = useState([]);
  const defaultObj = {
    category_img: undefined,
    name: '',
  }
  const [content, setContent] = useState(EditorState.createEmpty())
  const [values, setValues] = useState(defaultObj);


  useEffect(() => {
    setValues({ ...values, ['content']: content })

  }, [content])


  useEffect(() => {
    settingPage();
    //getOneItem();
  }, [])

  const settingPage = async () => {
    try {
      setLoading(true);

      let item = await getItem();
      if (item) {
        let obj = {};
        for (var i = 0; i < Object.keys(values).length; i++) {
          let key = Object.keys(values)[i];
          obj[key] = item[key];
        }
        setValues({ ...obj });
      } else {
        setValues({ ...values });
      }
      setLoading(false);

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
  const onEditItem = () => {
    let img_key_list = ['category_img'];
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
                      <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>카테고리 이미지</InputLabel>
                      <FileUploaderSingle
                        className='category_img'
                        setValues={setValues}
                        values={values}
                        value={values?.category_img}
                        sx={{ height: '80%', width: 'auto' }}
                        placeholder={'512*256 사이즈'}
                      />
                    </Grid>

                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card>
                <CardContent>
                  <InputLabel id='form-layouts-tabs-select-label' sx={{ mb: 4 }}>카테고리정보</InputLabel>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <TextField fullWidth label='카테고리명' placeholder='카테고리명을 입력해 주세요.' className='name' onChange={handleChangeValue('name')} defaultValue={values?.name} value={values?.name} />
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

export default ManagerCategoryEdit;
