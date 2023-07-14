import { useRouter } from "next/router"
import { useEffect } from "react"
import BlankLayout from "src/@core/layouts/BlankLayout"
import NaverMap from 'src/@core/layouts/components/app/NaverMap';

const Map = (props) => {
  const router = useRouter();
  return (
    <>
      <NaverMap
        center={{
          lat: router.query?.lat,
          lng: router.query?.lng,
        }}
        markers={[
          { lat: router.query?.lat, lng: router.query?.lng, }
        ]}
        dnsData={JSON.parse(router.query?.dns_data)}
      />
    </>
  )
}
Map.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Map
