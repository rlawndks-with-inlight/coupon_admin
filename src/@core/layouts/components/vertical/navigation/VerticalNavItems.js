// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavGroup from './VerticalNavGroup'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'
import { useEffect, useState } from 'react'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { useSettings } from 'src/@core/hooks/useSettings'

const resolveNavItemComponent = (item, user_data) => {

  if (item.sectionTitle) return VerticalNavSectionTitle
  if (item.children) return VerticalNavGroup
  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { settings } = useSettings()
  const { verticalNavItems } = props
  const [userData, setUserData] = useState({});
  const [dnsData, setDnsData] = useState({});
  const [navItems, setNavItems] = useState([]);
  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async () => {
    let dns_data = settings.dnsData
    setDnsData(dns_data);
    let user_data = await getLocalStorage(LOCALSTORAGE.USER_DATA);
    user_data = JSON.parse(user_data);
    setUserData(user_data);
  }
  const settingItems = (item) => {
    // if (item?.title == '오퍼레이터관리' && window.location.hostname != process.env.MAIN_FRONT_URL) {
    //   return false;
    // }
    if (item?.path == "/manager/operators") {
      if (userData?.level == 40 || userData?.level == 50) {
        return true;
      } else {
        return false;
      }
    }
    if (item?.table == "transactions") {
      if (userData?.level == 10) {
        return true;
      } else {
        return false;
      }
    }
    if (item?.table == "products") {
      if (userData?.level == 10) {
        return false;
      }
    }
    if (userData?.level == 45) {
      let z_can_show_table = ['users', 'merchandises', 'users', 'brands', 'coupons', 'uploads', 'products'];
      let z_can_show_path = [
        '/manager/merchandises',
        '/manager/devices',
        '/manager/users',
        '/manager/points',
        '/manager/coupon-models',
        '/manager/coupons',
        '/manager/coupons-histories',
        '/manager/categories',
        '/manager/products',
      ]
      if (z_can_show_table.includes(item?.table) || z_can_show_path.includes(item?.path)) {
        return true;
      } else {
        return false;
      }
    }

    if (userData?.level == 10) {
      if (item?.table == "coupons") {
        return true;
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
