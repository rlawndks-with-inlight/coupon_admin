
export const managerListFormat = (title, column, type, width, type_option) => {
  return {
    title: title,
    column: column,
    type: type,
    width: width,
    type_option: type_option
  }
}

export const managerListQueriesFormat = (title, column, val, type, type_option) => {
  return {
    title,
    column,
    val,
    type,
    type_option
  }
}

export const objDataGridColumns = {//리스트 페이지에 사용할 것
  users: {//param
    table: 'users',//ajax에 사용할 테이블
    breadcrumb: '유저',//이름 사용할 것
    is_add: true,
    is_see_add_condition: 35,
    search_placeholder: '유저명 검색',//검색 placeholder
    head_columns: [
    ],
    columns: [
      managerListFormat('유저ID', 'id', 'number', ''),
      managerListFormat('브랜드명', 'brand_name', 'text', ''),
      managerListFormat('유입 가맹점명', 'mcht_name', 'text', ''),
      managerListFormat('유저프로필', 'profile_img', 'img', '', { is_profile: true }),
      managerListFormat('유저아이디', 'user_name', 'text', ''),
      managerListFormat('보유포인트', 'point_amt', 'number', ''),// 검색 level == 0일 경우에만
      managerListFormat('보유스탬프', 'stamp_amt', 'number', ''),// 검색 level == 0일 경우에만
      managerListFormat('보유쿠폰갯수', 'coupon_amt', 'number', ''),// 검색 level == 0일 경우에만
      managerListFormat('포인트이력', 'point_history', 'point_history', ''),// 검색 level == 0일 경우에만
      managerListFormat('생성시간', 'created_at', 'datetime', ''),
      managerListFormat('최종수정시간', 'updated_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit_ch', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
  },
  operators: {//param
    table: 'operators',//ajax에 사용할 테이블
    breadcrumb: '오퍼레이터',//이름 사용할 것
    is_add: true,
    is_see_add_condition: 50,
    search_placeholder: '유저ID 검색',//검색 placeholder
    head_columns: [
    ],
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('브랜드명', 'brand_name', 'text', ''),
      managerListFormat('유저프로필', 'profile_img', 'img', '', { is_profile: true }),
      managerListFormat('유저아이디', 'user_name', 'text', ''),
      managerListFormat('유저레벨', 'level', 'user_level', ''),
      managerListFormat('생성시간', 'created_at', 'datetime', ''),
      managerListFormat('최종수정시간', 'updated_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit_ch', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
  },
  merchandises: {//param
    table: 'merchandises',//ajax에 사용할 테이블
    breadcrumb: '가맹점',//이름 사용할 것
    is_add: true,
    is_see_add_condition: 35,
    head_columns: [
      { title: '가맹점정보', size: 6 },
      { title: '포인트정보', size: 2 },
      { title: '스탬프정보', size: 2 },
      { title: '', size: 3 },
    ],
    search_placeholder: '가맹점명, 유저명 검색',//검색 placeholder
    columns: [
      managerListFormat('ID', 'id', 'number', ''),
      managerListFormat('가맹점프로필', 'profile_img', 'img', '', { is_profile: true }),
      managerListFormat('가맹점아이디', 'user_name', 'text', ''),
      managerListFormat('상위아이디', 'group_id', 'text', ''),// 검색 level >=10 일시
      managerListFormat('가맹점명', 'mcht_name', 'text', ''),// 검색 level == 10일 경우에만
      managerListFormat('가맹점주소', 'addr', 'text', ''),// 검색 level == 10일 경우에만
      managerListFormat('사용여부', 'point_flag', 'use_status', '', { search_option_label: '포인트' }),// 검색 level == 10일 경우에만
      managerListFormat('적립비율', 'point_rate', 'percent', '', { search_option_label: '포인트' }),// 검색 level == 10일 경우에만
      managerListFormat('사용여부', 'stamp_flag', 'use_status', '', { search_option_label: '스탬프' }),// 검색 level == 10일 경우에만
      managerListFormat('저장갯수', 'stamp_save_count', 'number', '', { search_option_label: '스탬프' }),// 검색 level == 10일 경우에만
      managerListFormat('생성시간', 'created_at', 'datetime', ''),
      managerListFormat('최종수정시간', 'updated_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit_ch', 'edit', ''),
    ],
    table_width: '150%',
    default_search_obj: {}
  },
  brands: {
    table: 'brands',
    breadcrumb: '브랜드',
    is_add: true,
    is_see_add_condition: 50,
    search_placeholder: '브랜드명 검색',
    head_columns: [
      { title: '브랜드정보', size: 7 },
      { title: '스탬프정보', size: 3 },
      { title: '포인트정보', size: 3 },
      { title: '법인정보', size: 5 },
      { title: '', size: 3 },
    ],
    columns: [
      managerListFormat('브랜드ID', 'id', 'number', ''),
      managerListFormat('브랜드명', 'name', 'text', ''),
      //managerListFormat('승인여부', 'is_appr', 'appr_status', ''),
      managerListFormat('DNS', 'dns', 'text', ''),
      managerListFormat('LOGO', 'logo_img', 'img', ''),
      managerListFormat('FAVICON', 'favicon_img', 'img', '', { is_square: true }),
      managerListFormat('템플릿ID', 'template_id', 'text', ''),
      managerListFormat('발행쿠폰명', 'coupon_model_id', 'text', ''),
      managerListFormat('사용여부', 'stamp_flag', 'use_status', '', { search_option_label: '스탬프' }),
      managerListFormat('쿠폰변환최소개수', 'stamp_max_size', 'number', '', { search_option_label: '스탬프' }),
      managerListFormat('저장개수', 'stamp_save_count', 'number', '', { search_option_label: '스탬프' }),
      managerListFormat('사용여부', 'point_flag', 'use_status', '', { search_option_label: '포인트' }),
      managerListFormat('최소사용금액', 'point_min_amount', 'number', '', { search_option_label: '포인트' }),
      managerListFormat('적립비율', 'point_rate', 'percent', '', { search_option_label: '포인트' }),
      managerListFormat('법인상호', 'company_nm', 'text', ''),
      managerListFormat('대표자명', 'ceo_nm', 'text', ''),
      managerListFormat('전화번호', 'phone_num', 'text', ''),
      managerListFormat('사업자번호', 'business_num', 'text', ''),
      managerListFormat('주소', 'addr', 'text', ''),
      managerListFormat('생성시간', 'created_at', 'datetime', ''),
      managerListFormat('최종수정시간', 'updated_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit', 'edit', ''),
    ],
    table_width: '180%',
    default_search_obj: {}
  },
  advertisements: {
    table: 'advertisements',
    breadcrumb: '광고',
    is_add: true,
    is_see_add_condition: 35,
    search_placeholder: '광고명 검색',
    columns: [
      managerListFormat('광고ID', 'id', 'number', ''),
      managerListFormat('광고명', 'ad_name', 'text', ''),
      managerListFormat('광고타입', 'ad_type', 'ad_type', ''),
      managerListFormat('생성시간', 'created_at', 'datetime', ''),
      managerListFormat('최종수정시간', 'updated_at', 'datetime', ''),
      managerListFormat('광고이미지', 'ad_img', 'img', ''),
      managerListFormat('수정/삭제', 'edit', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
  },
  notices: {
    table: 'notices',
    breadcrumb: '공지사항',
    is_add: true,
    is_see_add_condition: 40,
    search_placeholder: '제목 검색',
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('제목', 'title', 'text', ''),
      managerListFormat('작성자', 'writer', 'text', ''),
      managerListFormat('생성시간', 'created_at', 'datetime', ''),
      managerListFormat('최종수정시간', 'updated_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
  },
  points: {
    table: 'points',
    breadcrumb: '포인트',
    is_add: true,
    is_see_add_condition: 35,
    search_placeholder: '유저명, 가맹점명 검색',
    columns: [
      managerListFormat('포인트ID', 'id', 'number', ''),
      managerListFormat('가맹점명', 'mcht_name', 'text', ''),
      managerListFormat('유저명', 'user_name', 'text', ''),
      managerListFormat('구매금액', 'purchase_price', 'number', ''),
      managerListFormat('사용포인트', 'use_amount', 'number', ''),
      managerListFormat('적립포인트', 'save_amount', 'number', ''),
      managerListFormat('적립비율', 'point_rate', 'percent', ''),
      managerListFormat('적립타입', 'is_cancel', 'is_cancel', ''),
      managerListFormat('발행시간', 'created_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
  },
  devices: {
    table: 'devices',
    breadcrumb: '장비',
    is_add: true,
    is_see_add_condition: 40,
    search_placeholder: '맥주소, 가맹점명 검색',
    columns: [
      managerListFormat('장비ID', 'id', 'number', ''),
      managerListFormat('브랜드 ID', 'brand_id', 'number', ''),
      managerListFormat('브랜드명', 'brand_name', 'text', ''),
      managerListFormat('가맹점 ID', 'mcht_id', 'number', ''),
      managerListFormat('가맹점명', 'mcht_name', 'text', ''),
      managerListFormat('포인트사용여부', 'point_flag', 'use_status', ''),
      managerListFormat('포인트적립비율', 'point_rate', 'percent', ''),
      managerListFormat('스탬프사용여부', 'stamp_flag', 'use_status', ''),
      managerListFormat('스탬프저장갯수', 'stamp_save_count', 'number', ''),
      managerListFormat('맥주소', 'mac_addr', 'text', ''),
      managerListFormat('비고', 'comment', 'text', ''),
      managerListFormat('발행시간', 'created_at', 'datetime', ''),
      managerListFormat('수정/삭제', 'edit', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
  },
}
export const excelUploadTableObj = {
  merchandises: {
    breadcrumb: '가맹점',
    caution: [
      '포인트 및 스탬프 사용여부는 1,0(사용,사용안함)으로 표기합니다.',
      '포인트 변환률 및 스탬프 저장 개수는 숫자만 입력합니다.',
      '아이디는 중복될 수 없습니다.',
    ],
    columns: [
      { column: 'user_name', name: '아이디', type: 'text' },
      { column: 'user_pw', name: '패스워드', type: 'text' },
      { column: 'nick_name', name: '닉네임', type: 'text' },
      { column: 'birth_date', name: '생년월일', type: 'date' },
      { column: 'mcht_name', name: '가맹점 상호', type: 'text' },
      { column: 'addr', name: '가맹점 주소', type: 'text' },
      { column: 'point_flag', name: '포인트 사용여부', type: 'number' },
      { column: 'point_rate', name: '포인트 변환률', type: 'number' },
      { column: 'stamp_flag', name: '스탬프 사용여부', type: 'number' },
      { column: 'stamp_save_count', name: '상품당 스탬프 저장개수', type: 'number' },
    ]
  },
  devices: {
    breadcrumb: '장비',
    caution: [
      '맥주소는 중복될 수 없습니다.',
      '맥주소는 맥주소 포맷으로 작성되어야 합니다.(예: AA:BB:CC:DD:EE)',
    ],
    columns: [
      { column: 'user_name', name: '가맹점 아이디', type: 'text' },
      { column: 'partner_name', name: '협력사 아이디', type: 'text' },
      { column: 'mac_addr', name: '맥주소', type: 'text' },
      { column: 'comment', name: '비고', type: 'text' },
    ]
  },
  users: {
    breadcrumb: '유저',
    caution: [
      '가맹점당 고유한 휴대폰 번호가 중복되어 저장될 수 없으므로 이점 유의 부탁드립니다. \n(멤버쉽 적용 타입이 "유입된 가맹점에서만 사용" 옵션인 브랜드에 한함)',
    ],
    columns: [
      { column: 'mcht_name', name: '유입된 가맹점 아이디', type: 'text' },
      { column: 'user_name', name: '유저 아이디', type: 'text' },
      { column: 'nick_name', name: '유저 닉네임', type: 'text' },
      { column: 'birth_date', name: '유저 생년월일', type: 'date' },
    ]
  },
  points: {
    breadcrumb: '포인트',
    caution: [
      '상품 총금액, 사용된 포인트, 포인트 적립 비율은 숫자만 입력합니다.',
      '적립 포인트는 "(구매금액 - 사용포인트) * 적립비율%" 수식으로 적립됩니다.(소수점 버림)',
      '취소 여부 1,0(적립취소, 적립)으로 표기합니다.',
      '취소 여부 기본 값: 0(적립)',
    ],
    columns: [
      { column: 'user_name', name: '유저 아이디', type: 'text' },
      { column: 'mcht_name', name: '사용된 가맹점 아이디', type: 'text' },
      { column: 'purchase_price', name: '상품 구매 총금액', type: 'number' },
      { column: 'use_amount', name: '사용된 포인트', type: 'number' },
      { column: 'point_rate', name: '포인트 적립 비율', type: 'number' },
      { column: 'is_cancel', name: '취소 여부', type: 'number' },
    ]
  },
}
export const editColumnObjFormat = (title, type, type_option, class_name, is_only_add, is_only_update) => {
  return {
    title: title,//제목
    type: type,//타입 -> input, select, editor, img
    type_option: type_option,
    class_name: class_name,
    is_only_add: is_only_add,//추가할때만 사용할때
    is_only_update: is_only_update,//수정할때만 사용할때
  }
}

export const objEditColumns = {//수정 페이지에 사용할 것
  users: {
    table: 'users',
    breadcrumb: '유저',
    columns: [//img, select, input,
      [
        editColumnObjFormat('메인이미지 (240x150)', 'img', { field_name: 'content' }, 'main_img'),
      ],
      [
        editColumnObjFormat('제목', 'input', { placeholder: '제목을 입력해 주세요.' }, 'title'),
        editColumnObjFormat('해시태그', 'input', { placeholder: '' }, 'hash'),
      ],
      [
        editColumnObjFormat('내용', 'editor', {}, 'note'),
      ],
    ],
    add_list: [],
  },
  brands: {
    table: 'brands',
    breadcrumb: '브랜드',
    columns: [//img, select, input,
      [
        editColumnObjFormat('브랜드 명', 'input', {}, 'name'),
      ],
      [
        editColumnObjFormat('DNS 명', 'input', {}, 'dns'),
      ],
      [
        editColumnObjFormat('로고 이미지', 'img', {}, 'logo_img'),
      ],
      [
        editColumnObjFormat('favicon 이미지', 'img', {}, 'favicon_img'),
      ],
      [
        editColumnObjFormat('대표자 명', 'input', {}, 'ceo_nm'),
      ],
      [
        editColumnObjFormat('법인 주소', 'input', {}, 'addr'),
      ],
      [
        editColumnObjFormat('휴대폰 번호', 'input', {}, 'phone_num'),
      ],
      [
        editColumnObjFormat('팩스 번호', 'input', {}, 'fax_num'),
      ],
      [
        editColumnObjFormat('템플릿 ID', 'input', {}, 'template_id'),
      ],
      [
        editColumnObjFormat('법인 상호', 'input', {}, 'company_nm'),
      ],
      [
        editColumnObjFormat('개인정보 책임자명', 'input', {}, 'pvcy_rep_nm'),
      ],
      [
        editColumnObjFormat('사업자 번호', 'input', {}, 'business_num'),
      ],
      [
        editColumnObjFormat('스탬프 사용여부', 'input', {}, 'stamp_flag'),
      ],
      [
        editColumnObjFormat('포인트 사용여부', 'input', {}, 'point_flag'),
      ],
      [
        editColumnObjFormat('스탬프 쿠폰변환 최소개수', 'input', {}, 'stamp_to_coupon_size'),
      ],
      [
        editColumnObjFormat('상품당 스탬프 저장개수', 'input', {}, 'stamp_save_count'),
      ],
      [
        editColumnObjFormat('쿠폰 발행시 발행될 쿠폰 ID', 'input', {}, 'coupon_model_id'),
      ],
      [
        editColumnObjFormat('포인트 변환률', 'input', {}, 'point_rate'),
      ],
    ],
    add_list: [],
  },
  advertisements: {
    table: 'advertisements',
    breadcrumb: '광고',
    add_list: [],
  },
  notices: {
    table: 'notices',
    breadcrumb: '공지사항',
    add_list: [],
  }
}
