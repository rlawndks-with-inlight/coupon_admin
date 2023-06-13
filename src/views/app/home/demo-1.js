import { ContentWrapper, Font2, Font4, Row, Wrapper, themeObj } from 'src/@core/layouts/components/app/style-component';
import { Icon } from "@iconify/react"
import styled from 'styled-components';
import useCountNum, { commarNumber, isPc } from 'src/@core/utils/function';
import { motion } from "framer-motion"
import { useTheme } from '@emotion/react';
import FallbackSpinner from 'src/@core/components/spinner';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import $ from 'jquery';
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
  margin: auto 0;
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
const GrowUpCount = styled.div`
animation: count 1s linear forwards;
@keyframes count {
  from {
    counter-reset: number 0;
  }
  to {
    counter-increment: number 10000;
  }
}
`
const getProfileImg = (theme, item) => {
  let img_src = false;
  let style = {}
  if (theme.palette.mode == 'dark') {
    if (item?.profile_img) {
      img_src = item?.profile_img;
    } else if (item?.dark_logo_img) {
      img_src = item?.dark_logo_img;
      style = {
        height: 'auto'
      }
    }
  } else {
    if (item?.profile_img) {
      img_src = item?.profile_img;
    } else if (item?.logo_img) {
      img_src = item?.logo_img;
      style = {
        height: 'auto'
      }
    }
  }
  if (img_src) {
    return <MerchandiseImg src={img_src} style={style} />
  } else {
    return <Icon icon='solar:shop-2-outline' className='shop-icon' style={{ color: `${theme.palette.mode == 'dark' ? '#fff' : themeObj.grey[500]}`, margin: 'auto' }} />
  }
}
const Merchandise = (props) => {

  const { item, theme, router, idx, dnsData, setIsVisible } = props;

  const goToLink = (is_true) => {
    if (is_true) {
      setIsVisible(false);
      router.push({
        pathname: `/app/merchandise/detail/${item?.id}`,
        query: { item: JSON.stringify(item) }
      })
    }
  }
  const [startY, setStartY] = useState(null);
  const [moveY, setMoveY] = useState(null);
  const handleTouchStart = (event) => {
    setStartY(event.touches[0].clientY);
  };
  const handleTouchMove = (event) => {
    if (!isPc()) {
      if (event.touches.length == 0) {
        if (moveY > -5 && moveY < 5) {
          return goToLink(true);
        } else {
          return;
        }
      }
      const currentY = event.touches[0].clientY;
      const deltaY = startY - currentY;
      setMoveY(deltaY)
      if (deltaY > -5 && deltaY < 5) {
      }
    }

  };
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01, transform: `translateY(-0.5rem)` }}
        onClick={() => goToLink(isPc())}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchMove}
        // onPointerEnter={() => goToLink(window.innerWidth < 1000)}
        // onClick={() => goToLink(window.innerWidth >= 1000)}
        style={{
          background: `${theme.palette.mode == 'dark' ? dnsData?.options?.app?.dark_box_color ?? "#222224" : '#fff'}`,
        }}
        className={`merchandise-content mcht-${idx} pointer`}
      >
        <MerchandiseExplain>
          <Font2 style={{ fontWeight: 'bold' }}>{item?.mcht_name}</Font2>
          <Font4 style={{ color: theme.palette.grey[400] }}>{commarNumber(item?.dist)}km</Font4>
          <Row style={{ margin: '0', alignItems: 'center' }}>
            {(item?.count?.point || typeof item?.count?.point == 'number') && item?.point_flag ?
              <>
                <Icon icon='mdi:alpha-p-box' style={{ color: themeObj.yellow, fontSize: '1rem' }} />
                <div style={{ margin: '0 0.5rem 0 0.1rem' }}>{commarNumber(useCountNum(item?.count?.point))}</div>
              </>
              :
              <>
              </>}
            {(item?.count?.stamp || typeof item?.count?.stamp == 'number') && item?.stamp_flag ?
              <>
                <Icon icon='ph:stamp-fill' style={{ color: themeObj.green, fontSize: '1rem' }} />
                <div style={{ margin: '0 0.5rem 0 0.1rem' }}>{commarNumber(useCountNum(item?.count?.stamp))}</div>
              </>
              :
              <>
              </>}
            {item?.count?.coupon || typeof item?.count?.coupon == 'number' || true ?
              <>
                <Icon icon='mdi:coupon' style={{ color: themeObj.red, fontSize: '1rem' }} />
                <div style={{ margin: '0 0.5rem 0 0.1rem' }}>{commarNumber(useCountNum(item?.count?.coupon))}</div>
              </>
              :
              <>
              </>}
          </Row>
        </MerchandiseExplain>
        <MerchandiseImgContainer>
          {getProfileImg(theme, item)}
        </MerchandiseImgContainer>
        {/* {dateMinus(returnMoment().substring(0, 10), item?.created_at.substring(0, 10)) <= 30 ?
          <>
            <NewIcon src='/images/icons/project-icons/new-icon.svg' />
          </>
          :
          <>
          </>} */}
      </motion.div>
    </>
  )
}

const OptionPopup = (props) => {

  return (
    <>
    </>
  )
}
const Home1 = (props) => {
  const {
    data: {
      data,
      mchts,
      page,
      dnsData,
      isDataEnd,
      total,
      location
    },
    func: {
      onClickMembershipCategory,
      onFilterClick,
      setPage,
      router,
      getHomeContent
    } } = props;
  const theme = useTheme();
  const [mchtLoading, setMchtLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);


  const [options, setOptions] = useState({

  })
  const [optionsOpen, setOptionsOpen] = useState(false);

  const scrollRef = useRef(null);
  const handleScroll = () => {
    if (!scrollRef.current) {
      return;
    }
    const { top, bottom } = scrollRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (top < windowHeight && bottom >= 0 && !mchtLoading) {
      setMchtLoading(true);
      $('.more-page').trigger("click");
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (mchts.length > 0) {
      setMchtLoading(false);
    }
  }, [mchts])
  return (
    <>

      <Wrapper dns_data={dnsData}>
        {isVisible ?
          <>
            <ContentWrapper>
              <TopText>
                Comagain에 오신 것을 환영합니다.
              </TopText>
              <Row style={{ justifyContent: 'space-between', fontSize: themeObj.font_size.font3, margin: '0 auto 0 0', maxWidth: '400px' }}>
                <Row style={{ alignItems: 'center', width: '33.33%' }}>
                  <Icon icon='mdi:alpha-p-box' style={{ color: themeObj.yellow, marginRight: '0.25rem', fontSize: '1.2rem' }} />
                  <div>포인트</div>
                  <div style={{ margin: '0 0.5rem 0 auto' }}>{commarNumber(total?.point)}</div>
                </Row>
                <Row style={{ alignItems: 'center', width: '33.33%' }}>
                  <Icon icon='ph:stamp-fill' style={{ color: themeObj.green, marginRight: '0.25rem', fontSize: '1.2rem' }} />
                  <div >스탬프</div>
                  <div style={{ margin: '0 0.5rem 0 auto' }}>{commarNumber(total?.stamp)}</div>
                </Row>
                <Row style={{ alignItems: 'center', width: '33.33%' }}>
                  <Icon icon='mdi:coupon' style={{ color: themeObj.red, marginRight: '0.25rem', fontSize: '1.2rem' }} />
                  <div>쿠폰</div>
                  <div style={{ margin: '0 0.5rem 0 auto' }}>{commarNumber(total?.coupon)}</div>
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
                  return <Merchandise
                    idx={idx}
                    item={item}
                    theme={theme}
                    router={router}
                    dnsData={dnsData}
                    setIsVisible={setIsVisible}
                  />
                })}
              </MerchandiseContainer>
              {isDataEnd ?
                <>
                </>
                :
                <>
                  {mchtLoading ?
                    <>
                      <FallbackSpinner sx={{ height: '72px' }} />
                    </>
                    :
                    <>
                      <Button className='more-page' onClick={() => { getHomeContent(page + 1, false, dnsData, location, options) }} ref={scrollRef} />
                    </>}
                </>}
            </ContentWrapper>
          </>
          :
          <>
          </>
        }
      </Wrapper>
    </>
  )
}
export default Home1;
// 13 15 10 12 20
