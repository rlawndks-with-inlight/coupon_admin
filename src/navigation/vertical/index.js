const navigation = () => {

  return [
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
          menu_depth: 1,
          path: '/manager/merchandises',
          level: 10
        },
        {
          title: '장비관리',
          menu_depth: 1,
          path: '/manager/devices',
          level: 10
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
          menu_depth: 1,
          path: '/manager/users',
          level: 10
        },
        {
          title: '포인트관리',
          menu_depth: 1,
          path: '/manager/points',
          level: 10
        },
      ]
    },
    {
      title: '쿠폰관리',
      icon: 'tabler:ticket',
      level: 25,
      table: 'coupons',
      children: [
        {
          title: '쿠폰모델관리',
          menu_depth: 1,
          path: '/manager/coupon-models',
          level: 35
        },
        {
          title: '쿠폰관리',
          menu_depth: 1,
          path: '/manager/coupons',
          level: 35
        },
        {
          title: '쿠폰사용내역',
          menu_depth: 1,
          path: '/manager/coupons-histories',
          level: 10
        },
        {
          title: '결제금액대조',
          menu_depth: 1,
          path: '/manager/coupons-histories-contrast',
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
          menu_depth: 1,
          path: '/manager/categories',
          level: 10
        },
        {
          title: '상품관리',
          menu_depth: 1,
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
      title: '결제관리',
      icon: 'fluent-payment-32-regular',
      level: 10,
      table: 'transactions',
      menu_depth: 0,
      children: [
        {
          title: '정기결제등록',
          path: 'subscribe',
          level: 10,
          menu_depth: 1,
          children: [
            {
              title: '신용카드등록',
              path: '/manager/transactions/subscribe/bill-key',
              level: 10,
              menu_depth: 2,

            },
            // {
            //   title: '내통장입금',
            //   path: '/manager/transactions/subscribe/into-my-account',
            //   level: 10,
            //   menu_depth: 2,

            // },
          ]
        },
      ]
    },
    {
      title: '매출관리',
      icon: 'ic-outline-payments',
      level: 50,
      table: 'pays',
      menu_depth: 0,
      children: [
        {
          title: '결제내역',
          menu_depth: 1,
          path: '/manager/pays',
          level: 10
        },
      ]
    },
    {
      title: '이용가이드',
      icon: 'icon-park-outline:guide-board',
      table: 'guide',
      path: 'guide',
      level: 50
    },
    {
      title: '로그관리',
      icon: 'mdi:math-log',
      table: 'log',
      path: 'log',
      level: 50
    },
    {
      title: '메세지관리',
      icon: 'ep:message',
      table: 'lobonaejasg',
      path: 'bonaejas',
      level: 40
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
}

export default navigation
