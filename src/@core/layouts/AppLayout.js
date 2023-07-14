// ** MUI Imports
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
import { useState } from 'react'
import { getLocalStorage } from '../utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { toast } from 'react-hot-toast'
import { StyledEngineProvider } from "@mui/material";
import { useSettings } from '../hooks/useSettings'
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

const AppLayout = ({ children, scrollToTop }) => {

  const { settings } = useSettings();
  const theme = useTheme();
  const router = useRouter();
  const [dnsData, setDnsData] = useState({});
  const [isMoveBack, setIsMoveBack] = useState(false);

  const [isGoBack, setIsGoBack] = useState(false);

  useEffect(() => {
    let dns_data = settings.dnsData;
    let query_keys = Object.keys(router.query);
    if (router.query['dark_background_color']) {
      for (var i = 0; i < query_keys.length; i++) {
        dns_data['options']['app'][query_keys[i]] = router.query[query_keys[i]];
      }
    }
    setDnsData(dns_data)
  }, [])
  useEffect(() => {
    setIsMoveBack(false);
    checkIsGoBack();
  }, [router.asPath])


  const z_go_back_link = [
    '/app/merchandise/detail'
  ]
  const checkIsGoBack = () => {
    let is_go_back = false;
    for (var i = 0; i < z_go_back_link.length; i++) {
      if (router.asPath.includes(z_go_back_link[i])) {
        is_go_back = true;
      }
    }
    setIsGoBack(is_go_back)
  }

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
      if (router.pathname == '/app/home') {
        //홈에서 뒤로가기 할때
      } else {
        setIsMoveBack(true);
        router.back();
      }
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <BlankLayoutWrapper
        className='layout-wrapper'
        style={{
          color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : '#000'}`,
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : '#fff'}`,
        }}>
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className='app-content'
          style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {children}
        </Box>
        {/* <Footer /> */}
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
    </StyledEngineProvider>
  )
}

export default AppLayout
