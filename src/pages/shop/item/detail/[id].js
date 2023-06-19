import { useTheme } from "@emotion/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FallbackSpinner from "src/@core/components/spinner"
import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { processCatch } from "src/@core/utils/function"
import { axiosIns } from "src/@fake-db/backend"
import ItemDetail1 from "src/views/shop/item/detail/id/demo-1"

const getDemo = (num, common) => {
  if (num == 1)
    return <ItemDetail1 {...common} />
}
const Detail = () => {

  const router = useRouter();
  const theme = useTheme();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItem();
  }, [])
  const getItem = async () => {
    setLoading(true);
    try {
      if (!router.query?.id) {
        router.push('/shop');
        return;
      }
      const response = await axiosIns().get(`api/v1/shop/items/${router.query?.id}`);
      setItem(response?.data);
      setLoading(false);
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
      {loading ?
        <>
          <FallbackSpinner sx={{ height: '85vh' }} second={0} />
        </>
        :
        <>
          {getDemo(1, {
            data: {
              item,
              theme
            },
            func: {
            }
          })}
        </>}
    </>
  )
}
Detail.getLayout = page => <ShoppingMallLayout>{page}</ShoppingMallLayout>

export default Detail
