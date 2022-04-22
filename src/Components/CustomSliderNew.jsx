import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import slide1 from "../image/slide1.webp";
// import slide2 from "../image/slide2.webp";
// import about1 from "../image/about1.webp";
// import about2 from "../image/about2.webp";
import slide1 from "../image/Property Gallery - Mirana/1070.jpg";
import slide2 from "../image/Property Gallery - Mirana/1956.jpg";
import slide3 from "../image/Property Gallery - Mirana/1964.jpg";
import slide4 from "../image/Property Gallery - Mirana/1967.jpg";
import slide5 from "../image/Property Gallery - Mirana/1987.jpg";
import slide6 from "../image/Property Gallery - Mirana/2005.jpg";
import slide7 from "../image/Property Gallery - Mirana/2008.jpg";
import slide8 from "../image/Property Gallery - Mirana/2009.jpg";
import slide9 from "../image/Property Gallery - Mirana/2012.jpg";
import slide10 from "../image/Property Gallery - Mirana/2015.jpg";
import slide11 from "../image/Property Gallery - Mirana/2020.jpg";
import slide12 from "../image/Property Gallery - Mirana/2028.jpg";
import slide13 from "../image/Property Gallery - Mirana/2032.jpg";
import SliderNextArrow from "./NextArrow";
import SliderPrevArrow from "./PrevArrow";

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
          // arrows: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
          // arrows: false,
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        <img src={slide1} alt="galleryImg" loading="lazy" />
        <img src={slide2} alt="galleryImg" loading="lazy" />
        <img src={slide3} alt="galleryImg" />
        <img src={slide4} alt="galleryImg" />
        <img src={slide5} alt="galleryImg" />
        <img src={slide6} alt="galleryImg" />
        <img src={slide7} alt="galleryImg" />
        <img src={slide8} alt="galleryImg" />
        <img src={slide9} alt="galleryImg" />
        <img src={slide10} alt="galleryImg" />
        <img src={slide11} alt="galleryImg" />
        <img src={slide12} alt="galleryImg" />
        <img src={slide13} alt="galleryImg" />
      </Slider>
    </>
  );
};

export default CustomSlider;
