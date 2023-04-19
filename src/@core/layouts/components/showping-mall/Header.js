import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import $ from 'jquery';
import { FormControl, Grid, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment'
import { Icon } from "@iconify/react";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { useTheme } from "@emotion/react";
import { axiosIns } from "src/@fake-db/backend";
import { toast } from "react-hot-toast";

const Wrapper = styled.header`
width:90%;
max-width:1000px;
margin:0 auto;
padding:1.5rem 0;
display:flex;
justify-content:space-between;
align-items:center;
`
const Logo = styled.img`
height:3rem;
cursor: pointer;
`
const MenuList = styled.div`
display: flex;
max-width: 300px;
width: 30%;
justify-content:space-between;
`
const Menu = styled.div`
cursor: pointer;
`

const Header = () => {
  const router = useRouter();
  const theme = useTheme();
  const [paddingTop, setPaddingTop] = useState(0);
  const [keyword, setKeyword] = useState('')
  const [dnsData, setDnsData] = useState({})
  const [userData, setUserData] = useState({})
  const [isShowCategoryList, setIsShowCategoryList] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getLocalStorageData();
    getCategoryList();
  }, [])
  useEffect(() => {
    setPaddingTop(`${$('.header-wrapper').outerHeight()}px`)
    console.log(router.asPath)
  }, [router.asPath])
  const getLocalStorageData = async () => {//로컬 스토리지 관련 데이터 불러오기
    let data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
    data = JSON.parse(data);
    setDnsData(data);
    let user = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user = JSON.parse(user);
    setUserData(user);
  }
  const getCategoryList = async () => {
    const response = await axiosIns().get(`/api/v1/manager/categories?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01`);
    if (response?.data?.content.length == 0) {
      toast.error("카테고리를 먼저 등록해 주세요.");
      router.back();
    }
    setCategoryList(response?.data?.content);
  }
  return (
    <>
      <header style={{ width: '100%', position: 'fixed', top: '0', display: 'flex', borderBottom: `1px solid ${theme.palette.grey[300]}` }} className="header-wrapper">
        <Wrapper>
          {dnsData?.logo_img ?
            <>
              <Logo src={dnsData?.logo_img} />
            </>
            :
            <>
              <div />
            </>}
          <TextField
            label='통합검색'
            id='size-small'
            size='small'
            sx={{ width: '350px' }}
          />
          <MenuList>
            <Menu>고객센터</Menu>
            <Menu>FAQ</Menu>
            <Menu>고객센터</Menu>
            {userData?.id ?
              <>
                <Menu>로그아웃</Menu>
              </>
              :
              <>
                <Menu>회원가입</Menu>
                <Menu>로그인</Menu>
              </>}
          </MenuList>
        </Wrapper>

      </header>
      <div style={{ paddingTop: paddingTop }} />
    </>
  )
}
export default Header
