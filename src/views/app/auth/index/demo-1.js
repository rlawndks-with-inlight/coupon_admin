import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DialogResign from "src/@core/layouts/components/app/DialogResign";
import { ContentWrapper, Font1, Font2, Row, Wrapper, themeObj } from "src/@core/layouts/components/app/style-component";
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
const Index1 = (props) => {

  const { data: {
    user,
    dnsData,
    theme
  }, func: {
  } } = props;

  const router = useRouter();

  useEffect(() => {
  }, [])

  const [resignOpen, setResignOpen] = useState(false);
  const [resignCategory, setResignCategory] = useState('point')
  const handleResignClose = (is_true) => {
    if (is_true) {
      setResignOpen(false)
    }
  };
  const handleResignOpen = (is_true) => {
    if (is_true) {
      setResignOpen(true)
    }
  };

  return (
    <>
      <DialogResign
        open={resignOpen}
        handleClose={handleResignClose}
        dnsData={dnsData}
        router={router}
        style={{
          color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : ''}`,
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : ''}`,
        }}
      />
      <Wrapper dns_data={dnsData}>
        <ContentWrapper>
          <Font1 style={{ fontWeight: 'bold', margin: '0.75rem 0' }}>계정설정</Font1>
          <Menu
            className="pointer"
            onClick={() => {
              handleResignOpen(true);
            }}
          >
            <Icon icon='material-symbols:cancel-outline' style={{ fontSize: themeObj.font_size.font1 }} />
            <MenuTitle>회원탈퇴</MenuTitle>
          </Menu>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default Index1
