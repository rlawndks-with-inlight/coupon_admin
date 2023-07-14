// ** MUI Imports

import { useTheme } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSettings } from '../hooks/useSettings'
import $ from 'jquery'
import { getLocalStorage } from '../utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { getBackgroundColor, processCatch } from '../utils/function'
import { axiosIns } from 'src/@fake-db/backend'
import { StyledEngineProvider } from "@mui/material";

import ShoppingMallLayout1 from './components/shopping-mall/demo-1'
import ShoppingMallLayout2 from './components/shopping-mall/demo-2'
import ShoppingMallLayout3 from './components/shopping-mall/demo-3'

// Styled component for Blank Layout component
const getDemo = (num, common) => {
  if (num == 1)
    return <ShoppingMallLayout1 {...common} />
  else if (num == 2)
    return <ShoppingMallLayout2 {...common} />
  else if (num == 3)
    return <ShoppingMallLayout3 {...common} />
}
const ShoppingMallLayout = ({ children, scrollToTop }) => {
  const theme = useTheme();
  const router = useRouter();
  const { settings } = useSettings();
  const [layoutDemoNum, setLayoutDemoNum] = useState(1);

  const [paddingTop, setPaddingTop] = useState(0);
  const [keyword, setKeyword] = useState('')
  const [dnsData, setDnsData] = useState({})
  const [userData, setUserData] = useState({})
  const [categoryList, setCategoryList] = useState([]);
  const [menuDisplay, setMenuDisplay] = useState('none');
  const [query, setQuery] = useState({
    cate_id: 0
  })
  useEffect(() => {
    getLocalStorageData();
    getCategoryList();
  }, [])
  useEffect(() => {
    setPaddingTop(`${$('.header-wrapper').outerHeight()}px`)
    setQuery({ ...query, ['cate_id']: router.query?.cate_id })
  }, [router.asPath, categoryList])
  const getLocalStorageData = async () => {//로컬 스토리지 관련 데이터 불러오기
    let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user = JSON.parse(user);
    setUserData(user);
  }

  const getCategoryList = async () => {
    try {
      let dns_data = settings.dnsData;
      setDnsData(dns_data);
      const response = await axiosIns().get(`/api/v1/shop/items?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01&cate_id=0&brand_id=${dns_data?.id}&search=`);
      if (response?.data?.categories.length == 0) {
        toast.error("카테고리를 먼저 등록해 주세요.");
        router.back();
      }
      setCategoryList(response?.data?.categories);
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }
  const getCategoryColor = (id) => {
    let obj = {
      color: '',
      fontWeight: ''
    }
    if (id == 0) {
      if (!router.query?.cate_id || router.query?.cate_id == 0) {
        obj['color'] = theme.palette.primary.main
        obj['fontWeight'] = 'bold'
      }
    } else {
      if (id == router.query?.cate_id) {
        obj['color'] = theme.palette.primary.main
        obj['fontWeight'] = 'bold'
      } else {
        obj['color'] = getBackgroundColor(theme);
      }
    }
    return obj;
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        {getDemo(layoutDemoNum, {
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
            setQuery,
            router,
          },
          children,
          scrollToTop
        })}
      </StyledEngineProvider>
    </>
  )
}
export default ShoppingMallLayout
