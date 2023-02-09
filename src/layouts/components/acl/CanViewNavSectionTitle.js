// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewNavSectionTitle = props => {
  // ** Props
  const { children, navTitle } = props

  // ** Hook
  const ability = useContext(AbilityContext)

  return <>{children}</>
}

export default CanViewNavSectionTitle
