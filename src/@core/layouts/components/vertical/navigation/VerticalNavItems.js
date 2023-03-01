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
  const [dnsData, setDnsData] = useState({});
  const [navItems, setNavItems] = useState([]);
  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async () => {
    let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    setDnsData(dns_data);
    let user_data = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data);
    setUserData(user_data);
  }
  const settingItems = (item) => {
    // if (item?.title == '오퍼레이터관리' && window.location.hostname != 'team.comagain.kr') {
    //   return false;
    // }
    if (item?.path == "/manager/operators") {
      if (userData?.level == 40 || userData?.level == 50) {
        return true;
      } else {
        return false;
      }
    }
    if (userData?.level >= item?.level) {
      return true;
    } else {
      return false
    }
  }
  const RenderMenuItems = (userData && userData.id && verticalNavItems?.map((item, index) => {
    const TagName = resolveNavItemComponent(item, userData)
    if (settingItems(item)) {
      return <TagName {...props} key={index} item={item} />
    }
  }))

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
