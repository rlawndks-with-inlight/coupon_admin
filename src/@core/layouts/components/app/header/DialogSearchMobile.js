// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { TextField } from '@mui/material'
import { useTheme } from '@emotion/react'
import styled from 'styled-components'
import { themeObj } from '../style-component'

const Title = styled.div`
font-size: ${themeObj.font_size.font4};
padding: 0 0 1rem 0;
`
const Content = styled.div`
display:flex;
padding:0.5rem 0;
font-size:${themeObj.font_size.font3};
cursor:pointer;
margin-left:0.5rem;
font-weight:bold;
`
const testSearchList = [
  { title: '블랙시크릿콤보' },
  { title: '방콕점보윙' },
  { title: '레블' },
  { title: '반반오리지날' },
  { title: '국물역떡' },
  { title: '오리지날' },
]
const DialogSearchMobile = (props) => {
  // ** State
  const { open, handleClose, onKeepGoing, style } = props;

  const theme = useTheme();

  const [keyword, setKeyword] = useState('');
  return (
    <div>

      <Dialog fullScreen onClose={handleClose} aria-labelledby='full-screen-dialog-title' open={open}>
        <div style={{ ...style, minHeight: '100vh' }}>
          <DialogTitle id='full-screen-dialog-title' style={{ paddingBottom: '2rem' }}>
            <Typography variant='h6' component='span'>
              <div style={{ display: 'flex' }}>
                <TextField
                  label='통합검색'
                  id='size-small'
                  size='small'
                  onChange={(e) => {
                    setKeyword(e.target.value)
                  }}
                  value={keyword}
                  sx={{ width: '80%', margin: '0 auto' }}
                  onKeyPress={(e) => {
                    if (e.key == 'Enter') {
                    }
                  }}
                />
              </div>
            </Typography>
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ top: 18, right: 10, position: 'absolute', color: 'grey.500' }}
            >
              <Icon icon='tabler:x' />
            </IconButton>
          </DialogTitle>
          <DialogContent style={{ borderTop: `1px solid ${theme.palette.grey[300]}` }}>
            <Title>인기 검색어</Title>
            {testSearchList.map((item, idx) => (
              <>
                <Content theme={theme} >
                  <div style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{idx + 1}</div>
                  <div>{item.title}</div>
                </Content>
              </>
            ))}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}

export default DialogSearchMobile
