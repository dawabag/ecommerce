import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap"
import SlideCard from "./SliderCard/SlideCard"
import { fetchAds } from "../utils/products"
import { useEffect, useState } from "react"

const SliderHome = () => {

  const [ads, setAds] = useState([])
  useEffect(() => {
    fetchAds();

    const loadProducts = async () => {
      const fetchedProducts = await fetchAds();
      setAds(fetchedProducts);
    };

    loadProducts();
  }, []);
  const settings = {
    nav:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
      <section className='homeSlide'>
        <Container>
          <Slider {...settings}>
          {ads.map((value, index) => {
            return (
              <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
            )
          })}
        </Slider>
        </Container>
      </section>
  )
}

export default SliderHome
