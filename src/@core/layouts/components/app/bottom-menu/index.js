import styled from 'styled-components'
import { LOCALSTORAGE, zBottomMenu } from 'src/data/data'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@emotion/react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { Icon } from '@iconify/react'
import { themeObj } from '../style-component'
import { isShowMenu } from 'src/@core/layouts/utils'
const Container = styled.aside`
    position: fixed;
    right: 0;
    bottom: -1px;
    left: 0;
    z-index: 5;
    display:none;
    width:100%;
    max-width:1000px;
    margin: 0 auto;
    @media screen and (max-width:1200px) {
        display:flex;
    }
`
const MenuContainer = styled.nav`
width: 100%;
max-width: 76.8rem;
height: 4rem;
display: -webkit-flex;
display: flex;
margin: 0 auto;
justify-content:space-between;
`
const OneMenuContainer = styled.div`
    color: inherit;
    text-decoration: none;
    width: 20%;
    min-width: 20%;
    height: 100%;
    display: flex;
    flex-direction:column;
    padding: 0.3rem 0 0.2rem;
    position: relative;
    text-align: center;
    cursor:pointer;
    align-items:center;
`
const OneMenuName = styled.span`
font-weight:400;
font-size:${themeObj.font_size.font4};
margin-bottom:auto;

  @media screen and (max-width:330px) {
    font-size:0.7rem;
  }
`

const BottomMenu = () => {

  const router = useRouter();
  const [colorList, setColorList] = useState([]);
  const [dnsData, setDnsData] = useState({});
  const theme = useTheme();
  useEffect(() => {

  }, [])
  useEffect(() => {
    let color_list = [];
    let move_idx = -1;
    for (var i = 0; i < zBottomMenu.length; i++) {
      if (zBottomMenu[i].link == router.asPath) {
        move_idx = i;
        break;
      }
    }
    for (var i = 0; i < zBottomMenu.length; i++) {
      if (i == move_idx) {
        let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
        dns_data = JSON.parse(dns_data);
        dns_data['theme_css'] = JSON.parse(dns_data['theme_css']);
        dns_data['options'] = JSON.parse(dns_data['options']);
        setDnsData(dns_data);
        color_list.push(dns_data['theme_css']?.main_color)
      } else {
        if (theme.palette.mode == 'dark') {
          color_list.push(theme.palette.grey[300]);
        } else {
          color_list.push(theme.palette.grey[400]);
        }
      }
    }
    setColorList(color_list);
  }, [router.asPath])
  useEffect(() => {
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
  }, [])

  return (
    <>
      <Container className='menu-container'
        style={{
          background: `${theme.palette.mode == 'dark' ? '#222224' : '#fff'}`,
          color: `${theme.palette.mode == 'dark' ? '#fff' : '#000'}`,
        }}>
        <MenuContainer>
          {zBottomMenu.map((item, idx) => (
            <>
              {isShowMenu(dnsData, item) ?
                <>
                  <OneMenuContainer onClick={() => { router.push(item.link) }} style={{ color: `${colorList[idx]}` }} key={idx}>
                    <Icon icon={item.icon} style={{ marginTop: 'auto', fontSize: '1.5rem' }} />
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
    </>
  )
}

export default BottomMenu
