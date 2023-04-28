import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { Wrapper } from "src/@core/layouts/components/app/style-component"
import { axiosIns } from "src/@fake-db/backend"
import { getLocation, processCatch } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import More1 from "./demo-1"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"


const getDemo = (num, common) => {
  if (num == 1)
    return <More1 {...common} />
}
const More = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [user, serUser] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMoreContent();
  }, [])

  const getMoreContent = () => {
    let user_data = getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data);
    serUser(user_data);
  }

  return (
    <>
      <Wrapper
        style={{
          color: `${theme.palette.mode == 'dark' ? '#fff' : '#000'}`,
          background: `${theme.palette.mode == 'dark' ? '#000' : '#fff'}`,
        }}
      >
        {loading ?
          <>
            <FallbackSpinner sx={{ height: '300px' }} />
          </>
          :
          <>
            {getDemo(1, {
              data: data,
              func: {
              }
            })}
          </>}
      </Wrapper>
    </>
  )
}
More.getLayout = page => <AppLayout>{page}</AppLayout>
export default More