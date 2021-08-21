import React from "react";
import banner from "../../image/attract.png";
// import bannerMob from "../../image/mobBannerRoom.png";
import "./BannerAt.scss";
import CustomSlider from "../Slider";
// import useWindowSize from "../useWindowSize";

const bannerDetails = [
  {
    image: banner,
    title: "Attraction",
  },
  // {
  //   image: banner,
  //   title: "Mirana Resort",
  // },
];

const Banner1 = ({ image, title }) => {
  // const [width] = useWindowSize();
  return (
    <div className="bannerAt1">
        <img src={image} alt="banner" loading="lazy" />
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bannerAt">
      <CustomSlider>
        {bannerDetails.map((item, index) => (
          <div key={index}>
            <Banner1 {...item} />
          </div>
        ))}
      </CustomSlider>
      <div className="container">
        <h1 className="head">Within Mirana</h1>
        <p>
          If you’re looking to host a barbeque, a luncheon, a high-tea or merely
          a get-together with your folks, Mirana has cozy spaces that are
          capable of transforming into themes that suit every occasion.
        </p>
      </div>
    </div>
  );
};

export default Banner;
