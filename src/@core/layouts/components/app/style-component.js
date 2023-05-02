import { useTheme } from "@emotion/react";
import { Icon } from "@iconify/react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export const PageTransition = ({ children, router, }) => {
  const [isUseAnimation, setIsUseAnimation] = useState(false);
  useEffect(() => {
    if (router.asPath.includes('/app/merchandise/detail/')) {
      setIsUseAnimation(true)
    } else {
      setIsUseAnimation(false)
    }
  }, [router])

  return (
    <>
      {isUseAnimation ?
        <>
          <motion.div
            initial={{ transform: 'translateX(100vw)' }}
            animate={{ transform: 'translateX(0)' }}
            exit={{ transform: 'translateX(100vw)' }}
          >
            {children}
          </motion.div>
        </>
        :
        <>
          {children}
        </>
      }
    </>
  );
};

export const WrapperStyle = styled.div`
display:flex;
flex-direction:column;
min-height:90vh;
padding: 0 0 4rem 0;
`
export const Wrapper = (props) => {
  const { children, style, dns_data } = props;
  const theme = useTheme();

  return (
    <>
      <WrapperStyle style={{
        ...style,
        color: `${theme.palette.mode == 'dark' ? dns_data?.options?.app?.dark_font_color : '#000'}`,
        background: `${theme.palette.mode == 'dark' ? dns_data?.options?.app?.dark_background_color : '#fff'}`,
      }}>
        {children}
      </WrapperStyle>
    </>
  )
}
export const ContentWrapper = styled.div`
max-width:1200px;
width:90%;
margin: 1rem auto;
`
export const Row = styled.div`
display:flex;
`
export const themeObj = {
  red: '#C92323',
  green: '#048B48',
  yellow: '#FDC604',
  blue: '#1263CE',
  font_size: {
    font1: '20px',
    font2: '15px',
    font3: '13px',
    font4: '12px',
    font5: '10px',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#F5F5F5',
    A200: '#EEEEEE',
    A400: '#BDBDBD',
    A700: '#616161'
  },
}
export const Font1 = styled.div`
  font-size:${themeObj.font_size.font1};
  @media (max-width: 850px) {
    font-size:${themeObj.font_size.font2};

  }
`
export const Font2 = styled.div`
font-size:${themeObj.font_size.font2};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font3};

}
`
export const Font3 = styled.div`
font-size:${themeObj.font_size.font3};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font4};

}
`
export const Font4 = styled.div`
font-size:${themeObj.font_size.font4};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font5};

}
`
export const Font5 = styled.div`
font-size:${themeObj.font_size.font5};
`
