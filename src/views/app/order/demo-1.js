import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ContentWrapper, Font1, Font2, Row, Wrapper, themeObj } from "src/@core/layouts/components/app/style-component";
import { isShowMenu } from "src/@core/layouts/utils";
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
const Order1 = (props) => {

  const { data, func: {
  } } = props;

  const router = useRouter();

  useEffect(() => {
  }, [])
  return (
    <>
      <Wrapper>
        <ContentWrapper>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default Order1
