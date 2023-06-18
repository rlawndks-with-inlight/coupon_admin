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
import _ from 'lodash'

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
    point_history: [],
    coupons: [],
  })
  const [couponHistory, setCouponHistory] = useState([]);
  const [dnsData, setDnsData] = useState({});
  useEffect(() => {
    setLoading(true);
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options'] ?? "{}");
    setDnsData(dns_data)
    let mcht = JSON.parse(router.query?.item);
    setMcht(mcht)
    let membership_obj = getLocalStorage(LOCALSTORAGE.USER_APP_MEMBERSHIP_OBJ);
    if (typeof membership_obj == 'string') {
      membership_obj = JSON.parse(membership_obj)
    }
    let z_coupon = [];
    let z_stamp = [];
    let z_point = [];
    if (mcht?.mbr_type == 0) {//특정가맹점
      z_point = membership_obj?.points?.mchts[mcht?.id] ?? []
      z_stamp = membership_obj?.stamps?.mchts[mcht?.id] ?? []
    } else if (mcht?.mbr_type == 1) {//모든 가맹점
      z_point = membership_obj?.points?.brands[mcht?.brand_id] ?? []
      z_stamp = membership_obj?.stamps?.brands[mcht?.brand_id] ?? []
    }
    z_coupon = [...membership_obj?.coupons?.brands[mcht?.brand_id] ?? [], ...membership_obj?.coupons?.mchts[mcht?.id] ?? []]


    let point_history = [...z_point];
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
    setHistory({
      stamps: z_stamp,
      points: z_point,
      coupons: z_coupon,
      point_history: point_results
    });
    setLoading(false);
  }, [])

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
          loading,
          couponHistory
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
