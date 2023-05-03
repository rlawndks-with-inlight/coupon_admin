import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { useEffect, useState } from 'react'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
// ** Third Party Imports
import { EditorState } from 'draft-js'
// ** Component Import
import { useRouter } from 'next/router'

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
