import { Wrapper } from "src/@core/layouts/components/app/style-component";
import AppLayout from "src/@core/layouts/AppLayout";
import Header from "src/@core/layouts/components/app/header";
import BottomMenu from "src/@core/layouts/components/app/bottom-menu";

const MyCoupon = () => {
  return (
    <>
      <Header isGoBack={false} />
      <BottomMenu isGoBack={false} />
    </>
  )
}
MyCoupon.getLayout = page => <AppLayout>{page}</AppLayout>
export default MyCoupon;
