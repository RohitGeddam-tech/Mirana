import React from "react";
// import slide1 from "../image/slide1.png";
// import slide2 from "../image/slide2.png";
// import about1 from "../image/about1.png";
// import about2 from "../image/about2.png";
import CustomSlider from "../CustomSlider";
import arrow from "../../image/Frame2.png";
import "./GalleryRoom.scss";

const Gallery = () => {
  return (
    <div className="galleryRoom">
      <div className="container">
        <h1>Room Gallery</h1>
        <div className="Slider">
          <CustomSlider dot={false} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
