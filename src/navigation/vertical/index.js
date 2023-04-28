const project_navigation = [
  {
    title: '오퍼레이터관리',
    icon: 'tabler:affiliate',
    path: '/manager/operators',
    table: 'operators',
    level: 40
  },
  {
    title: '브랜드관리',
    icon: 'ph-buildings',
    path: '/manager/brands',
    table: 'brands',
    level: 40
  },
  {
    title: '가맹점관리',
    icon: 'tabler:map-pin',
    table: 'merchandises',
    level: 10,
    children: [
      {
        title: '가맹점관리',
        path: '/manager/merchandises',
        level: 10
      },
      {
        title: '장비관리',
        path: '/manager/devices',
        level: 40
      },
    ]
  },
  {
    title: '유저관리',
    icon: 'tabler:user',
    level: 10,
    table: 'users',
    children: [
      {
        title: '유저관리',
        path: '/manager/users',
        level: 10
      },
      {
        title: '포인트관리',
        path: '/manager/points',
        level: 10
      },
    ]
  },
  {
    title: '쿠폰관리',
    icon: 'tabler:ticket',
    level: 10,
    table: 'coupons',
    children: [
      {
        title: '쿠폰모델관리',
        path: '/manager/couponModels',
        level: 10
      },
      {
        title: '쿠폰관리',
        path: '/manager/coupons',
        level: 10
      },
    ]
  },
  {
    title: '상품관리',
    icon: 'tabler:shopping-cart',
    level: 10,
    table: 'products',
    children: [
      {
        title: '카테고리관리',
        path: '/manager/categories',
        level: 10
      },
      {
        title: '상품관리',
        path: '/manager/products',
        level: 10
      },
    ]
  },
  {
    title: '광고관리',
    icon: 'tabler:ad',
    path: '/manager/advertisements',
    table: 'advertisements',
    level: 35
  },
  {
    title: '대량등록',
    icon: 'uiw:file-excel',
    path: '/manager/uploads/excel',
    table: 'uploads',
    level: 40
  },
  {
    title: '로그관리',
    icon: 'mdi:math-log',
    table: 'log',
    path: 'log',
    level: 50
  },
  // {
  //   title: '게시판관리',
  //   icon: 'tabler:news',
  //   level: 10,
  //   children: [
  //     {
  //       title: '공지사항관리',
  //       path: '/manager/notices',
  //       level: 10
  //     }
  //   ]
  // },
]
const is_project = false;

const navigation = () => {
  return project_navigation
}

export default navigation
