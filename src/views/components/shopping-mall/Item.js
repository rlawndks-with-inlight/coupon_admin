import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { commarNumber } from "src/@core/utils/function";
import styled from "styled-components";

const Wrapper = styled.div`
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    width:285px;
    cursor: pointer;
    @media (max-width: 1350px) {
      width:31%;
    }
    @media (max-width: 1000px) {
      width:47%;
    }
    @media (max-width: 650px) {
      width:100%;
    }
`
const Name = styled.div`
font-weight: bold;
font-size:${props => props.theme.palette.font_size.font2};

`
const Price = styled.div`
font-size:${props => props.theme.palette.font_size.font2};
`
const Item = (props) => {

  const { item } = props;

  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <Wrapper

        onClick={() => {
          router.push(`/shop/item/detail?id=${item?.id}`)
        }}
      >
        <LazyLoadImage src={item?.product_img}
          className="item-img"
        />
        <Name theme={theme}>{item.name}</Name>
        <Price theme={theme}>{commarNumber(item.item_pr)} 원</Price>
      </Wrapper>
    </>
  )
}
export default Item;
