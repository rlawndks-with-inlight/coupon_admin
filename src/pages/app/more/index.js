import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import More1 from "src/views/app/more/demo-1"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"
import Header from "src/@core/layouts/components/app/header"
import BottomMenu from "src/@core/layouts/components/app/bottom-menu"
import { useSettings } from "src/@core/hooks/useSettings"


const getDemo = (num, common) => {
  if (num == 1)
    return <More1 {...common} />
}
const Order = () => {

  const { settings } = useSettings();
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
    let dns_data = settings.dnsData;
    setDnsData(dns_data);
  }

  return (
    <>
      <Header isGoBack={false} />
      <BottomMenu isGoBack={false} />
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
Order.getLayout = page => <AppLayout>{page}</AppLayout>
export default Order
