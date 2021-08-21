import React from "react";
import banner from "../../image/BannerRest.png";
// import bannerMob from "../../image/mobBannerRoom.png";
import "./BannerRest.scss";
import CustomSlider from "../Slider";
// import useWindowSize from "../useWindowSize";

const bannerDetails = [
  {
    image: banner,
    title: "Restaurant",
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
      <div className="container">
        <p>
          Our master chefs know how to tease and please your taste buds, with
          some of the finest produce tossed and stirred to prepare legacy
          recipes. Mirana is fully equipped to offer an array of Mediterranean,
          Continental, south east Asian, Chinese, Italian and Indian meals. Host
          of flavours that make you want to gobble first and ‘gram later!
        </p>
      </div>
    </div>
  );
};

export default Banner;
