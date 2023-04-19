import BlankLayout from "src/@core/layouts/BlankLayout"

const Detail = () => {
  return (
    <>
      <div>hi</div>
    </>
  )
}
Detail.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Detail
