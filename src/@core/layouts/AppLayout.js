// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import { Icon } from '@iconify/react'
import { useTheme } from '@emotion/react'
import Header from './components/app/header/index'
import Footer from './components/app/footer/index'
import ScrollToTop from 'src/@core/components/scroll-to-top'
import { cloneElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import BottomMenu from './components/app/bottom-menu'
import { PageTransition, Wrapper } from './components/app/style-component'
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
  const [isHeaderShow, setIsHeaderShow] = useState(true);
  const [isMoveBack, setIsMoveBack] = useState(false);

  useEffect(() => {
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options'] ?? '{"app":{}}');
    dns_data['theme_css'] = JSON.parse(dns_data['theme_css'] ?? "{}");
    let query_keys = Object.keys(router.query);
    for (var i = 0; i < query_keys.length; i++) {

      dns_data['options']['app'][query_keys[i]] = router.query[query_keys[i]];
    }
    setDnsData(dns_data)
  }, [])
  useEffect(() => {
    setIsMoveBack(false);
  }, [router.asPath])

  const [startX, setStartX] = useState(null);
  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };
  const handleTouchMove = (event) => {
    if (isMoveBack) {
      return;
    }
    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;
    if (deltaX < -70) {
      setIsMoveBack(true);
      router.back();
      console.log('Move to the left');
    }
  };
  return (
    <BlankLayoutWrapper className='layout-wrapper' style={{
      color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : '#000'}`,
      background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : '#fff'}`,
    }}>
      <Box
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className='app-content'
        sx={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
        <Header isHeaderShow={isHeaderShow} />
        <PageTransition router={router}>
          <Wrapper
            dns_data={dnsData}>
            {children}
          </Wrapper>
          <Footer />
        </PageTransition>
        <BottomMenu />

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
