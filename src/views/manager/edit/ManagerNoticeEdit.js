import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'

// ** Demo Components Imports
import { EditorState } from 'draft-js'

// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'

// ** Source code imports

// ** Styles
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const ManagerNoticeEdit = (props) => {
  const { getItem, editItem } = props;

  const [values, setValues] = useState({
    title: '',
    content: EditorState.createEmpty(),
  })
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

  const handleChangeInputValue = (key, value) => {
    setValues({ ...values, [key]: value })
  }

  const onReset = () => {
    setValues({
      title: '',
      content: EditorState.createEmpty(),
    })
  }

  return (
    <>
      <Card>
        <CardContent>
          <EditorWrapper>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField fullWidth label='제목' placeholder='제목을 입력해 주세요.' className='ad_name' onChange={handleChangeValue('ad_name')} defaultValue={values?.ad_name} value={values?.ad_name} />
              </Grid>
              <Grid item xs={12}>
                <ReactDraftWysiwyg
                  editorState={values?.content}
                  onEditorStateChange={data => handleChangeInputValue('content', data)}
                  toolbar={{
                    image
                  }}
                />
              </Grid>
            </Grid>
          </EditorWrapper>
        </CardContent>
      </Card>
      <Card style={{ marginTop: '24px' }}>
        <CardContent>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={() => editItem({ ...values })}>
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

export default ManagerNoticeEdit;
