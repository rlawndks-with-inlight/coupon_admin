// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { useTheme } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getLocalStorage } from '../utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { useSettings } from '../hooks/useSettings'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }) => {
  const { settings } = useSettings();
  const theme = useTheme();
  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState("");
  const [dnsData, setDnsData] = useState({});
  useEffect(() => {
    let dns_data = settings.dnsData;
    setDnsData(dns_data)
  }, [])
  useEffect(() => {
    if (theme.palette.mode == 'dark') {
      if (router.asPath.includes('/app/')) {
        let dns_data = settings.dnsData;
        setBackgroundColor(dns_data?.options?.app?.dark_background_color ?? "#000");
      } else {
        setBackgroundColor('');
      }
    } else {
      setBackgroundColor('#fff');
    }

  }, [router.asPath])
  if (!settings.dnsData?.id) {
    return (
      <>

      </>
    )
  }
  return (
    <BlankLayoutWrapper className='layout-wrapper' style={{ background: backgroundColor }}>
      <Box className='app-content' sx={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
