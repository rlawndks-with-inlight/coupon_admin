import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import $ from 'jquery';
import { FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { useTheme } from "@emotion/react";
import { axiosIns } from "src/@fake-db/backend";
import { toast } from "react-hot-toast";
import { getBackgroundColor, handleLogout, processCatch } from "src/@core/utils/function";
import { useSettings } from "src/@core/hooks/useSettings";
import ModeToggler from "../../shared-components/ModeToggler";
import DrawerMenu from "../DrawerMenu";

const TopWrapper = styled.header`
width:90%;
max-width:1200px;
margin:0 auto;
padding:1.5rem 0;
display:flex;
justify-content:space-between;
align-items:center;
@media (max-width: 1200px) {
  padding:0.5rem 0;
}
`
const BottomWrapper = styled.header`
width:90%;
max-width:1200px;
margin:0 auto;
display:flex;
justify-content:space-between;
align-items:center;

`
const Logo = styled.img`
height:3rem;
cursor: pointer;
width:auto;
@media (max-width: 1200px) {
  height:2rem;
}
`
const MenuList = styled.div`
display: flex;
max-width: 350px;
width: 30%;
z-index:10;
@media (max-width: 1200px) {
  position:fixed;
  top:0;
  right:0;
  width:250px;
  display:${props => props.display};
  background:${props => props.mobileBackground};
  flex-direction:column;
  height:100vh;
  font-weight:bold;
}
`
const Menu = styled.div`
cursor: pointer;
margin:0 auto;
@media (max-width: 1200px) {
  padding:1rem;
  margin:0;
  border-bottom: 1px solid ${props => props.theme.palette.grey[300]};
}
`
const MobileMenu = styled.div`
cursor: pointer;
display:none;
@media (max-width: 1200px) {
  display:flex;
  padding:1rem;
  border-bottom: 1px solid ${props => props.theme.palette.grey[300]};
}
`
const XButtonContainer = styled.div`
display:none;
@media (max-width: 1200px) {
  padding:1rem;
  display:flex;
}
`
const CategoryList = styled.div`
display:-webkit-box;
overflow-x:auto;
width:100%;

`
const Category = styled.div`
margin-right:1rem;
cursor:pointer;
padding:0.25rem;
`

const SearchPc = styled.div`
  display:flex;
  @media (max-width: 1200px) {
    display:none;
  }
`
const Mobile = styled.div`
display:none;
  @media (max-width: 1200px) {
    display:flex;
  }
`
const Header = () => {
  const router = useRouter();
  const theme = useTheme();

  const { settings, saveSettings } = useSettings();

  const [paddingTop, setPaddingTop] = useState(0);
  const [keyword, setKeyword] = useState('')
  const [dnsData, setDnsData] = useState({})
  const [userData, setUserData] = useState({})
  const [isShowCategoryList, setIsShowCategoryList] = useState(true);
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
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
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
      <header style={{
        width: '100%',
        position: 'fixed',
        top: '0',
        display: 'flex',
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        flexDirection: 'column',
        zIndex: '10',
        background: getBackgroundColor(theme)
      }} className="header-wrapper">
        <TopWrapper>
          {dnsData?.logo_img ?
            <>
              <Logo src={dnsData?.logo_img} onClick={() => {
                router.push('/shop')
              }} />
            </>
            :
            <>
              <div />
            </>}
          <SearchPc>
            <TextField
              label='통합검색'
              id='size-small'
              size='small'
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
              value={keyword}
              sx={{ width: '350px' }}
              onKeyPress={(e) => {
                if (e.key == 'Enter') {
                  router.push(`/shop/item/list?keyword=${keyword}`)
                }
              }}
            />

          </SearchPc>
          <Mobile>
            <ModeToggler settings={settings} saveSettings={saveSettings} />
            <IconButton color='inherit' aria-haspopup='true'>
              <Icon icon='tabler:search' style={{ fontSize: '1.5rem' }} />
            </IconButton>
            <IconButton color='inherit' aria-haspopup='true' style={{ padding: '0.5rem 0', marginLeft: '0.5rem' }} onClick={() => {
              setMenuDisplay('flex');
            }}>
              <Icon icon='tabler:menu-2' style={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Mobile>

          <MenuList display={menuDisplay} theme={theme} mobileBackground={getBackgroundColor(theme)}>
            <XButtonContainer>
              <IconButton color='inherit' aria-haspopup='true' style={{ marginLeft: 'auto' }} onClick={() => { setMenuDisplay('none') }}>
                <Icon icon='tabler:x' style={{ fontSize: '1.5rem' }} />
              </IconButton>
            </XButtonContainer>
            <MobileMenu theme={theme}>HOME</MobileMenu>
            <Menu theme={theme}>고객센터</Menu>
            <Menu theme={theme}>FAQ</Menu>
            <Menu theme={theme}>1:1 문의</Menu>
            {userData?.id ?
              <>
                <Menu theme={theme} style={{ borderBottom: 'none' }} onClick={() => handleLogout(router, '/shop/login')}>로그아웃</Menu>
              </>
              :
              <>
                <Menu theme={theme}>회원가입</Menu>
                <Menu theme={theme} style={{ borderBottom: 'none' }}>로그인</Menu>
              </>}
          </MenuList>
        </TopWrapper>
        <BottomWrapper>
          <CategoryList className="none-scroll">
            <Category style={{ borderBottom: `${(0 == query?.cate_id || !query?.cate_id) ? `3px solid ${theme.palette.primary.main}` : ''}`, fontWeight: `${getCategoryColor(0).fontWeight}` }} onClick={() => {
              router.push(`/shop/item/list?cate_id=0`)
            }}>전체</Category>
            {categoryList && categoryList.map((item, idx) => {
              return <Category style={{ borderBottom: `${item?.id == query?.cate_id ? `3px solid ${theme.palette.primary.main}` : ''}`, fontWeight: `${getCategoryColor(item?.id).fontWeight}` }}
                onClick={() => { router.push(`/shop/item/list?cate_id=${item?.id}`) }}
              >{item.name}</Category>
            })}
          </CategoryList>
        </BottomWrapper>
      </header>
      <div style={{ paddingTop: paddingTop }} />
    </>
  )
}
export default Header
