import { ContentWrapper, Wrapper } from "src/@core/layouts/components/shopping-mall/style-component"
import ItemDetailCard from "src/views/components/shopping-mall/ItemDetailCard"
import styled from "styled-components"
const ItemContainer = styled.div`
display:flex;
flex-direction:column;
`
const ProductExplain = styled.div`
margin-top:2rem;
border-top: 1px solid ${props => props.theme.palette.grey[300]};
`

const ItemDetail1 = (props) => {
  const {
    data: {
      item,
      theme
    },
    func: {

    } } = props;
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <ItemContainer>
            <ItemDetailCard item={item} />
            <ProductExplain theme={theme}>
            </ProductExplain>
          </ItemContainer>
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default ItemDetail1;
