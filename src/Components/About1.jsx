import React from "react";
import banner from "../image/about2.png";
import arrow from "../image/Frame2.png";
import "./About.scss";

const About1 = () => {
  return (
    <div className="About2">
      <div className="container">
        <div className="aboutImg">
          <img src={banner} alt="about" loading='lazy' />
        </div>
        <div className="aboutDetail">
          <h1>The Restaurant</h1>
          <p>
            If you catch yourself craving something authentic or something avant
            garde our highly experienced chefs have you covered. Mirana’s heart
            is set in its kitchen. It’s where cultures collide and magic is
            created. Mirana is fully equipped to offer an array of
            Mediterranean, Continental, south east Asian, Chinese, Italian and
            Indian meals. Host of flavours that make you want to gobble first
            and ‘gram later!
          </p>
          <div className="noImg">
            <img src={banner} alt="about" loading='lazy' />
          </div>
          <button className="btn">
            View More
            <span>
              <img src={arrow} alt="arrow" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About1;
