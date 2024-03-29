import { useTheme } from "@emotion/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSettings } from "src/@core/hooks/useSettings"
import { returnMoment } from "src/@core/utils/function"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { axiosIns } from "src/@fake-db/backend"
import { LOCALSTORAGE } from "src/data/data"

const DefaultPalette = (mode, skin) => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '51, 48, 60'
  const darkColor = '228, 230, 244'
  const darkPaperBgColor = '#2F3349'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const router = useRouter();
  const { settings } = useSettings();
  const { dnsData } = settings;
  const defaultBgColor = () => {
    let dark_color = '#25293C';
    let dark_paper_color = '#2F3349';
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return dark_paper_color
    } else if (mode === 'light') {
      return '#F8F7FA'
    } else return dark_color
  }
  const [loading, setLoading] = useState(false);
  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C',
      trackBg: mode === 'light' ? '#F1F0F2' : '#3B405B',
      avatarBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072'
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: dnsData?.theme_css?.main_color ?? "#7367f0",
      main: dnsData?.theme_css?.main_color ?? "#7367f0",
      dark: `${dnsData?.theme_css?.main_color ?? "#7367f0"}cc`,
      contrastText: whiteColor
    },
    secondary: {
      light: '#B2B4B8',
      main: '#A8AAAE',
      dark: '#949699',
      contrastText: whiteColor
    },
    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor
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
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    },
    font_size: {
      font1: '2rem',
      font2: '1rem',
      font3: '0.9rem',
      font3: '0.75rem',
      font4: '0.5rem',
    },
    loading: loading,
  }
}

export default DefaultPalette
