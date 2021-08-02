import React from "react";
import banner from "../image/about1.png";
import arrow from "../image/Frame2.png";
import "./About.scss";

const About2 = () => {
  return (
    <div className="About1">
      <div className="container">
        <div className="aboutDetail">
          <h1>Our Rooms</h1>
          <p>
            Spanish architecture coupled with modern Indian aesthetic transforms
            Mirana into a picturesque property. Our spaces that are thoughtfully
            designed to bring our guests together yet offer a private haven to
            retreat into. Soft whispers from the sea and melodies of the
            greenery is what you'll wake up to and retire into during your stay
            at Mirana. Tempting you to make it a forever home.
          </p>
          <button className="btn">
            View More
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </button>
        </div>
        <div className="aboutImg">
          <img src={banner} alt="about" />
        </div>
      </div>
    </div>
  );
};

export default About2;
