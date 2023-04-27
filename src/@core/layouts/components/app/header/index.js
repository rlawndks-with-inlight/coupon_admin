import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import $ from 'jquery';
import { FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE, zBottomMenu } from "src/data/data";
import { useTheme } from "@emotion/react";
import { axiosIns } from "src/@fake-db/backend";
import { toast } from "react-hot-toast";
import { getBackgroundColor, handleLogout, processCatch } from "src/@core/utils/function";
import { useSettings } from "src/@core/hooks/useSettings";
import DialogSearchMobile from "./DialogSearchMobile";

const TopWrapper = styled.header`
width:90%;
max-width:1200px;
margin:0 auto;
padding:1.5rem 0;
display:flex;
justify-content:space-between;
align-items:center;
height: 5rem;
@media (max-width: 1200px) {
  height: 3rem;
}
`
const Logo = styled.img`
max-height:3rem;
max-width:8rem;
cursor: pointer;
@media (max-width: 1200px) {
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
font-weight: bold;
@media (max-width: 1200px) {
  padding:1rem;
  margin:0;
  border-bottom: 1px solid ${props => props.theme.palette.grey[300]};
}
`
const SearchPc = styled.div`
  display:flex;
  @media (max-width: 1200px) {
    display:none;
  }
`
const Icons = styled.div`
display:flex;

  @media (max-width: 1200px) {
    position:absolute;
    right: 5%;
}
`
const MobileSide = styled.div`
display:none;
  @media (max-width: 1200px) {
    display:flex;
}
`
const PaddingTop = styled.div`
padding-top:5rem;
@media (max-width: 1200px) {
  padding-top:3rem;
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
    setQuery({ ...query, ['cate_id']: router.query?.cate_id })
  }, [router.asPath, categoryList])
  const getLocalStorageData = async () => {//로컬 스토리지 관련 데이터 불러오기
    let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user = JSON.parse(user);
    setUserData(user);
  }

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode: mode })
  }
  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
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

  const [searchOpen, setSearchOpen] = useState(false);
  const handleSearchClose = () => setSearchOpen(false);
  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <>
      <DialogSearchMobile
        open={searchOpen}
        handleClose={handleSearchClose}
      />
      <header style={{
        width: '100%',
        position: 'fixed',
        top: '0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: '10',
        background: `${theme.palette.mode == 'dark' ? '#000' : '#fff'}`,
        color: `${theme.palette.mode == 'dark' ? '#fff' : '#000'}`
      }} className="header-wrapper">
        <TopWrapper>
          {dnsData?.logo_img ?
            <>
              <Logo src={dnsData[theme.palette.mode == 'dark' ? 'dark_logo_img' : 'logo_img']} onClick={() => {
                router.push('/app/home')
              }} />
            </>
            :
            <>
              <div />
            </>}
          <MenuList display={menuDisplay} theme={theme} mobileBackground={getBackgroundColor(theme)}>
            {zBottomMenu.map((item, idx) => (
              <>
                {idx != 0 ?
                  <>
                    <Menu theme={theme} onClick={() => {
                      router.push(item.link)
                    }}
                    >{item.title}</Menu>
                  </>
                  :
                  <>
                  </>
                }
              </>
            ))}
          </MenuList>
          <Icons>
            <IconButton color='inherit' aria-haspopup='true' >
              <Icon icon='fontisto:bell' style={{ fontSize: '1.3rem' }} />
            </IconButton>
            <IconButton color='inherit' aria-haspopup='true' onClick={handleSearchOpen}>
              <Icon icon='tabler:search' style={{ fontSize: '1.3rem' }} />
            </IconButton>
            <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
              <Icon fontSize='1.3rem' icon={settings.mode === 'dark' ? 'tabler:sun' : 'tabler:moon-stars'} />
            </IconButton>
          </Icons>
        </TopWrapper>
      </header>
      <PaddingTop />
    </>
  )
}
export default Header
