import { commarNumber, getUserLevelByNumber } from 'src/@core/utils/function'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CustomChip from 'src/@core/components/mui/chip'
// ** Icon Imports
import Icon from 'src/@core/components/icon'
import Avatar from '@mui/material/Avatar'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Chip } from '@mui/material'
import { getLocalStorage } from 'src/@core/utils/local-storage'
import { LOCALSTORAGE } from 'src/data/data'
import { Spinner } from 'evergreen-ui'

export const getItemByType = (data, column, table, is_excel, user_data, func) => {
  try {
    let result = "---";
    const {
      goTo,
      onDeleteOpen,
      openChangePasswordPopUp,
      onChangeOnCouponModelPopUp,
      onChangeOnCouponPopUp,
      onClickImage,
      onApiKeyPubOpen,
      onChangeUserUnsubscribe,
      handleChangeMmsOpen,
      handleChangeMchtMmsOpen
    } = func;
    let item = data[column?.column];
    if (column?.column && column?.column.includes('-obj-')) {
      item = (data[`${column?.column.split('-obj-')[0]}`] ?? {})[`${column?.column.split('-obj-')[1]}`] ?? ""
    }
    if (column?.type == 'text') {//
      result = item;
      if (!item) {
        result = "---";
      }
    }
    if (column?.type == 'bold') {//
      result = item;
      if (!item) {
        result = "---";
      }
      if (!is_excel) result = <div style={{ fontWeight: 'bold' }}>{result}</div>
    }
    if (column?.type == 'json_string') {//
      console.log(item)
      result = JSON.stringify(item);
      if (!item) {
        result = "---";
      }
      if (!is_excel) result = <div style={{ fontWeight: 'bold' }}>{result}</div>
    }
    if (column?.type == 'number') {//
      if (isNaN(parseInt(item))) {
        return "---";
      }
      result = commarNumber(item);
    }
    if (column?.type == 'percent') {//
      if (isNaN(parseInt(item))) {
        return "---";
      }
      result = commarNumber(item) + '%';
    }
    if (column?.type == 'img') {//
      let style = { maxWidth: '128px', height: 'auto', cursor: 'pointer' };
      if (column?.type_option?.is_square) {
        style = {
          ...style,
          height: '32px', width: '32px'
        }
      }
      result = (<LazyLoadImage src={item} style={style} onClick={() => {
        onClickImage(item, 'img')
      }} />);

      if (column?.type_option?.is_profile) {
        style = {
          height: '50px', width: '50px', margin: 'auto'
        }
        result = <Avatar alt='John Doe' src={item} sx={{ ...style, borderRadius: '50%' }} />
      }

      if (is_excel) result = item;
    }
    if (column?.type == 'datetime') {//
      if (!item) {
        return "---";
      }
      let datetime = item;
      datetime = datetime.replace(' ', '\n');
      result = datetime;
    }
    if (column?.type == 'use_status') {//
      result = item == 1 ?
        <CustomChip rounded label='사용' skin='light' color='success' />
        :
        <CustomChip rounded label='사용안함' skin='light' color='error' />;
      if (is_excel) result = (item == 1 ? '사용' : '사용안함');

    }
    if (column?.type == 'message_status') {//

      if (item == 1000) {
        result = <CustomChip rounded label='성공' skin='light' color='success' />
      } else if (item == 500) {
        result = <CustomChip rounded label='전송중' skin='light' />
      } else {
        result = <CustomChip rounded label='실패' skin='light' color='error' />;
      }
      if (is_excel) {
        if (item == 1000) {
          result = '성공';
        } else if (item == 500) {
          result = '전송중';
        } else {
          result = '실패';
        }
      }

    }
    if (column?.type == 'barcode_type') {//
      if (item == 1) {
        result = 'QR코드';
        if (!is_excel) result = <Chip label={result} />
      } else if (item == 0) {
        result = '바코드';
        if (!is_excel) result = <Chip label={result} variant='outlined' />
      } else {
        result = '---';
      }
    }
    if (column?.type == 'coupon_type') {//
      if (item == 0) {
        result = '할인쿠폰';
        if (!is_excel) result = <Chip label={result} />
      } else {
        result = '교환쿠폰';
        if (!is_excel) result = <Chip label={result} variant='outlined' />
      }
    }
    if (column?.type == 'barcode_num') {//
      result = <Chip onClick={() => {
        onClickImage(item, 'barcode')
      }} label={item} icon={<Icon icon='bx:barcode' fontSize={20} />} />

      if (is_excel) result = item
    }
    if (column?.type == 'coupon_status') {//
      if (item == 0) {
        result = '발행완료';
        let color = 'secondary'
        if (data?.user_name) {
          result = '지급완료';
          color = 'info'
        }
        if (!is_excel) result = <Chip label={result} color={color} variant='outlined' />
      } else if (item == 5) {
        result = '발행취소';
        if (!is_excel) result = <Chip label={result} color='error' variant='outlined' />
      } else if (item == 7) {
        result = '지급완료';
        if (!is_excel) result = <Chip label={result} color='info' variant='outlined' />
      } else if (item == 10) {
        result = '사용완료';
        if (!is_excel) result = <Chip label={result} color='success' variant='outlined' />
      } else {
        result = '---';
      }
    }
    if (column?.type == 'appr_status') {//
      result = item == 1 ?
        <CustomChip rounded label='승인' skin='light' color='success' />
        :
        <CustomChip rounded label='승인안됨' skin='light' color='error' />;
      if (is_excel) result = item == 1 ? '승인' : '승인안됨';

    }
    if (column?.type == 'is_cancel') {//
      result = item == 0 ?
        <CustomChip rounded label='적립' skin='light' color='success' />
        :
        <CustomChip rounded label='적립취소' skin='light' color='error' />;
      if (is_excel) result = item == 0 ? '적립' : '적립취소';
    }
    if (column?.type == 'is_appr') {//
      result = item == 0 ?
        <CustomChip rounded label='승인' skin='light' color='success' />
        :
        <CustomChip rounded label='승인취소' skin='light' color='error' />;
      if (is_excel) result = item == 0 ? '승인' : '승인취소';
    }
    if (column?.type == 'point_history') {//
      result = (
        <Tooltip title='포인트이력'>
          <IconButton
            size='small'
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              goTo({
                pathname: `/manager/points/`,
                query: { user_id: data?.id }
              })
            }}
          >
            <Icon icon='tabler:history' />
          </IconButton>
        </Tooltip>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'ad_type') {//
      if (item == 0)
        result = '사용안함';
      if (item == 1)
        result = '메인광고';
      if (item == 2)
        result = '슬라이드광고';
    }
    if (column?.type == 'user_level') {
      result = getUserLevelByNumber(item);
    }
    if (column?.type == 'period') {
      let s_dt = data[column?.column.split('-')[0]];
      let e_dt = data[column?.column.split('-')[1]];
      result = `${s_dt} ~\n${e_dt}`;
    }
    if (column?.type == 'edit') {
      result = (
        <>
          {isShowEditButton(table, user_data) ?
            <>
              <Tooltip title='수정'>
                <IconButton
                  size='small'
                  sx={{ color: 'text.secondary' }}
                  onClick={() => { goTo(`/manager/${table}/edit/${data?.id}`) }}
                >
                  <Icon icon='tabler:edit' />
                </IconButton>
              </Tooltip>
            </>
            :
            <>
            </>}
          {isShowDeleteButton(table, user_data) ?
            <>
              <Tooltip title='삭제'>
                <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => { onDeleteOpen(data?.id) }}>
                  <Icon icon='tabler:trash' />
                </IconButton>
              </Tooltip>
            </>
            :
            <>
            </>}

          {column?.column == 'edit_ch' ?
            <>
              <Tooltip title='비밀번호변경'>
                <IconButton
                  size='small'
                  sx={{ color: 'text.secondary' }}
                  onClick={() => { openChangePasswordPopUp(data) }}
                >
                  <Icon icon='tabler:lock' />
                </IconButton>
              </Tooltip>
            </>
            :
            <>
            </>}
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'change_pw') {
      result = (
        <>
          <Tooltip title='비밀번호변경'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { openChangePasswordPopUp(data) }}
            >
              <Icon icon='tabler:lock' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'mcht_names') {
      result = (data?.mchts ?? []).map(item => {
        return item?.mcht_name
      }).join()
      if (!is_excel) result = (
        <>
          {data?.mchts && data?.mchts.map((item, idx) => (
            <>
              <Chip variant='outlined' label={item?.mcht_name} skin='light' color='secondary' style={{ margin: '0.5rem 0.5rem 0.5rem 0' }} />
            </>
          ))}
        </>
      )
    }
    if (column?.type == 'spot_type') {
      if (item == 1) {
        result = '모든 가맹점';
        if (!is_excel) result = <Chip label={result} />
      } else if (item == 0) {
        result = '지정 가맹점';
        if (!is_excel) result = <Chip label={result} variant='outlined' />
      } else {
        result = '---';
      }
    }
    if (column?.type == 'device_type') {
      if (item == 1) {
        result = 'POS';
        if (!is_excel) result = <Chip label={result} />
      } else if (item == 0) {
        result = '키오스크';
        if (!is_excel) result = <Chip label={result} variant='outlined' />
      } else {
        result = '---';
      }
    }
    if (column?.type == 'on_pub') {
      result = (
        <>
          <Tooltip title='쿠폰 발행'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onChangeOnCouponModelPopUp(data, '') }}
            >
              <Icon icon='mdi:coupon-outline' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_pub_cxl') {
      result = (
        <>
          <Tooltip title='쿠폰 발행 취소'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onChangeOnCouponModelPopUp(data, '-cancel') }}
            >
              <Icon icon='material-symbols:cancel-outline' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_pub_del') {
      result = (
        <>
          <Tooltip title='쿠폰 발행 삭제'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onChangeOnCouponModelPopUp(data, '-destory') }}
            >
              <Icon icon='material-symbols:delete-forever-outline' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_coupon_many_mms') {
      result = (
        <>
          <Tooltip title='쿠폰 MMS 대량발송'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { handleChangeMmsOpen(data) }}
            >
              <Icon icon='ic:outline-mms' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_coupon_many_mcht_mms') {
      result = (
        <>
          <Tooltip title='쿠폰 MMS 대량발송'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { handleChangeMchtMmsOpen(data) }}
            >
              <Icon icon='ic:outline-mms' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_connect_user_coupon') {
      result = (
        <>
          <Tooltip title='쿠폰 유저 지급'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onChangeOnCouponPopUp(data, 'match') }}
            >
              <Icon icon='fluent-mdl2:plug-connected' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_use_coupon') {
      result = (
        <>
          <Tooltip title='쿠폰 사용'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onChangeOnCouponPopUp(data, 'approve') }}
            >
              <Icon icon='ic:outline-verified-user' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'on_use_coupon_cxl') {
      result = (
        <>
          <Tooltip title='쿠폰 사용 취소'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onChangeOnCouponPopUp(data, 'cancel') }}
            >
              <Icon icon='material-symbols:cancel-outline' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'api_key_pub') {
      result = (
        <>
          <Tooltip title='api key 발급'>
            <IconButton
              size='small'
              sx={{ color: 'text.secondary' }}
              onClick={() => { onApiKeyPubOpen(data) }}
            >
              <Icon icon='ic:outline-publish' />
            </IconButton>
          </Tooltip>
        </>
      )
      if (is_excel) result = '---';
    }
    if (column?.type == 'user_unsubscribes') {
      let dns_data = getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      result = (
        <>
          {data?.is_subscribe != 'loading' ?
            <>
              <Tooltip title={`수신 ${data?.is_subscribe == 1 ? '거부하기' : '하기'}`}>
                <IconButton
                  size='small'
                  onClick={() => { onChangeUserUnsubscribe(data?.is_subscribe == 1 ? 0 : 1, data) }}
                >
                  <Icon icon={data?.is_subscribe == 1 ? 'ic:outline-toggle-off' : 'ic:outline-toggle-on'}
                    style={{
                      fontSize: '2rem',
                      color: `${data?.is_subscribe == 1 ? `${dns_data?.theme_css?.main_color ?? "green"}` : ''}`
                    }}
                  />
                </IconButton>
              </Tooltip>
            </>
            :
            <>
              <Spinner style={{ margin: '0 auto' }} />
            </>}
        </>
      )
      if (is_excel) result = data?.is_subscribe;
    }
    if (column?.type == 'mcht_user_list') {
      result = (
        <>
          <IconButton
            size='small'
            sx={{ color: 'text.secondary' }}
            onClick={() => {
              goTo({
                pathname: `/manager/users`,
                query: { mcht_id: data?.id }
              })
            }}
          >
            <Icon icon='tabler:list' />
          </IconButton>
        </>
      )
    }
    if (!result && isNaN(parseInt(item))) {
      return '---';
    } else {
      return result;
    }

  } catch (err) {
    console.log(err);
    return "---";
  }
}
export const isShowDeleteButton = (param_table, user_data) => {
  if (param_table == 'brands' && user_data?.level < 50) {
    return false;
  }
  if (param_table == 'merchandises' && user_data?.level < 11) {
    return false;
  }
  return true;
}
export const isShowEditButton = (param_table, user_data) => {

  return true;
}
