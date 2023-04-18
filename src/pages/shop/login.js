import BlankLayout from "src/@core/layouts/BlankLayout"

const Home = () => {
  return (
    <>
      <div>hi</div>
    </>
  )
}
Home.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Home
