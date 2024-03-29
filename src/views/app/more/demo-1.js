import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContentWrapper, Font1, Font2, Row, Wrapper, themeObj } from "src/@core/layouts/components/app/style-component";
import { isShowMenu } from "src/@core/layouts/utils";
import { handleLogout, isPc } from "src/@core/utils/function";
import { zBottomMenu } from "src/data/data";
import styled from "styled-components";

const Menu = styled.div`
display: flex;
border-bottom: 1px solid ${themeObj.grey[300]};
padding: 0.75rem 0;
align-items:center;
cursor:pointer;
`
const MenuTitle = styled.div`
margin-left: 0.5rem;
font-size:${themeObj.font_size.font2};
`
const More1 = (props) => {

  const { data: {
    user,
    dnsData,
  }, func: {
  } } = props;

  const router = useRouter();

  useEffect(() => {
  }, [])

  const goToLink = (link, is_true) => {
    if (is_true) {
      router.push(link)
    }
  }
  const onLogout = (is_true) => {
    if (is_true) {
      handleLogout(router, '/app/login')
    }
  }
  return (
    <>
      <Wrapper dns_data={dnsData}>
        <ContentWrapper>
          <Font1 style={{ fontWeight: 'bold', margin: '0.75rem 0' }}>{user?.user_name || user?.phone_num} 님</Font1>
          <Menu onClick={() => goToLink('/app/auth/', true)}
          >
            <Icon icon='material-symbols:settings-outline' style={{ fontSize: themeObj.font_size.font1 }} />
            <MenuTitle>계정설정</MenuTitle>
          </Menu>
          {zBottomMenu.map((item, idx) => (
            <>
              {idx != 0 && item?.link != '/app/more/' ?
                <>
                  {isShowMenu(dnsData, item) ?
                    <>
                      <Menu
                        onClick={() => goToLink(item.link, true)}
                      >
                        <Icon icon={item.icon} style={{ fontSize: themeObj.font_size.font1 }} />
                        <MenuTitle>{item.title}</MenuTitle>
                      </Menu>
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
          <Menu
            onClick={() => goToLink('/app/auth/privacy?type=0', true)}
          >
            <Icon icon='icon-park-outline:message-privacy' style={{ fontSize: themeObj.font_size.font1, fontWeight: 'bold' }} />
            <MenuTitle>이용약관</MenuTitle>
          </Menu>
          <Menu onClick={() => goToLink('/app/auth/privacy?type=1', true)}
          >
            <Icon icon='ic:outline-privacy-tip' style={{ fontSize: themeObj.font_size.font1 }} />
            <MenuTitle>개인정보처리방침</MenuTitle>
          </Menu>
          <Menu onClick={() => goToLink('/app/auth/privacy?type=2', true)}
          >
            <Icon icon='icon-park-outline:personal-privacy' style={{ fontSize: themeObj.font_size.font1 }} />
            <MenuTitle>저작권정책</MenuTitle>
          </Menu>
          {/* <Menu onClick={() => { }}
            onTouchEnd={() => { }}>
            <Icon icon='mdi:customer-service' style={{ fontSize: themeObj.font_size.font1 }} />
            <MenuTitle>고객센터</MenuTitle>
          </Menu> */}
          <Menu
            onClick={() => onLogout(true)}
          >
            <Icon icon='ri:logout-circle-r-line' style={{ fontSize: themeObj.font_size.font1 }} />
            <MenuTitle>로그아웃</MenuTitle>
          </Menu>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default More1
