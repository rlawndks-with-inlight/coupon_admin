import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContentWrapper, Font1, Font2, Row, themeObj } from "src/@core/layouts/components/app/style-component";
import { isShowMenu } from "src/@core/layouts/utils";
import { handleLogout } from "src/@core/utils/function";
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

  const { data, func: {
  } } = props;

  const router = useRouter();

  useEffect(() => {
    console.log(data)
  }, [])
  return (
    <>
      <ContentWrapper>
        <Row style={{ color: themeObj.grey[700] }}>
          <Font2 style={{ paddingRight: '0.25rem', borderRight: `1px solid ${themeObj.grey[400]}`, cursor: 'pointer' }}
            onClick={() => {

            }}>계정설정</Font2>
          <Font2 style={{ paddingLeft: '0.25rem', cursor: 'pointer' }}
            onClick={() => {

            }}
          >고객센터</Font2>
        </Row>
        <Font1 style={{ fontWeight: 'bold', margin: '0.75rem 0' }}>{data?.user?.user_name} 님</Font1>
        <Menu onClick={() => {
        }}
        >
          <Icon icon='material-symbols:settings-outline' style={{ fontSize: themeObj.font_size.font1 }} />
          <MenuTitle>계정설정</MenuTitle>
        </Menu>
        {zBottomMenu.map((item, idx) => (
          <>
            {idx != 0 ?
              <>
                {isShowMenu(data?.dnsData, item) ?
                  <>
                    <Menu onClick={() => {
                      router.push(item.link)
                    }}
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
        <Menu onClick={() => router.push('/app/auth/privacy?type=0')}
        >
          <Icon icon='iconoir:privacy-policy' style={{ fontSize: themeObj.font_size.font1 }} />
          <MenuTitle>이용약관</MenuTitle>
        </Menu>
        <Menu onClick={() => router.push('/app/auth/privacy?type=1')}
        >
          <Icon icon='ic:outline-privacy-tip' style={{ fontSize: themeObj.font_size.font1 }} />
          <MenuTitle>개인정보처리방침</MenuTitle>
        </Menu>
        <Menu onClick={() => router.push('/app/auth/privacy?type=2')}
        >
          <Icon icon='icon-park-outline:personal-privacy' style={{ fontSize: themeObj.font_size.font1 }} />
          <MenuTitle>저작권정책</MenuTitle>
        </Menu>
        <Menu onClick={() => handleLogout(router, '/app/login')}
        >
          <Icon icon='ri:logout-circle-r-line' style={{ fontSize: themeObj.font_size.font1 }} />
          <MenuTitle>로그아웃</MenuTitle>
        </Menu>
      </ContentWrapper>
    </>
  )
}
export default More1
