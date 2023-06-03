import { useTheme } from "@emotion/react";
import { Icon } from "@iconify/react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";

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
        color: `${theme.palette.mode == 'dark' ? dns_data?.options?.app?.dark_font_color ?? "#fff" : '#000'}`,
        background: `${theme.palette.mode == 'dark' ? dns_data?.options?.app?.dark_background_color ?? "#000" : '#fff'}`,
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
    font6: '9px',
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

export const InputLabel = styled.div`

@media (max-width: 350px) {
  font-size:${themeObj.font_size.font4};

  }
`

const InputContainer = styled.div`
position:relative;
`
const InputStyle = styled.input`
border-radius: 6px;
padding:9px 14px;
width:100%;
font-size:${themeObj.font_size.font2};
border-width:1px;
border-style:solid;
border-color:${themeObj.grey[400]};
outline:none;
background:transparent;
&:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
  transition: background-color 5000s ease-in-out 0s;
}
`
const Label = styled.label`
transition-duration: 150ms;
position:absolute;
font-size:${themeObj.font_size.font4};
padding:0 2px;
cursor:text;
`
const Placeholder = styled.div`
position: absolute;
transition-duration: 200ms;
`
export const MakeInput = (props) => {
  const {
    id, label, size = 'size2', type, className, style, dnsData, placeholder,
    onFocus, onBlur, onChange, endAdornment,
    endButtonProps
  } = props;

  const theme = useTheme();

  const size_style_obj = {
    size1: {

    },
    size2: {
      input: {

      },
      label: {
        top: {
          true: '-6px',
          false: '9px',
        }
      }
    },
    size3: {

    },
  }

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <InputContainer style={{ ...style?.container }}>
        <Label
          for={id}
          style={{
            ...style?.label,
            color: `${(isFocus || value) ? dnsData?.theme_css?.main_color : themeObj.grey[600]}`,
            fontSize: `${(isFocus || value) ? themeObj.font_size.font5 : themeObj.font_size.font2}`,
            left: '14px',
            top: `${(isFocus || value) ? size_style_obj[size]['label'].top['true'] : size_style_obj[size]['label'].top['false']}`,
            background: `${(isFocus || value) ? (theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color : '#fff') : ''}`,
            padding: `${(isFocus || value) ? '0 4px' : ''}`
          }}
        >{label}</Label>
        {placeholder ?
          <>
            <Placeholder
              style={{
                ...style?.placeholder,
                left: '16px',
                top: `${size_style_obj[size]['label'].top['false']}`,
                fontSize: themeObj.font_size.font2,
                opacity: `${(isFocus && !value) ? '1' : '0'}`,
                visibility: `${(isFocus && !value) ? 'visible' : 'hidden'}`,
                color: themeObj.grey[400]
              }}
            >{placeholder}</Placeholder>
          </>
          :
          <>
          </>}
        <InputStyle
          id={id}
          className={className}
          type={type}
          style={{
            color: `${theme.palette.mode == 'dark' ? '#fff' : themeObj.grey[700]}`,
            ...style,
            borderColor: `${isFocus ? dnsData?.theme_css?.main_color : ''}`,
            borderWidth: `${isFocus ? '2px' : ''}`,
            margin: `${isFocus ? '0px' : '1px'}`,
            boxShadow: `${isFocus ? '0 2px 3px 0 rgba(51, 48, 60, 0.1)' : ''}`,
            paddingRight: `${endButtonProps ? '110px' : ''}`
          }}
          onFocus={() => {
            onFocus();
            setIsFocus(true);
          }}
          onBlur={() => {
            onBlur();
            setIsFocus(false);
          }}
          onChange={(e) => {
            onChange(e);
            setValue(e.target.value);
          }}
        />
        {endAdornment ?
          <>
            {endAdornment}
          </>
          :
          <>
          </>}
        {endButtonProps ?
          <>
            <MakeButton onClick={endButtonProps?.onClick}
              style={{
                position: 'absolute',
                height: '38px',
                right: '-1px',
                boxShadow: 'none',
                top: '1.5px',
                borderTopLeftRadius: '0',
                borderTopRightRadius: '6px',
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '6px',
                width: '98px',
                ...endButtonProps?.style
              }}
            >{endButtonProps?.text}</MakeButton>
          </>
          :
          <>
          </>}
      </InputContainer>
    </>
  )
}
export const MakeDialogFullScreen = () => {
  const { } = props;
  return (
    <>
    </>
  )
}
const ButtonStyle = styled.button`
  position: relative;
  overflow: hidden;
  transition: background 400ms;
  color: #fff;
  background: transparent;
  font-size:${themeObj.font_size.font3};
  height: 40px;
  width:90px;
  outline: 0;
  border: 0;
  border-radius: 0.25rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3); /* black with 30% opacity */
  cursor: pointer;
  padding:0;
  @media (max-width:350px) {
      font-size: ${themeObj.font_size.font4};
  }
`
export const MakeButton = (props) => {
  const { children, style, dnsData, onClick } = props;
  return (
    <>
      <ButtonStyle style={{
        background: `${dnsData ? dnsData?.theme_css?.main_color : JSON.parse(JSON.parse(getLocalStorage(LOCALSTORAGE.DNS_DATA))?.theme_css)?.main_color}`,
        ...style,
      }}
        onClick={onClick}
      >{children}</ButtonStyle>
    </>
  )
}
