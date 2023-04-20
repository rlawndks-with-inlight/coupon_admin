import { useTheme } from "@emotion/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { ContentWrapper, Wrapper } from "src/@core/layouts/components/shopping-mall/style-component"
import { processCatch } from "src/@core/utils/function"
import { axiosIns } from "src/@fake-db/backend"
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
const Detail = () => {

  const router = useRouter();
  const theme = useTheme();
  const [item, setItem] = useState({});

  useEffect(() => {
    getItem();
  }, [])
  const getItem = async () => {
    try {
      if (!router.query?.id) {
        router.push('/shop');
        return;
      }
      const response = await axiosIns().get(`api/v1/manager/products/${router.query?.id}`);
      setItem(response?.data);
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }
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
Detail.getLayout = page => <ShoppingMallLayout>{page}</ShoppingMallLayout>

export default Detail
