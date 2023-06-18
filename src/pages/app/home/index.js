import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import Home1 from "src/views/app/home/demo-1"
import { axiosIns } from "src/@fake-db/backend"
import { getLocation, processCatch } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import { useRef } from "react"
import { getLocalStorage, setLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"
import { onPostWebview } from "src/@core/utils/webview-connect"
import BlankLayout from "src/@core/layouts/BlankLayout"
import Header from "src/@core/layouts/components/app/header"
import BottomMenu from "src/@core/layouts/components/app/bottom-menu"


const getDemo = (num, common) => {
  if (num == 1)
    return <Home1 {...common} />
}

const Home = (props) => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [totalContent, setTotalContent] = useState({})
  const [mchts, setMchts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageStack, setPageStack] = useState([]);
  const [dnsData, setDnsData] = useState({});
  const [isDataEnd, setIsDataEnd] = useState(false);
  const [location, setLocation] = useState({});
  const [mchtCoupons, setMcthCoupons] = useState({});
  const [membershipObj, setMembershipObj] = useState({});
  const PAGE_SIZE = 10;
  useEffect(() => {
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options'] ?? '{"app":{}}');
    let query_keys = Object.keys(router.query);
    for (var i = 0; i < query_keys.length; i++) {
      dns_data['options']['app'][query_keys[i]] = router.query[query_keys[i]];
    }
    setDnsData(dns_data)
    getTotalContent(dns_data)
    getLocate(dns_data)
    const onMessageHandler = async (e) => {
      const event = JSON.parse(e.data)
      if (event.method == 'get_location') {
        let location_ = event?.data;
        setLocation(location_);
        getHomeContent(1, true, dns_data, location_)
      }
    }
    const isUIWebView = () => {
      return navigator.userAgent
        .toLowerCase()
        .match(/\(ip.*applewebkit(?!.*(version|crios))/)
    }
    const receiver = isUIWebView() ? window : document
    receiver.addEventListener('message', onMessageHandler)
    return () => {
      receiver.removeEventListener('message', onMessageHandler)
    }
  }, [])
  const getTotalContent = async (dns_data) => {
    try {
      setLoading(true);
      const response = await axiosIns().get(`/api/v1/app/total-content?brand_id=${dns_data?.id}`);

      //coupon 계산


      let z_membership_category = ['coupons', 'points', 'stamps']
      let membership_obj = {
      }
      for (var i = 0; i < z_membership_category.length; i++) {
        let membership = z_membership_category[i];
        membership_obj[membership] = {
          brands: {
          },
          mchts: {
          }
        };
        let z_all_spot = response?.data[membership]?.all_spot;
        let z_spec_spot = response?.data[membership]?.spec_spot;
        for (var j = 0; j < z_all_spot.length; j++) {
          if (!membership_obj[membership].brands[z_all_spot[j]?.brand_id]) {
            membership_obj[membership].brands[z_all_spot[j]?.brand_id] = [];
          }
          membership_obj[membership].brands[z_all_spot[j]?.brand_id].push(z_all_spot[j]);
        }
        for (var j = 0; j < z_spec_spot.length; j++) {
          if (z_spec_spot[j]?.mcht_id >= 0) {
            if (!membership_obj[membership].mchts[z_spec_spot[j]?.mcht_id]) {
              membership_obj[membership].mchts[z_spec_spot[j]?.mcht_id] = [];
            }
            membership_obj[membership].mchts[z_spec_spot[j]?.mcht_id].push(z_spec_spot[j]);
          } else {
            let use_mcths = z_spec_spot[j]?.mchts ?? [];
            for (var k = 0; k < use_mcths.length; k++) {
              if (!membership_obj[membership].mchts[use_mcths[k]?.id]) {
                membership_obj[membership].mchts[use_mcths[k]?.id] = [];
              }
              membership_obj[membership].mchts[use_mcths[k]?.id].push(z_spec_spot[j]);
            }
          }
        }
      }
      setMembershipObj(membership_obj);
      setLocalStorage(LOCALSTORAGE.USER_APP_MEMBERSHIP_OBJ, JSON.stringify(membership_obj));
      setTotalContent(response?.data);
    } catch (err) {
      console.log(err)
    }
  }
  const getLocate = async (dns_data) => {
    if (window.ReactNativeWebView) {
      onPostWebview('get_location')
    } else {
      let location_ = await getLocation(true);
      setLocation(location_)
      getHomeContent(1, true, dns_data, location_)
    }
  }
  const getHomeContent = async (pag, is_first, dns_data_, location, options) => {
    try {
      let dns_data = dns_data_;
      if (pageStack.includes(pag)) {
        return;
      }
      if ((pag) * PAGE_SIZE > data?.total) {
        setIsDataEnd(true);
        return;
      }
      let page_stack = pageStack;
      page_stack.push(pag);
      setPageStack(page_stack)
      setPage(pag);
      if (is_first) {
        setLoading(true);
      }
      const response = await axiosIns().get(`/api/v1/app/home?latitude=${location?.latitude}&longitude=${location?.longitude}&radius=100&page=${pag}&page_size=${PAGE_SIZE}&brand_id=${dnsData?.id || dns_data?.id}`);
      if (is_first) {
        setData(response?.data);
        setMchts(response?.data?.content);
      } else {
        setMchts(prePost => [...prePost, ...response?.data?.content]);
      }
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
    return;
  }
  const onClickMembershipCategory = (num) => {
  }
  const onFilterClick = () => {
  }
  return (
    <>
      <Header isGoBack={false} />
      <BottomMenu isGoBack={false} />
      {loading ?
        <>
          <FallbackSpinner sx={{ height: '85vh' }} second={0} />
        </>
        :
        <>
          {getDemo(1, {
            data: {
              data: data,
              mchts: mchts,
              page: page,
              dnsData: dnsData,
              isDataEnd: isDataEnd,
              totalContent, totalContent,
              location: location,
              membershipObj,
            },
            func: {
              onClickMembershipCategory,
              onFilterClick,
              router,
              getHomeContent,
              setPage
            }
          })}
        </>}
    </>
  )
}
Home.getLayout = page => <AppLayout>{page}</AppLayout>
export default Home
