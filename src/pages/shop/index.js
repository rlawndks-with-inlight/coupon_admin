import ShowpingMallLayout from "src/@core/layouts/ShowpingMallLayout"

const Home = () => {
  return (
    <>
      <div>hi</div>
    </>
  )
}
Home.getLayout = page => <ShowpingMallLayout>{page}</ShowpingMallLayout>

export default Home
