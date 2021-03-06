import React from "react";
import { NavHashLink } from "react-router-hash-link";
import banner from "../image/about1.webp";
import arrow from "../image/Frame2.png";
import "./About.scss";

const About2 = () => {
  return (
    <div className="About1">
      <div className="container">
        <div className="aboutDetail">
          <h1>Our Rooms</h1>
          <div className="noImg">
            <img src={banner} alt="about" loading="lazy" />
          </div>
          <p>
            Spanish architecture coupled with modern Indian aesthetic transforms
            Mirana into a picturesque property. Our spaces that are thoughtfully
            designed to bring our guests together yet offer a private haven to
            retreat into. Soft whispers from the sea and melodies of the
            greenery is what you'll wake up to and retire into during your stay
            at Mirana. Tempting you to make it a forever home.
          </p>
          <div className="bottom">
            <NavHashLink to="/Rooms#top" className="btn">
              View More
              <span>
                <img src={arrow} alt="arrow" />
              </span>
            </NavHashLink>
          </div>
        </div>
        <div className="aboutImg">
          <img src={banner} alt="about" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default About2;
