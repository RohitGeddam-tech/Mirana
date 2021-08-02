import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../image/slide1.png";
import slide2 from "../image/slide2.png";
import about1 from "../image/about1.png";
import about2 from "../image/about2.png";

const CustomSlider = ({ children }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    initialSlide: 0,
    // nextArrow: <SliderNextArrow />,
    // prevArrow: <SliderPrevArrow />,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        <img src={slide1} alt="galleryImg" />
        <img src={slide2} alt="galleryImg" />
        <img src={about1} alt="galleryImg" />
        <img src={about2} alt="galleryImg" />
      </Slider>
    </>
  );
};

export default CustomSlider;
