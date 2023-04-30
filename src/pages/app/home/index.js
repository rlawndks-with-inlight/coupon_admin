import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { Wrapper } from "src/@core/layouts/components/app/style-component"
import Home1 from "./demo-1"
import { axiosIns } from "src/@fake-db/backend"
import { getLocation, processCatch } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import { useRef } from "react"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"


const getDemo = (num, common) => {
  if (num == 1)
    return <Home1 {...common} />
}

const Home = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [mchts, setMchts] = useState([]);
  const [page, setPage] = useState(1);
  const [mchtLoading, setMchtLoading] = useState(false);
  const [pageStack, setPageStack] = useState([]);
  const [dnsData, setDnsData] = useState({});
  const PAGE_SIZE = 10;
  useEffect(() => {
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options']);
    dns_data['theme_css'] = JSON.parse(dns_data['theme_css']);
    setDnsData(dns_data)
    getHomeContent(1, true)
  }, [])

  const getHomeContent = async (pag, is_first) => {
    try {

      if (pageStack.includes(pag)) {
        return;
      }
      let page_stack = pageStack;
      page_stack.push(pag);
      setPageStack(page_stack)
      setPage(pag);
      if (is_first) {
        setLoading(true);
      } else {
        setMchtLoading(true);
      }
      let location = await getLocation(true);
      const response = await axiosIns().get(`/api/v1/app/home?latitude=${location?.latitude}&longitude=${location?.longitude}&radius=100&page=${pag}&page_size=${PAGE_SIZE}`);
      if (is_first) {
        setData(response?.data);
        setMchts(response?.data?.mchts?.content);
      } else {
        setMchts(prePost => [...prePost, ...response?.data?.mchts?.content]);
      }
      setLoading(false);
      setMchtLoading(false);
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
      {loading ?
        <>
          <FallbackSpinner sx={{ height: '300px' }} />
        </>
        :
        <>
          {getDemo(1, {
            data: {
              data: data,
              mchtLoading: mchtLoading,
              mchts: mchts,
              page: page,
              dnsData: dnsData
            },
            func: {
              onClickMembershipCategory,
              onFilterClick,
              router,
              getHomeContent
            }
          })}
        </>}
    </>
  )
}
Home.getLayout = page => <AppLayout>{page}</AppLayout>
export default Home
