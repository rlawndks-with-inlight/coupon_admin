// ** React Imports
import { useState, forwardRef, useMemo, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import CardContent from '@mui/material/CardContent'

import { objEditColumns } from 'src/data/manager-data'
import $ from 'jquery';
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import CardSnippet from 'src/@core/components/card-snippet'
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'
import { useRouter } from 'next/router'
import axiosIns from 'src/@fake-db/backend'
import { useDropzone } from 'react-dropzone'

const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))



const ManagerEditCard = (props) => {
  const router = useRouter();
  const theme = useTheme();

  const [myNick, setMyNick] = useState("")
  const [loading, setLoading] = useState(false);
  const [imgContentObj, setImgContentObj] = useState({});
  const [imgUrlObj, setImgUrlObj] = useState({});
  const [optionListObj, setOptionListObj] = useState({})
  const [editorListObj, setEditorListObj] = useState({});
  const [breadcrumbText, setBreadcrumbText] = useState("");

  useEffect(() => {
  }, [router.asPath])


  return (
    <Card>
      <CardContent sx={{ px: [6, 10] }}>
        {objEditColumns[router.query?.table]?.columns.map((cols, index) => (
          <>
            {cols.map((item, idx) => (
              <>
                <InputLabel htmlFor='invoice-note' sx={{ mb: 2, fontWeight: 500, fontSize: '1rem' }}>
                  {item.title}
                </InputLabel>
                {item.type == 'input' ?
                  <>
                    <TextField id='outlined-basic' label={item.title} className={item?.class_name} style={{ width: '100%', maxWidth: '500px' }} />
                  </>
                  :
                  <></>}
                {item.type == 'img' ?
                  <>
                  </>
                  :
                  <></>}
                {item.type == 'img' ?
                  <>
                  </>
                  :
                  <></>}
              </>
            ))}

          </>
        ))}
      </CardContent>
    </Card>
  )
}

export default ManagerEditCard
