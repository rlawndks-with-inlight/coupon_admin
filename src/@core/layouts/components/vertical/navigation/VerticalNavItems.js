// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useEffect, useState } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'

const resolveNavItemComponent = (item, user_data) => {
  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) return VerticalNavGroup
  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props
  const [userData, setUserData] = useState({});
  const [navItems, setNavItems] = useState([]);
  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async () => {
    let user_data = await getLocalStorage(LOCALSTORAGE.USER_AUTH);
    user_data = JSON.parse(user_data);
    setUserData(user_data);
  }
  const RenderMenuItems = (userData && userData.id && verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item, userData)
    if (userData?.level >= item?.level) {
      return <TagName {...props} key={index} item={item} />
    }
  }))

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
