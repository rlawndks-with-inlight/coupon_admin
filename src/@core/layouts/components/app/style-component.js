import { Icon } from "@iconify/react"
import styled from "styled-components"

export const Wrapper = styled.div`
display:flex;
flex-direction:column;
min-height:90vh;
`
export const ContentWrapper = styled.div`
max-width:1200px;
width:90%;
margin: 1rem auto;
`
export const Row = styled.div`
display:flex;
`
export const themeObj = {
  red: '#C92323',
  green: '#048B48',
  yellow: '#FDC604',
  font_size: {
    font1: '20px',
    font2: '15px',
    font3: '13px',
    font4: '12px',
    font5: '10px',
  },
}
export const Font1 = styled.div`
  font-size:${themeObj.font_size.font1};
  @media (max-width: 850px) {
    font-size:${themeObj.font_size.font2};

  }
`
export const Font2 = styled.div`
font-size:${themeObj.font_size.font2};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font3};

}
`
export const Font3 = styled.div`
font-size:${themeObj.font_size.font3};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font4};

}
`
export const Font4 = styled.div`
font-size:${themeObj.font_size.font4};
@media (max-width: 850px) {
font-size:${themeObj.font_size.font5};

}
`
export const Font5 = styled.div`
font-size:${themeObj.font_size.font5};
`
