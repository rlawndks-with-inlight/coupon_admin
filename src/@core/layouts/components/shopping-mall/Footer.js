import { useTheme } from "@emotion/react"
import { getBackgroundColor } from "src/@core/utils/function"
import styled from "styled-components"

const Wrapper = styled.footer`
width:100%;
padding: 2rem 0 3rem 0;
`
const ContentWrapper = styled.div`
display:flex;
flex-direction:column;
width:90%;
max-width:1200px;
margin: 0 auto;
`
const Row = styled.div`
display:flex;
`
const Bold = styled.div`
font-weight:bold;
margin-right:0.5rem;
`
const marginRight = styled.div`
margin-right:0.5rem;
`
const Footer = () => {

  const theme = useTheme();

  return (
    <>
      <Wrapper style={{ background: `${theme.palette.mode == 'dark' ? '' : theme.palette.grey[200]}` }}>
        <ContentWrapper>
          <Row>
            <Bold style={{ marginRight: '1rem', cursor: 'pointer' }}>회사소개</Bold>
            <Bold style={{ marginRight: '1rem', cursor: 'pointer' }}>서비스이용약관</Bold>
            <Bold style={{ cursor: 'pointer' }}>개인정보처리방침</Bold>
          </Row>
          <Row>
            <Bold>회사명</Bold>
            <marginRight></marginRight>
            <Bold>주소</Bold>
            <marginRight></marginRight>
          </Row>
          <Row>
            <Bold>사업자 등록번호</Bold>
            <marginRight></marginRight>
            <Bold>대표</Bold>
            <marginRight></marginRight>
            <Bold>전화</Bold>
            <marginRight></marginRight>
            <Bold>팩스</Bold>
            <marginRight></marginRight>
          </Row>
          <Row>
            <Bold>개인정보 보호책임자</Bold>
            <marginRight></marginRight>
          </Row>
          <Row>
            <marginRight></marginRight>
          </Row>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default Footer
