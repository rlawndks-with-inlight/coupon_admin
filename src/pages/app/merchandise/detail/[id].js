import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { axiosIns } from "src/@fake-db/backend"
import { objToQuery } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import Merchandise1 from "src/views/app/merchandise/detail/demo-1"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"


const getDemo = (num, common) => {
  if (num == 1)
    return <Merchandise1 {...common} />
}
const Merchandise = (props) => {
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
      setLoading(false);
      let point_history = [...response?.data?.points ?? []];
      let point_results = [];
      let sum_point = 0;
      for (var i = point_history.length - 1; i >= 0; i--) {//1->적립, -1->사용
        if (point_history[i]?.save_amount > 0) {
          sum_point += point_history[i]?.save_amount;
          point_results.push({
            ...point_history[i],
            sum_point: sum_point,
            type: 1,
            point: point_history[i]?.save_amount
          })
        }
        if (point_history[i]?.use_amount > 0) {
          sum_point -= point_history[i]?.use_amount;
          point_results.push({
            ...point_history[i],
            sum_point: sum_point,
            type: -1,
            point: point_history[i]?.use_amount
          })
        }
      }
      point_results = point_results.reverse();
      let result_data = Object.assign(history, Object.assign(response?.data, { points: point_results }))
      setHistory(result_data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {loading ?
        <>
          <FallbackSpinner sx={{ height: '85vh' }} second={500} />
        </>
        :
        <>
        </>}
      {getDemo(1, {
        data: {
          data,
          mcht,
          dnsData,
          theme,
          history,
          loading
        },
        func: {
          router,
        }
      })}
    </>
  )
}
Merchandise.getLayout = page => <AppLayout>{page}</AppLayout>
export default Merchandise
