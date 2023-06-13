import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"
import Order1 from "src/views/app/order/demo-1"

const getDemo = (num, common) => {
  if (num == 1)
    return <Order1 {...common} />
}
const More = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [user, serUser] = useState({});
  const [dnsData, setDnsData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMoreContent();
  }, [])

  const getMoreContent = () => {
    let user_data = getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data);
    serUser(user_data);
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['options'] = JSON.parse(dns_data['options'] ?? "{}");
    setDnsData(dns_data);
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
              user: user,
              dnsData: dnsData
            },
            func: {
            }
          })}
        </>}
    </>
  )
}
More.getLayout = page => <AppLayout>{page}</AppLayout>
export default More
