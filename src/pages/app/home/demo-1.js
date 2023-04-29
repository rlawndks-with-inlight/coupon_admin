import { ContentWrapper, Font1, Font2, Font4, Row, themeObj } from 'src/@core/layouts/components/app/style-component';
import { Icon } from "@iconify/react"
import styled from 'styled-components';
import { commarNumber, dateMinus, returnMoment } from 'src/@core/utils/function';
import { motion } from "framer-motion"
import themeConfig from 'src/configs/themeConfig';
import { useTheme } from '@emotion/react';
import FallbackSpinner from 'src/@core/components/spinner';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
const BannerContainerPc = styled.div`
max-width:1200px;
margin:0 auto 1rem auto;
width:100%;
display:block;
border-radius:10px;
@media (max-width: 1350px) {
  display:none;
}
`
const BannerContainerMobile = styled.div`
max-width:1200px;
margin:0 auto 1rem auto;
width:100%;
display:none;
@media (max-width: 1350px) {
  display:block;
}
`
const MerchandiseContainer = styled.div`
width: 100%;
display: flex;
flex-wrap:wrap;
column-gap: 66px;
grid-row-gap: 10px;
row-gap: 30px;
margin:2rem auto;
@media (max-width: 1350px) {
  column-gap: 4.2vw;
}
@media (max-width: 850px) {

}
@media (max-width: 550px) {
  column-gap: 4.2vw;
  row-gap: 1rem;
}
`
const MerchandiseImgContainer = styled.div`
width: 100%;
height: 70%;
margin:0 auto;
border-bottom-right-radius:10px;
border-bottom-left-radius:10px;
display:flex;
@media (max-width: 850px) {
  width: 25%;
  height: 100%;
  margin:auto 0;
}

`
const MerchandiseImg = styled.img`
width:50%;
height:71.4%;
margin:auto;
border-radius:10px;
@media (max-width: 850px) {
  width: 72%;
  height:80%;
}
@media (max-width: 320px) {
  height:65%;
}
`
const MerchandiseExplain = styled.div`
width: 90%;
height: 20%;
margin: auto auto 5% auto;
display:flex;
flex-direction:column;
justify-content:space-between;
@media (max-width: 1350px) {
  font-size:${themeObj.font_size.font3};
}
@media (max-width: 850px) {
  width: 70%;
  height: 80%;
  margin: auto;
}
`
const MerchandiseName = styled.div`
font-size:${themeObj.font_size.font4};
width: 80%;
margin:0.5rem auto 0 auto;
`
const NewIcon = styled.img`
position: absolute;
top: -0.25rem;
left: 0.25rem;
`
const TopText = styled.h1`
margin: 4rem 0;
@media (max-width: 850px) {
  margin: 1rem 0;
  display:none;
}
`
const Merchandise = (props) => {

  const { item, theme, router, idx } = props;

  return (
    <>

      <MerchandiseExplain>
        <Font2 style={{ fontWeight: 'bold' }}>{item?.mcht_name}</Font2>
        <Font4 style={{ color: theme.palette.grey[400] }}>{commarNumber(item?.dist)}km</Font4>
        <Row style={{ margin: '0', alignItems: 'center' }}>
          {item?.count?.point || typeof item?.count?.point == 'number' ?
            <>
              <Icon icon='mdi:alpha-p-box' style={{ color: themeObj.yellow, fontSize: '1rem' }} />
              <div style={{ margin: '0 0.5rem 0.1rem 0.1rem' }}>{commarNumber(item?.count?.point)}</div>
            </>
            :
            <>
            </>}
          {item?.count?.stamp || typeof item?.count?.stamp == 'number' ?
            <>
              <Icon icon='ph:stamp-fill' style={{ color: themeObj.green, fontSize: '1rem' }} />
              <div style={{ margin: '0 0.5rem 0.1rem 0.1rem' }}>{commarNumber(item?.count?.stamp)}</div>
            </>
            :
            <>
            </>}
          {item?.count?.coupon || typeof item?.count?.coupon == 'number' || true ?
            <>
              <Icon icon='mdi:coupon' style={{ color: themeObj.red, fontSize: '1rem' }} />
              <div style={{ margin: '0 0.5rem 0.1rem 0.1rem' }}>{commarNumber(item?.count?.coupon)}</div>
            </>
            :
            <>
            </>}
        </Row>
      </MerchandiseExplain>
      <MerchandiseImgContainer>
        <MerchandiseImg src={item?.profile_img} />
      </MerchandiseImgContainer>
      {/* {dateMinus(returnMoment().substring(0, 10), item?.created_at.substring(0, 10)) <= 30 ?
          <>
            <NewIcon src='/images/icons/project-icons/new-icon.svg' />
          </>
          :
          <>
          </>} */}
    </>
  )
}
const Home1 = (props) => {
  const {
    data: {
      data,
      mchtLoading,
      mchts,
      page
    },
    func: {
      onClickMembershipCategory,
      onFilterClick,
      router,
      getHomeContent
    } } = props;
  const theme = useTheme();
  const lastMchtRef = useRef(null);
  const observer = useRef(null);
  const [currentPage, setCurrentPage] = useState(page)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    if (lastMchtRef.current && !mchtLoading) {
      observer.current = new IntersectionObserver(handleObserver, options);
      observer.current.observe(lastMchtRef.current);
    }
  }, [lastMchtRef.current]);
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      getHomeContent(page + 1)
    }
  };

  return (
    <>
      <ContentWrapper>
        <TopText>
          Comagain에 오신 것을 환영합니다.
        </TopText>
        <Row style={{ justifyContent: 'space-between', fontSize: themeObj.font_size.font3, margin: '0 auto 0 0', maxWidth: '400px' }}>
          <Row style={{ alignItems: 'center', cursor: 'pointer' }}>
            <Icon icon='mdi:alpha-p-box' style={{ color: themeObj.yellow, marginRight: '0.5rem', fontSize: '1.6rem' }} />
            <div>포인트 {commarNumber(data?.total?.point)}</div>
          </Row>
          <Row style={{ alignItems: 'center', cursor: 'pointer' }}>
            <Icon icon='ph:stamp-fill' style={{ color: themeObj.green, marginRight: '0.5rem', fontSize: '1.6rem' }} />
            <div>스탬프 {commarNumber(data?.total?.stamp)}</div>
          </Row>
          <Row style={{ alignItems: 'center', cursor: 'pointer' }}>
            <Icon icon='mdi:coupon' style={{ color: themeObj.red, marginRight: '0.5rem', fontSize: '1.6rem' }} />
            <div>쿠폰 {commarNumber(data?.total?.coupon)}</div>
          </Row>
        </Row>
        <Row style={{ justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <div />
          <Row style={{ alignItems: 'center', cursor: 'pointer' }} onClick={onFilterClick}>
            <div>거리순</div>
            <Icon icon='mi:filter' style={{ marginLeft: '0.1rem', fontSize: '1.2rem' }} />
          </Row>
        </Row>
        <MerchandiseContainer>
          {mchts && mchts.map((item, idx) => {
            if (idx == mchts.length - 1) {
              return <motion.div
                whileHover={{ scale: 1.01, boxShadow: `4px 12px 30px 6px rgba(0, 0, 0, 0.19)`, transform: `translateY(-0.5rem)` }}
                onHoverStart={e => { }}
                onHoverEnd={e => { }}
                style={{
                  background: `${theme.palette.mode == 'dark' ? '#222224' : '#fff'}`
                }}
                className={`merchandise-content mcht-${idx}`}
                onClick={() => {
                  router.push({
                    pathname: `/app/merchandise/detail/${item?.id}`,
                    state: {
                      item: item
                    }
                  })
                }}
                ref={lastMchtRef}
              >
                <Merchandise
                  idx={idx}
                  item={item}
                  theme={theme}
                  router={router}
                />
              </motion.div>
            } else {
              return <motion.div
                whileHover={{ scale: 1.01, boxShadow: `4px 12px 30px 6px rgba(0, 0, 0, 0.19)`, transform: `translateY(-0.5rem)` }}
                onHoverStart={e => { }}
                onHoverEnd={e => { }}
                style={{
                  background: `${theme.palette.mode == 'dark' ? '#222224' : '#fff'}`
                }}
                className={`merchandise-content mcht-${idx}`}
                onClick={() => {
                  router.push({
                    pathname: `/app/merchandise/detail/${item?.id}`,
                    state: {
                      item: item
                    }
                  })
                }}
              >
                <Merchandise
                  idx={idx}
                  item={item}
                  theme={theme}
                  router={router}
                />
              </motion.div>
            }

          })}
        </MerchandiseContainer>
        {mchtLoading ?
          <>
            <FallbackSpinner sx={{ height: '72px' }} />
          </>
          :
          <>
          </>}
      </ContentWrapper>
    </>
  )
}
export default Home1;
// 13 15 10 12 20
