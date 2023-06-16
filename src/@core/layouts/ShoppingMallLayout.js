// ** MUI Imports

import { useTheme } from '@emotion/react'
import ShoppingMallLayout1 from './components/shopping-mall/demo-1/layout-demo-1'
import { useState } from 'react'
// Styled component for Blank Layout component
const getDemo = (num, common) => {
  if (num == 1)
    return <ShoppingMallLayout1 {...common} />
}
const ShoppingMallLayout = ({ children, scrollToTop }) => {
  const theme = useTheme();

  const [layoutDemoNum, setLayoutDemoNum] = useState(1);
  return (
    <>
      {getDemo(layoutDemoNum, {
        data: {
        },
        func: {
        },
        children,
        scrollToTop
      })}
    </>
  )
}
export default ShoppingMallLayout
