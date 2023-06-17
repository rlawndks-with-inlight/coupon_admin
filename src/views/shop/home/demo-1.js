import { ContentWrapper, Wrapper } from "src/@core/layouts/components/shopping-mall/style-component"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Items from "src/views/components/shopping-mall/Items"

const Home1 = (props) => {
  const {
    data: {
      ads,
      items
    },
    func: {

    } } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Wrapper>
        <Slider {...settings}>
          {ads.length > 0 && ads.map((item, idx) => (
            <>
              <img
                effect="blur"
                className="banner-img"
                src={item?.ad_img} alt={item?.ad_name}
              />
            </>
          ))}
        </Slider>
        <ContentWrapper>
          <Items items={items} />
        </ContentWrapper>
      </Wrapper>
    </>
  )
}
export default Home1;
