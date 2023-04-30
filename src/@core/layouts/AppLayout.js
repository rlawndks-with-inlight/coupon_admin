// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import { Icon } from '@iconify/react'
import { useTheme } from '@emotion/react'
import Header from './components/app/header/index'
import Footer from './components/app/footer/index'
import ScrollToTop from 'src/@core/components/scroll-to-top'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import BottomMenu from './components/app/bottom-menu'
import { Wrapper } from './components/app/style-component'
import { useState } from 'react'
import { getLocalStorage } from '../utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
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

const AppLayout = ({ children, scrollToTop }) => {
  const theme = useTheme();
  const router = useRouter();
  const [dnsData, setDnsData] = useState({});
  useEffect(() => {
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options'] ?? "{}");
    dns_data['theme_css'] = JSON.parse(dns_data['theme_css'] ?? "{}");
    setDnsData(dns_data)
  }, [])
  return (
    <BlankLayoutWrapper className='layout-wrapper' style={{ background: `${theme.palette.mode == 'dark' ? '' : '#fff'}` }}>
      <Box className='app-content' sx={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
        <Header />
        <Wrapper dns_data={dnsData}>
          {children}
        </Wrapper>
        <BottomMenu />
        <Footer />
      </Box>
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top' style={{
            bottom: '3rem'
          }}>
            <Icon icon='tabler:arrow-up' />
          </Fab>
        </ScrollToTop>
      )}
    </BlankLayoutWrapper>
  )
}

export default AppLayout
