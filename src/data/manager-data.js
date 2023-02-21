
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
    is_see_add_condition: 40,
    search_placeholder: '유저명 검색',//검색 placeholder
    head_columns: [
    ],
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('유저프로필', 'profile_img', 'img', '', { is_profile: true }),
      managerListFormat('유저아이디', 'user_name', 'text', ''),
      managerListFormat('보유포인트', 'point_amt', 'number', ''),// 검색 level == 0일 경우에만
      managerListFormat('보유스탬프', 'stamp_amt', 'number', ''),// 검색 level == 0일 경우에만
      managerListFormat('보유쿠폰갯수', 'coupon_amt', 'number', ''),// 검색 level == 0일 경우에만
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
    is_see_add_condition: 40,
    head_columns: [
      { title: '가맹점정보', size: 6 },
      { title: '포인트정보', size: 2 },
      { title: '스탬프정보', size: 2 },
      { title: '', size: 3 },
    ],
    search_placeholder: '가맹점명, 유저명 검색',//검색 placeholder
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('유저프로필', 'profile_img', 'img', '', { is_profile: true }),
      managerListFormat('유저아이디', 'user_name', 'text', ''),
      managerListFormat('상위아이디', 'group_id', 'text', ''),// 검색 level >=10 일시
      managerListFormat('가맹점명', 'mcht_name', 'text', ''),// 검색 level == 10일 경우에만
      managerListFormat('가맹점주소', 'addr', 'text', ''),// 검색 level == 10일 경우에만
      managerListFormat('사용여부', 'point_flag', 'use_status', ''),// 검색 level == 10일 경우에만
      managerListFormat('적립비율', 'point_rate', 'percent', ''),// 검색 level == 10일 경우에만
      managerListFormat('사용여부', 'stamp_flag', 'use_status', ''),// 검색 level == 10일 경우에만
      managerListFormat('저장갯수', 'stamp_save_count', 'number', ''),// 검색 level == 10일 경우에만
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
    is_see_add_condition: 40,
    search_placeholder: '브랜드명 검색',
    head_columns: [
      { title: '브랜드정보', size: 7 },
      { title: '스탬프정보', size: 3 },
      { title: '포인트정보', size: 2 },
      { title: '법인정보', size: 5 },
      { title: '', size: 3 },
    ],
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('승인여부', 'is_appr', 'appr_status', ''),
      managerListFormat('DNS', 'dns', 'text', ''),
      managerListFormat('LOGO', 'logo_img', 'img', ''),
      managerListFormat('FAVICON', 'favicon_img', 'img', '', { is_square: true }),
      managerListFormat('템플릿ID', 'template_id', 'text', ''),
      managerListFormat('발행쿠폰명', 'coupon_model_id', 'text', ''),
      managerListFormat('사용여부', 'stamp_flag', 'use_status', ''),
      managerListFormat('쿠폰변환최소개수', 'stamp_max_size', 'number', ''),
      managerListFormat('저장개수', 'stamp_save_count', 'number', ''),
      managerListFormat('사용여부', 'point_flag', 'use_status', ''),
      managerListFormat('적립비율', 'point_rate', 'percent', ''),
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
    is_see_add_condition: 40,
    search_placeholder: '광고명 검색',
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
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
    is_see_add_condition: 40,
    search_placeholder: '유저명, 가맹점명 검색',
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('유저명', 'user_name', 'text', ''),
      managerListFormat('가맹점명', 'mcht_name', 'text', ''),
      managerListFormat('구매금액', 'purchase_price', 'number', ''),
      managerListFormat('적립포인트', 'save_amount', 'number', ''),
      managerListFormat('사용포인트', 'use_amount', 'number', ''),
      managerListFormat('적립비율', 'point_rate', 'percent', ''),
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
    search_placeholder: '맥주소 검색',
    columns: [
      managerListFormat('No.', 'id', 'number', ''),
      managerListFormat('가맹점명', 'mcht_name', 'text', ''),
      managerListFormat('맥주소', 'mac_addr', 'text', ''),
      managerListFormat('발행시간', 'created_at', 'datetime', ''),
      managerListFormat('사용여부', 'appr_status', 'use_status', ''),
      managerListFormat('수정/삭제', 'edit', 'edit', ''),
    ],
    table_width: '',
    default_search_obj: {}
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
