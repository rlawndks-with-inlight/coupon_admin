import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FallbackSpinner from "src/@core/components/spinner"
import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { ContentWrapper } from "src/@core/layouts/components/shopping-mall/style-component"
import { Wrapper } from "src/@core/layouts/components/shopping-mall/style-component"
import { processCatch } from "src/@core/utils/function"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { axiosIns } from "src/@fake-db/backend"
import { LOCALSTORAGE } from "src/data/data"
import Items from "src/views/components/shopping-mall/Items"

const ItemList1 = (props) => {
  const {
    data: {
      items
    },
    func: {

    } } = props;
  return (
    <>
      <ContentWrapper>
        <Items items={items} />
      </ContentWrapper>
    </>
  )
}
export default ItemList1;
