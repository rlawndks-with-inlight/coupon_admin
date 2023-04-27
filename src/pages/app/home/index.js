import { useEffect, useState } from "react"
import AppLayout from "src/@core/layouts/AppLayout"
import { Wrapper } from "src/@core/layouts/components/app/style-component"
import Home1 from "./demo-1"
import { axiosIns } from "src/@fake-db/backend"
import { getLocation, processCatch } from "src/@core/utils/function"
import { useRouter } from "next/router"
import FallbackSpinner from "src/@core/components/spinner"
import { useTheme } from "@emotion/react"


const getDemo = (num, common) => {
  if (num == 1)
    return <Home1 {...common} />
}
const Home = () => {

  const router = useRouter();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    getHomeContent(1);
  }, [])

  const getHomeContent = async (pag) => {
    try {
      setPage(pag);
      setLoading(true);
      let location = await getLocation(true);
      const response = await axiosIns().get(`/api/v1/app/home?latitude=${location?.latitude}&longitude=${location?.longitude}&radius=100&page=${pag}&page_size=18`);
      setData(response?.data);
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
  }
  const onClickMembershipCategory = (num) => {
  }

  const onFilterClick = () => {
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
                onClickMembershipCategory,
                onFilterClick
              }
            })}
          </>}
      </Wrapper>
    </>
  )
}
Home.getLayout = page => <AppLayout>{page}</AppLayout>
export default Home
