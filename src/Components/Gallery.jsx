import React from "react";
// import slide1 from "../image/slide1.png";
// import slide2 from "../image/slide2.png";
// import about1 from "../image/about1.png";
// import about2 from "../image/about2.png";
import CustomSlider from "./CustomSliderNew";
import arrow from "../image/Frame2.png";
import "./Gallery.scss";

const Gallery = () => {
  return (
    <div className="gallery">
      <div className="container">
        <h1>Property Gallery</h1>
        {/* <div className="Slider">
          <div className="Slide">
            <img src={slide1} alt="galleryImg" />
            <img src={slide2} alt="galleryImg" />
            <img src={about1} alt="galleryImg" />
            <img src={about2} alt="galleryImg" />
          </div>
        </div> */}
        <div className="Slider">
          <CustomSlider dot={true} />
        </div>
        <div className="bottom">
          <a href="/Book#top" className="btn">
            Book Now{" "}
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
