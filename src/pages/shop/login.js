import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { Wrapper } from "src/@core/layouts/components/shopping-mall/style-component"

const Login = () => {
  return (
    <>
      <Wrapper>

      </Wrapper>
    </>
  )
}
Login.getLayout = page => <ShoppingMallLayout>{page}</ShoppingMallLayout>

export default Login
