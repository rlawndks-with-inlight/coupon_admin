import styled from 'styled-components'
import { LOCALSTORAGE, zBottomMenu } from 'src/data/data'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { Icon } from '@iconify/react'
import { themeObj } from '../style-component'
import { isShowMenu } from 'src/@core/layouts/utils'
import { isPc } from 'src/@core/utils/function'
import { toast } from 'react-hot-toast'
const Container = styled.div`
    position: fixed;
    right: 0;
    bottom: -1px;
    left: 0;
    z-index: 5;
    display:none;
    width:100%;
    max-width:1200px;
    margin: 0 auto;
    @media screen and (max-width:1200px) {
        display:flex;
    }
`
const MenuContainer = styled.nav`
width: 100%;
max-width: 76.8rem;
height: 3.5rem;
display: -webkit-flex;
display: flex;
margin: 0 auto;
justify-content:space-between;
`
const OneMenuContainer = styled.a`
    color: inherit;
    text-decoration: none;
    width: 50%;
    min-width: 20%;
    height: 100%;
    display: flex;
    flex-direction:column;
    padding: 0.3rem 0 0.2rem;
    position: relative;
    text-align: center;
    cursor:pointer;
    align-items:center;
    background:transparent;
`
const OneMenuName = styled.div`
font-weight: 400;
font-size:${themeObj.font_size.font4};
cursor:pointer;
margin-bottom:auto;
  @media screen and (max-width:330px) {
    font-size:0.7rem;
  }
`

const BottomMenu = (props) => {

  const { isGoBack } = props;

  const router = useRouter();
  const [colorList, setColorList] = useState([]);
  const [dnsData, setDnsData] = useState({});
  const theme = useTheme();
  const [menuIndex, setMenuIndex] = useState(0);
  const [menuContainerStyle, setMenuContainerStyle] = useState({});
  useEffect(() => {

  }, [])
  useEffect(() => {
    let color_list = [];
    let move_idx = -1;
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['theme_css'] = JSON.parse(dns_data['theme_css'] ?? "{}");
    dns_data['options'] = JSON.parse(dns_data['options'] ?? '{"app":{}}');
    let query_keys = Object.keys(router.query);
    if (query_keys.includes('dark_background_color')) {
      for (var i = 0; i < query_keys.length; i++) {
        if (router.query[query_keys[i]]) {
          dns_data['options']['app'][query_keys[i]] = router.query[query_keys[i]];
        }
      }
    } else {
    }
    setDnsData(dns_data);

    let menu_count = 0;
    for (var i = 0; i < zBottomMenu.length; i++) {
      if (zBottomMenu[i].link == router.asPath) {
        setMenuIndex(i)
      }
      if (isShowMenu(dns_data, zBottomMenu[i])) {
        menu_count++;
      }
    }
    if (menu_count == 1 || menu_count == 2) {
      setMenuContainerStyle({
        justifyContent: 'space-around'
      })
    }
    setColorList(color_list);
  }, [router.asPath])

  const getColor = (is_menu, mode) => {
    if (is_menu) {
      if (mode == 'dark') {
        return '#fff';
      } else {
        return '#000';
      }
    } else {
      if (mode == 'dark') {
        return themeObj.grey[500];
      } else {
        return themeObj.grey[500];
      }
    }
  }
  const goToLink = (item) => {
  }
  return (
    <>
      {isGoBack ?
        <>
        </>
        :
        <>
          <Container className='menu-container'
            style={{
              color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : '#000'}`,
              background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : '#fff'}`,
            }}>
            <MenuContainer style={menuContainerStyle}>
              {zBottomMenu.map((item, idx) => (<>
                {isShowMenu(dnsData, item) ?
                  <>
                    <OneMenuContainer
                      onClick={() => router.push(item.link)}
                      onTouchEnd={() => router.push(item.link)}
                      style={{
                        color: `${getColor(menuIndex == idx, theme.palette.mode)}`
                      }} key={idx}>
                      <Icon icon={item.icon} style={{ marginTop: 'auto', fontSize: '1.5rem', cursor: 'pointer' }} />
                      <OneMenuName>
                        {item.title}
                      </OneMenuName>
                    </OneMenuContainer>
                  </>
                  :
                  <>
                  </>}
              </>
              ))}
            </MenuContainer>
          </Container>
        </>}

    </>
  )
}

export default BottomMenu
