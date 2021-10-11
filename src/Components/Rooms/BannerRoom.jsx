import React from "react";
import banner from "../../image/BannerRoom.png";
import bannerMob from "../../image/mobBannerRoom.png";
import "./BannerRoom.scss";
import CustomSlider from "../Slider";
import useWindowSize from "../useWindowSize";

const bannerDetails = [
  {
    image: banner,
    title: "Our Rooms",
  },
  // {
  //   image: banner,
  //   title: "Mirana Resort",
  // },
];

const Banner1 = ({ image, title }) => {
  const [width] = useWindowSize();
  return (
    <div className="bannerRoom1">
    {width > 540 ? (
      <img src={image} alt="banner" loading="lazy" />
    ) : (
      <img src={bannerMob} alt="banner" loading="lazy" />
    )}
      <div className="container">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bannerRoom">
      <CustomSlider>
        {bannerDetails.map((item, index) => (
          <div key={index}>
            <Banner1 {...item} />
          </div>
        ))}
      </CustomSlider>
      <div className="container">
        <p>
          Spanish architecture coupled with modern Indian aesthetic transforms
          Mirana into a picturesque property. Our spaces that are thoughtfully
          designed to bring our guests together yet offer a private haven to
          retreat into. Soft whispers from the sea and melodies of the greenery
          is what you'll wake up to and retire into during your stay at Mirana.
          Tempting you to make it a forever home.
        </p>
      </div>
    </div>
  );
};

export default Banner;
