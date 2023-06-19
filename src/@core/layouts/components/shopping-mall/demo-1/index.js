// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import { Icon } from '@iconify/react'
import { useTheme } from '@emotion/react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from 'src/@core/components/scroll-to-top'
import { useEffect } from 'react'
// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
}))

const ShoppingMallLayout1 = (props) => {
  const {
    data: {
      dnsData,
      keyword,
      menuDisplay,
      userData,
      query,
      categoryList,
      paddingTop
    },
    func: {
      getCategoryColor,
      setKeyword,
      setMenuDisplay,
      setQuery
    },
    children, scrollToTop,
  } = props;
  const theme = useTheme();
  return (
    <BlankLayoutWrapper className='layout-wrapper' style={{ background: `${theme.palette.mode == 'dark' ? '' : '#fff'}` }}>
      <Box className='app-content' sx={{ overflow: 'hidden', minHeight: '100vh', position: 'relative' }}>
        <Header
          data={{
            dnsData,
            keyword,
            menuDisplay,
            userData,
            query,
            categoryList,
            paddingTop
          }}
          func={{
            getCategoryColor,
            setKeyword,
            setMenuDisplay,
            setQuery
          }}
        />
        {children}
        <Footer />
      </Box>
      {scrollToTop ? (
        scrollToTop(props)
      ) : (
        <ScrollToTop className='mui-fixed'>
          <Fab color='primary' size='small' aria-label='scroll back to top'>
            <Icon icon='tabler:arrow-up' />
          </Fab>
        </ScrollToTop>
      )}
    </BlankLayoutWrapper>
  )
}

export default ShoppingMallLayout1
