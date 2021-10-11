import React from "react";
import banner from "../../image/AboutBanner.png";
// import bannerMob from "../../image/mobBannerRoom.png";
import "./BannerAbout.scss";
import CustomSlider from "../Slider";
// import useWindowSize from "../useWindowSize";

const bannerDetails = [
  {
    image: banner,
    title: "About Us",
  },
  // {
  //   image: banner,
  //   title: "Mirana Resort",
  // },
];

const Banner1 = ({ image, title }) => {
  // const [width] = useWindowSize();
  return (
    <div className="bannerRest1">
        <img src={image} alt="banner" loading="lazy" />
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bannerRest">
      <CustomSlider>
        {bannerDetails.map((item, index) => (
          <div key={index}>
            <Banner1 {...item} />
          </div>
        ))}
      </CustomSlider>
    </div>
  );
};

export default Banner;
