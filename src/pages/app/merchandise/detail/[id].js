import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { axiosIns } from "src/@fake-db/backend"
import { getLocation, objToQuery, processCatch } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import Merchandise1 from "./demo-1"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"


const getDemo = (num, common) => {
  if (num == 1)
    return <Merchandise1 {...common} />
}
const Merchandise = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [mcht, setMcht] = useState({});
  const [history, setHistory] = useState({
    stamps: [],
    points: [],
    coupons: [],
  })
  const [dnsData, setDnsData] = useState({});
  useEffect(() => {
    setLoading(true);
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options'] ?? "{}");
    dns_data['theme_css'] = JSON.parse(dns_data['theme_css'] ?? "{}");
    setDnsData(dns_data)
    setMcht(JSON.parse(router.query?.item))
    getMerchandiseHistory(dns_data, JSON.parse(router.query?.item))
  }, [])

  const getMerchandiseHistory = async (dns_data, mcht) => {
    try {
      let obj = {
        mcht_id: router.query?.id,
        brand_id: dns_data?.id,
        mbr_type: mcht?.mbr_type,
        point_flag: (mcht?.point_flag == 1 && mcht?.count?.point > 0) ? 1 : 0,
        stamp_flag: (mcht?.stamp_flag == 1 && mcht?.count?.stamp > 0) ? 1 : 0,
        coupon_flag: mcht?.count?.coupon > 0 ? 1 : 0,
      }
      let query = objToQuery(obj);
      const response = await axiosIns().get(`/api/v1/app/membership${query}`);
      setHistory(Object.assign(history, response?.data))

      setLoading(false);
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {loading ?
        <>
          <FallbackSpinner sx={{ height: '85vh' }} />
        </>
        :
        <>
          {getDemo(1, {
            data: {
              data,
              mcht,
              dnsData,
              theme,
              history
            },
            func: {
              router
            }
          })}
        </>}
    </>
  )
}
Merchandise.getLayout = page => <AppLayout>{page}</AppLayout>
export default Merchandise
