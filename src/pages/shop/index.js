import ShoppingMallLayout from "src/@core/layouts/ShoppingMallLayout"
import { ContentWrapper, Wrapper } from "src/@core/layouts/components/shopping-mall/style-component"
import { useKeenSlider } from 'keen-slider/react'
import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { processCatch } from "src/@core/utils/function"
import { getLocalStorage } from "src/@core/utils/local-storage"
import { LOCALSTORAGE } from "src/data/data"
import { axiosIns } from "src/@fake-db/backend"
import { useSettings } from "src/@core/hooks/useSettings"
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Items from "src/views/components/shopping-mall/Items"
import FallbackSpinner from "src/@core/components/spinner"
const Home = () => {
  const {
    settings: { direction }
  } = useSettings()

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [ads, setAds] = useState([]);
  useEffect(() => {
    getHomeContent();
  }, [])
  const getHomeContent = async () => {
    try {
      setLoading(true);
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      const response = await axiosIns().get(`/api/v1/shop/index?page=1&page_size=1000000&s_dt=1900-01-01&e_dt=2500-01-01&cate_id=0&brand_id=${dns_data?.id}&search=`);
      if (response?.data?.categories.length == 0) {
        toast.error("카테고리를 먼저 등록해 주세요.");
        router.back();
      }
      setAds(response?.data?.advertisements);
      setItems(response?.data?.content);
      setLoading(false);
    } catch (err) {
      let push_lick = await processCatch(err);
      if (push_lick == -1) {
        router.back();
      } else {
        if (push_lick) {
          router.push(push_lick);
        }
      }
    }
  }
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
        {loading ?
          <>
            <FallbackSpinner sx={{ height: '300px' }} />
          </>
          :
          <>
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
          </>}

      </Wrapper>
    </>
  )
}
Home.getLayout = page => <ShoppingMallLayout>{page}</ShoppingMallLayout>

export default Home
