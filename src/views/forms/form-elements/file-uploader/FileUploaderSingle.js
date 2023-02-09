// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  marginBottom: theme.spacing(8.5)
}))

const FileUploaderSingle = (props) => {
  const { className, value, values, setValues } = props;

  // ** State
  const [files, setFiles] = useState([])
  const [url, setUrl] = useState("");

  // ** Hooks
  const theme = useTheme()
  useEffect(() => {
    console.log(typeof value == 'object')
    if (typeof value == 'object') {
      setFiles((value ?? []).map(file => Object.assign(file)))
    } else {
      if (typeof value == 'string') {
        setUrl(value);
      }
    }
  }, [value])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: acceptedFiles => {
      setValues({ ...values, [`${className}`]: acceptedFiles })
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const img = files.map(file => (
    <img key={file.name} alt={file.name} className='single-file-image' style={{ margin: 'auto', height: '90%' }} src={URL.createObjectURL(file)} />
  ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })} style={{ display: 'flex' }} sx={files.length ? { height: 200 } : {}}>
      <input {...getInputProps()} />
      {files.length ?
        <>
          {img}
        </> : <>
          {url ?
            <>
              <img className='single-file-image' style={{ margin: 'auto', height: '90%' }} src={url} />
            </>
            :
            <>
              <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column', margin: 'auto' }}>
                <Img alt='Upload img' src={`/images/misc/upload-${theme.palette.mode}.png`} />
              </Box>
            </>}

        </>}
    </Box >
  )
}

export default FileUploaderSingle
