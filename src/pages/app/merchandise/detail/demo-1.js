import { Icon } from '@iconify/react';
import { useState } from 'react';

import DialogMemberships from 'src/@core/layouts/components/app/DialogMemberships';
import NaverMap from 'src/@core/layouts/components/app/NaverMap';
import { ContentWrapper, Row, themeObj } from 'src/@core/layouts/components/app/style-component';
import { commarNumber, getLocation } from 'src/@core/utils/function';
import styled from 'styled-components';


const MchtName = styled.div`
font-size:${themeObj.font_size.font2};
font-weight:bold;
`
const MchtCategory = styled.div`
font-size:${themeObj.font_size.font4};
width:64px;
`
const MchtContent = styled.div`
font-size:${themeObj.font_size.font4};
`
const Menu = styled.div`
display: flex;
border-bottom: 1px solid ${themeObj.grey[300]};
padding: 0.75rem 0;
align-items:center;
cursor:pointer;
`
const MenuTitle = styled.div`
margin-left: 0.5rem;
font-size:${themeObj.font_size.font2};
`
const Merchandise1 = (props) => {
  const {
    data: {
      data,
      mcht,
      dnsData,
      theme,
      history
    },
    func: {
      router,
    } } = props;

  const [mapLoading, setMapLoading] = useState(true);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [membershipCategory, setMembershipCategory] = useState('point')
  const handleMembershipClose = () => setMembershipOpen(false);
  const handleMembershipOpen = () => {
    setMembershipOpen(true)
  };
  const onOpenMembershipDialog = (category) => {
    setMembershipCategory(category)
    handleMembershipOpen();
  }
  return (
    <>
      <DialogMemberships
        open={membershipOpen}
        handleClose={handleMembershipClose}
        dnsData={dnsData}
        data={history}
        mcht={mcht}
        theme={theme}
        membershipCategory={membershipCategory}
        router={router}
        style={{
          color: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_font_color ?? "#fff" : ''}`,
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_background_color ?? "#000" : ''}`,
        }}
      />
      {!membershipOpen ?
        <>
          <ContentWrapper>
            <Row style={{ fontSize: themeObj.font_size.font3, margin: '0 auto 0 0', maxWidth: '400px', padding: '0 0 1rem 0' }}>
              {mcht?.point_flag == 1 ?
                <>
                  <Row style={{ alignItems: 'center', width: '33.33%' }}>
                    <Icon icon='mdi:alpha-p-box' style={{ color: themeObj.yellow, marginRight: 'auto', fontSize: '1.6rem' }} />
                    <div>포인트</div>
                    <div style={{ margin: '0 0.5rem 0 auto' }}>{commarNumber(mcht?.count?.point)}</div>
                  </Row>
                </>
                :
                <>
                </>}
              {mcht?.stamp_flag == 1 ?
                <>
                  <Row style={{ alignItems: 'center', width: '33.33%' }}>
                    <Icon icon='ph:stamp-fill' style={{ color: themeObj.green, marginRight: 'auto', fontSize: '1.6rem' }} />
                    <div >스탬프</div>
                    <div style={{ margin: '0 0.5rem 0 auto' }}>{commarNumber(mcht?.count?.stamp)}</div>
                  </Row>
                </>
                :
                <>
                </>}
              <Row style={{ alignItems: 'center', width: '33.33%' }}>
                <Icon icon='mdi:coupon' style={{ color: themeObj.red, marginRight: 'auto', fontSize: '1.6rem' }} />
                <div>쿠폰</div>
                <div style={{ margin: '0 0.5rem 0 auto' }}>{commarNumber(mcht?.count?.coupon)}</div>
              </Row>
            </Row>
            <Row style={{ justifyContent: 'space-between', borderBottom: `1px solid ${themeObj.grey[500]}`, paddingBottom: '1rem', alignItems: 'center' }}>
              <MchtName>{mcht?.mcht_name}</MchtName>
              <div />
            </Row>
            {mcht?.point_flag == 1 ?
              <>
                <Menu onClick={() => { onOpenMembershipDialog('points') }}>
                  <Icon icon='mdi:alpha-p-box' style={{ color: themeObj.yellow, fontSize: themeObj.font_size.font1 }} />
                  <MenuTitle>포인트 자세히보기</MenuTitle>
                </Menu>
              </>
              :
              <>
              </>}
            {mcht?.stamp_flag == 1 ?
              <>
                <Menu onClick={() => { onOpenMembershipDialog('stamps') }}>
                  <Icon icon='ph:stamp-fill' style={{ color: themeObj.green, fontSize: themeObj.font_size.font1 }} />
                  <MenuTitle>스탬프 자세히보기</MenuTitle>
                </Menu>
              </>
              :
              <>
              </>}
            <Menu onClick={() => { onOpenMembershipDialog('coupons') }}>
              <Icon icon='mdi:coupon' style={{ color: themeObj.red, fontSize: themeObj.font_size.font1 }} />
              <MenuTitle>쿠폰 자세히보기</MenuTitle>
            </Menu>
            <Row style={{ alignItems: 'center', margin: '0.5rem 0' }}>
              <MchtCategory>주소</MchtCategory>
              <MchtContent>{mcht?.addr}</MchtContent>
            </Row>
            <Row style={{ alignItems: 'center', margin: '0.5rem 0' }}>
              <MchtCategory>전화번호</MchtCategory>
              <MchtContent>{mcht?.phone_num}</MchtContent>
            </Row>
            <Row style={{ alignItems: 'center', margin: '0.5rem 0' }}>
              <MchtCategory>영업시간</MchtCategory>
              <MchtContent>12:00 ~ 24:00</MchtContent>
            </Row>
          </ContentWrapper>
        </>
        :
        <>
        </>
      }
      <MapBox src={`http://172.30.1.90:3000/app/naver/map?lat=${mcht?.location?.coordinates[1]}&lng=${mcht?.location?.coordinates[0]}&dns_data=${JSON.stringify(dnsData)}`}></MapBox>

    </>
  )
}
const MapBox = styled.iframe`
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  border: none;
  @media (max-width: 1200px) {
    width: 100%;
     height: 60vw;
}
`;
export default Merchandise1;
