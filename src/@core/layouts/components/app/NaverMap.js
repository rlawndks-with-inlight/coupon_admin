import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const NaverMap = (props) => {
  const { markers, center, dnsData, style } = props;
  const [lat, setLat] = useState(37.74913611)
  const [lng, setLng] = useState(128.8784972)
  const mapRef = useRef(null)
  useEffect(() => {
    if (!dnsData) {
      return;
    }
    let dns_data = dnsData;
    console.log(dns_data)
    const location = new naver.maps.LatLng(center?.lat, center?.lng);
    //지도 그리기
    const map = (mapRef.current = new naver.maps.Map('map', {
      center: location,
      zoomControl: false,   // 줌 설정
      zoom: 15,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
        zIndex: 0
      },
    }));
    //마커 설정
    let markerOptions = {
      map,
      position: {
        x: markers[0]?.lng,
        y: markers[0]?.lat,
      }, //마커 좌표
    }
    if (dns_data?.map_marker_img) {
      markerOptions = Object.assign(markerOptions, {
        icon: {
          url: dns_data?.map_marker_img,
        },
      })
    }
    mapRef.current = new naver.maps.Marker(markerOptions);
  }, [center, markers, dnsData]);

  return <MapBox id="map" style={{ ...style }}></MapBox>;
}
const MapBox = styled.div`
  width: 1200px;
  height: 600px;
  margin: 0 auto;
  @media (max-width: 1200px) {
    width: 100%;
     height: 60vw;
}
`;
export default NaverMap;
