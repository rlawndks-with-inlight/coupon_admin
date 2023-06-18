import AppLayout from "src/@core/layouts/AppLayout";
import BottomMenu from "src/@core/layouts/components/app/bottom-menu";
import Header from "src/@core/layouts/components/app/header";
import { Wrapper } from "src/@core/layouts/components/app/style-component";

const Gift = () => {
  return (
    <>
      <Header isGoBack={false} />
      <BottomMenu isGoBack={false} />
    </>
  )
}
Gift.getLayout = page => <AppLayout>{page}</AppLayout>
export default Gift;
