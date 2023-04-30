import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { Wrapper } from "src/@core/layouts/components/app/style-component"
import { axiosIns } from "src/@fake-db/backend"
import { getLocation, processCatch } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"
import Merchandise1 from "./demo-1"


const getDemo = (num, common) => {
  if (num == 1)
    return <Merchandise1 {...common} />
}
const Merchandise = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMerchandise();
  }, [])

  const getMerchandise = async () => {

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
            data: data,
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
