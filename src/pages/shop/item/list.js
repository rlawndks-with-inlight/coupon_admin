import BlankLayout from "src/@core/layouts/BlankLayout"

const List = () => {
  return (
    <>
      <div>hi</div>
    </>
  )
}
List.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default List
