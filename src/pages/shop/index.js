import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { processCatch } from "src/@core/utils/function"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"
import { axiosIns } from "src/@fake-db/backend"
import { useSettings } from "src/@core/hooks/useSettings"
import FallbackSpinner from "src/@core/components/spinner"
import Home1 from "src/views/shop/home/demo-1"

const getDemo = (num, common) => {
  if (num == 1)
    return <Home1 {...common} />
}

const Home = () => {
  const {
    settings: { direction }
  } = useSettings()

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [ads, setAds] = useState([]);
  useEffect(() => {
    getHomeContent();
  }, [])
  const getHomeContent = async () => {
    try {
      setLoading(true);
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      const response = await axiosIns().get(`/api/v1/shop/items?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01&cate_id=0&brand_id=${dns_data?.id}&search=`);
      if (response?.data?.categories.length == 0) {
        toast.error("카테고리를 먼저 등록해 주세요.");
        router.back();
      }
      setAds(response?.data?.advertisements);
      setItems(response?.data?.content);
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
              ads,
              items
            },
            func: {

            }
          })}
        </>}

    </>
  )
}
Home.getLayout = page => <ShoppingMallLayout>{page}</ShoppingMallLayout>

export default Home
