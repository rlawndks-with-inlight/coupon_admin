import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FallbackSpinner from "src/@core/components/spinner"
import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { processCatch } from "src/@core/utils/function"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { axiosIns } from "src/@fake-db/backend"
import { LOCALSTORAGE } from "src/data/data"
import ItemList1 from "src/views/shop/item/list/demo-1"

const getDemo = (num, common) => {
  if (num == 1)
    return <ItemList1 {...common} />
}

const List = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItemList();
  }, [router.query])
  const getItemList = async () => {
    try {
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      let keyword = router.query?.keyword ?? "";
      let cate_id = router.query?.cate_id ?? 0;
      const response = await axiosIns().get(`/api/v1/shop/items?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01&cate_id=${cate_id}&brand_id=${dns_data?.id}&search=${keyword}`);
      if (response?.data?.categories.length == 0) {
        toast.error("카테고리를 먼저 등록해 주세요.");
        router.back();
      }
      setItems(response?.data?.content);
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
              items
            },
            func: {
            }
          })}
        </>}
    </>
  )
}
List.getLayout = page => <ShoppingMallLayout>{page}</ShoppingMallLayout>

export default List
