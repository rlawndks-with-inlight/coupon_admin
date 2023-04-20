import styled from "styled-components";
import Item from "./Item";

const ItemsContainer = styled.div`
display:flex;
flex-wrap:wrap;
column-gap: 20px;
grid-row-gap: 40px;
row-gap: 40px;
width:100%;
@media (max-width: 1350px) {
  column-gap: 3%;
}
@media (max-width: 1000px) {
  column-gap: 6%;
}
@media (max-width: 650px) {
  column-gap: 0;
}
`
const Items = (props) => {
  const { items } = props;
  return (
    <>
      <ItemsContainer>
        {items && items.map((item, idx) => {
          return <Item item={item} />
        })}
      </ItemsContainer>
    </>
  )
}
export default Items;
