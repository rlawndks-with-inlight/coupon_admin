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
import { getBackgroundColor, isPc, processCatch } from "src/@core/utils/function";
import { useSettings } from "src/@core/hooks/useSettings";
import DialogSearchMobile from "./DialogSearchMobile";
import { isShowMenu } from "src/@core/layouts/utils";
import { onPostWebview } from "src/@core/utils/webview-connect";
import { themeObj } from "../style-component";

const TopWrapper = styled.div`
width:90%;
max-width:1200px;
margin:0 auto;
padding:1.5rem 0;
display:flex;
justify-content:space-between;
align-items:center;
height: 5rem;
@media (max-width: 1200px) {
  height: 3.5rem;
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
  padding-top:3.5rem;
}

`
const Header = (props) => {

  const { isGoBack } = props;
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
  const handleModeToggle = async (is_true) => {
    let mode = '';
    if (is_true) {
      if (settings.mode === 'light') {
        mode = 'dark';
      } else {
        mode = 'light';
      }
      onPostWebview('mode', {
        mode: mode,
        backgroundColor: `${mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : ''}`,
      })
      handleModeChange(mode);
    }
  }
  const getCategoryList = async () => {
    try {
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      dns_data['options'] = JSON.parse(dns_data['options'] ?? '{"app":{}}');

      let query_keys = Object.keys(router.query);
      if (router.query['dark_background_color']) {
        for (var i = 0; i < query_keys.length; i++) {
          dns_data['options']['app'][query_keys[i]] = router.query[query_keys[i]];
        }
      }
      setDnsData(dns_data);
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
  const handleSearchOpen = (is_true) => {
    console.log(is_true)
    if (is_true) {
      setSearchOpen(true)
    }
  };

  const MenuContent = () => {
    return <>
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
                {isShowMenu(dnsData, item) ?
                  <>
                    <Menu theme={theme} onClick={() => {
                      router.push(item.link)
                    }}
                    >{item.title}</Menu>
                  </>
                  :
                  <>
                  </>}
              </>
              :
              <>
              </>
            }
          </>
        ))}
      </MenuList>

    </>
  }
  return (
    <>
      <DialogSearchMobile
        open={searchOpen}
        handleClose={handleSearchClose}
        style={{
          color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : '#000'}`,
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : '#fff'}`,
        }}
      />
      <header style={{
        width: '100%',
        position: 'fixed',
        top: '0',
        display: `flex`,
        flexDirection: 'column',
        zIndex: '10',
        color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : '#000'}`,
        background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : '#fff'}`,
      }} className="header-wrapper">
        <TopWrapper>
          {window.innerWidth > 1200 || !isGoBack ?
            <>
              <MenuContent />
              <Icons>
                <IconButton color='inherit' aria-haspopup='true'>
                  <Icon icon='fontisto:bell' style={{ fontSize: '1.3rem' }} />
                </IconButton>
                <IconButton
                  color='inherit'
                  aria-haspopup='true'
                  className="pointer"
                  onClick={() => handleSearchOpen(isPc())}
                  onTouchEnd={() => handleSearchOpen(!isPc())}>
                  <Icon icon='tabler:search' style={{ fontSize: '1.3rem' }} />
                </IconButton>
                <IconButton
                  color='inherit'
                  aria-haspopup='true'
                  className="pointer"
                  onClick={() => handleModeToggle(isPc())}
                  onTouchEnd={() => handleModeToggle(!isPc())}>
                  <Icon fontSize='1.3rem' icon={settings.mode === 'dark' ? 'tabler:sun' : 'tabler:moon-stars'} />
                </IconButton>
              </Icons>
            </>
            :
            <>
              <IconButton color='inherit' style={{
                transform: 'translateX(-0.5rem)',
                color: `${settings.mode === 'dark' ? '#fff' : themeObj.grey[500]}`
              }} aria-haspopup='true' onClick={() => {
                router.back();
              }}>
                <Icon fontSize='1.3rem' icon={'ic:round-arrow-back-ios'} />
              </IconButton>
              <div />
            </>}
        </TopWrapper>
      </header >
      <PaddingTop />
    </>
  )
}
export default Header
