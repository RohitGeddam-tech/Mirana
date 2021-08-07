import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../image/slide1.png";
import slide2 from "../image/slide2.png";
import about1 from "../image/about1.png";
import about2 from "../image/about2.png";
import SliderNextArrow from "./NextArrow";
import SliderPrevArrow from "./PrevArrow";

const CustomSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        <img src={slide1} alt="galleryImg" loading='lazy' />
        <img src={slide2} alt="galleryImg" loading='lazy' />
        <img src={about1} alt="galleryImg" loading='lazy' />
        <img src={about2} alt="galleryImg" loading='lazy' />
      </Slider>
    </>
  );
};

export default CustomSlider;
