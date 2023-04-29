import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { commarNumber } from "src/@core/utils/function";
import styled from "styled-components";

const ItemContent = styled.div`
width:100%;
display:flex;
align-items:flex-start;
@media (max-width: 900px) {
  flex-direction: column;
}
`
const ProductImgContainer = styled.div`
width:50%;
display:flex;
padding-top:2rem;
@media (max-width: 900px) {
  width:100%;
  padding-top:0rem;
}
`
const ProductImg = styled.img`
margin:auto;
width:300px;
height:auto;
@media (max-width: 900px) {
  width:80%;
}
`
const ExampleContainer = styled.div`
width:50%;
padding-top:1.1rem;
@media (max-width: 900px) {
  width:100%;
}
`
const Name = styled.div`
font-weight:bold;
font-size:${props => props.theme.palette.font_size.font1};
border-bottom: 1px solid ${props => props.theme.palette.grey[300]};
`
const PriceContainer = styled.div`
border-bottom: 1px solid ${props => props.theme.palette.grey[300]};
padding:2rem 0;
font-size:${props => props.theme.palette.font_size.font3};
`

const KeyContent = styled.div`
width: 100px;
`
const Row = styled.div`
display: flex;
margin:0.5rem 0;
`
const ItemDetailCard = (props) => {
  const { item } = props;

  const theme = useTheme();
  return (
    <>
      <ItemContent>
        <ProductImgContainer>
          <ProductImg src={item?.product_img} />
        </ProductImgContainer>
        <ExampleContainer>
          <Name theme={theme}>{item.name}</Name>
          <PriceContainer theme={theme}>
            <Row>
              <KeyContent>시중가격</KeyContent>
              <div>{commarNumber(item?.mkt_pr)}원</div>
            </Row>
            <Row style={{ fontWeight: 'bold' }}>
              <KeyContent>판매가격</KeyContent>
              <div>{commarNumber(item?.item_pr)}원</div>
            </Row>
          </PriceContainer>
          <PriceContainer theme={theme}>
            <Row>
              <KeyContent>제조사</KeyContent>
              <div>{item?.mfg_nm}</div>
            </Row>
            <Row>
              <KeyContent>원산지</KeyContent>
              <div>{item?.origin_nm}</div>
            </Row>
            <Row>
              <KeyContent>브랜드</KeyContent>
              <div>{item?.brand_nm}</div>
            </Row>
            <Row>
              <KeyContent>모델</KeyContent>
              <div>{item?.model_nm}</div>
            </Row>
            <Row>
              <KeyContent>배송비결제</KeyContent>
              <div>주문시 결제</div>
            </Row>
          </PriceContainer>
          <PriceContainer theme={theme} style={{ borderBottom: 'none' }}>
            <Row style={{ justifyContent: 'space-between', fontWeight: 'bold' }}>
              <div>총 금액 :</div>
              <div style={{
                fontSize: theme.palette.font_size.font2
              }}>{commarNumber(item?.item_pr)}원</div>
            </Row>
          </PriceContainer>
          <Row>
            <Button type='submit' variant='contained' sx={{ mr: 2, ml: 'auto', width: '190px', height: '50px' }} >
              바로구매
            </Button>
            <Button type='submit' variant='outlined' sx={{ width: '190px', height: '50px' }}>
              장바구니
            </Button>
          </Row>

        </ExampleContainer>
      </ItemContent>
    </>
  )
}
export default ItemDetailCard
