import { useTheme } from "@emotion/react";
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { Transition, TransitionGroup } from "react-transition-group";
import { Box } from "@mui/material";
import { useSettings } from "src/@core/hooks/useSettings";

const TIMEOUT = 1000;
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    transform: `translateX(100vw)`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    transform: `translateX(0)`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    transform: `translateX(100vw)`,
    opacity: 0,
  },
  none: {

  }
};
export const PageTransition = ({ children, router, }) => {
  const [isUseAnimation, setIsUseAnimation] = useState(true);
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.asPath);
  }, [router])
  return (
    <>
      <TransitionGroup style={{ position: "relative" }}>
        <Transition
          key={router.pathname}
          timeout={{
            enter: TIMEOUT,
            exit: TIMEOUT,
          }}
        >
          {(status) => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </Transition>
      </TransitionGroup>
    </>
  );
};

export const WrapperStyle = styled(Box)`
display:flex;
flex-direction:column;
min-height:90vh;
padding: 0 0 4rem 0;
position: relative;
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
export const ContentWrapper = styled(Box)`
max-width:1200px;
width:90%;
margin: 1rem auto;
`
export const Row = styled(Box)`
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
export const Font1 = styled(Box)`
  font-size:${themeObj.font_size.font1};
  @media (max-width: 850px) {
    font-size:${themeObj.font_size.font2};

  }
`
export const Font2 = styled(Box)`
font-size:${themeObj.font_size.font2};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font3};

}
`
export const Font3 = styled(Box)`
font-size:${themeObj.font_size.font3};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font4};

}
`
export const Font4 = styled(Box)`
font-size:${themeObj.font_size.font4};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font5};

}
`
export const Font5 = styled(Box)`
font-size:${themeObj.font_size.font5};
`

export const InputLabel = styled(Box)`

@media (max-width: 350px) {
  font-size:${themeObj.font_size.font4};

  }
`

const InputContainer = styled(Box)`
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
const Placeholder = styled(Box)`
position: absolute;
transition-duration: 200ms;
`
export const MakeInput = (props) => {
  const {
    id, label, size = 'size2', type, className, style, dnsData, placeholder,
    onFocus, onBlur, onChange, endAdornment,
    endButtonProps,
    common
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
            color: `${(isFocus) ? dnsData?.theme_css?.main_color : themeObj.grey[600]}`,
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
          autoComplete="false"
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
  const { settings } = useSettings();
  return (
    <>
      <ButtonStyle style={{
        background: `${dnsData ? dnsData?.theme_css?.main_color : settings.dnsData?.theme_css?.main_color}`,
        ...style,
      }}
        onClick={onClick}
      >{children}</ButtonStyle>
    </>
  )
}

const DialogBackground = styled(Box)`
position:fixed;
top:0;
width:100vw;
height:100vh;
z-index: 9999 !important;
transition-duration: 200ms;
`
const DialogFullScreenStyle = styled(Box)`
position:fixed;
top:0;
width:100vw;
height:100vh;
z-index: 10000 !important;
transition-duration: 200ms;
right:-100vw;
`
export const MakeDialogFullScreen = (props) => {
  const { children, open, onClose, dnsData, style } = props;
  const theme = useTheme();
  const { settings } = useSettings();
  const [startX, setStartX] = useState(null);
  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };
  const handleTouchMove = (event) => {
    if (!open) {
      return;
    }
    const currentX = event.touches[0].clientX;
    const deltaX = startX - currentX;
    if (deltaX < -70) {
      // 왼쪽으로 화면 이동
      onClose();
      // 이동에 따른 필요한 작업 수행
    }
  };
  const getLocalStorageDnsData = () => {
    let dns_data = settings.dnsData;
    return dns_data
  }
  return (
    <>
      <DialogFullScreenStyle
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{
          //display: `${open ? '' : 'none'}`,
          ...style,
          background: `${(theme.palette.mode == 'dark' ? (dnsData ? dnsData?.options?.app?.dark_background_color : getLocalStorageDnsData()?.options?.app?.dark_background_color) : '#fff')}`,
          right: `${open ? '0' : '-100vw'}`,
        }}>
        {children}
      </DialogFullScreenStyle>
    </>
  )
}


