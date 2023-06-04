import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"
import Index1 from "src/views/app/auth/index/demo-1"

const getDemo = (num, common) => {
  if (num == 1)
    return <Index1 {...common} />
}
const Index = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [user, serUser] = useState({});
  const [dnsData, setDnsData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAuthContent();
  }, [])

  const getAuthContent = () => {
    let user_data = getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data);
    serUser(user_data);
    let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    dns_data['theme_css'] = JSON.parse(dns_data['theme_css'] ?? "{}");
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
              dnsData: dnsData,
              theme: theme
            },
            func: {
            }
          })}
        </>}
    </>
  )
}
Index.getLayout = page => <AppLayout>{page}</AppLayout>
export default Index
