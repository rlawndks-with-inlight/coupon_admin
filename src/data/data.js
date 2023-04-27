import logoSrc from '/public/images/logos/logo.svg'
import { Icon } from '@iconify/react';
export default logoSrc;

export const backUrl = process.env.BACK_URL;

export const KAKAO_OBJ = {
  BACKGROUND: '#F9E000',
  FONT_COLOR: '#371C1D'
}
export const LOCALSTORAGE = {
  DNS_DATA: "dns_data",
  USER_DATA: "user_data",
  CUR_ZOOM: "cur_zoom",
  IS_FULL_SCREEN: "is_full_screen",
  NOT_SEARCH_OPTION: "not_search_option",
}
export const zBottomMenu = [
  { icon: 'mingcute:home-6-line', title: '홈', link: '/app/home/' },
  { icon: 'mdi:coupon-outline', title: '쿠폰', link: '/app/my-coupon/', option_column: 'is_use_coupon' },
  { icon: 'material-symbols:shopping-basket-outline', title: '주문', link: '/app/order/', option_column: 'is_use_order' },
  { icon: 'solar:gift-linear', title: '선물', link: '/app/gift/', option_column: 'is_use_gift' },
  { icon: 'noto:hamburger', title: '더보기', link: '/app/more/' },
]
