import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import forest from "../../image/forest.png";
import fort from "../../image/fort.png";
import water from "../../image/water.png";
import SliderNextArrow from "../NextArrow";
import SliderPrevArrow from "../PrevArrow";

const CustomSlider = ({ dot }) => {
  const settings = {
    dots: dot,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
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
        <div className="atslide">
          <img src={water} alt="water" />
          <div className="Attext">
            <p className="brown">Water Sports</p>
            <p>15 mins away (5 kms)</p>
          </div>
        </div>
        <div className="atslide">
          <img src={fort} alt="fort" />
          <div className="Attext">
            <p className="brown">Alibaug Fort</p>
            <p>15 mins away (5 kms)</p>
          </div>
        </div>
        <div className="atslide">
          <img src={forest} alt="forest" />
          <div className="Attext">
            <p className="brown">Sunset Points</p>
            <p>15 mins away (5 kms)</p>
          </div>
        </div>
        <div className="atslide">
          <img src={water} alt="water" />
          <div className="Attext">
            <p className="brown">Water Sports</p>
            <p>15 mins away (5 kms)</p>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default CustomSlider;
