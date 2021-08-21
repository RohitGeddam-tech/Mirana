import React from "react";
import Banner from "./BannerRoom";
import NewHeader from "../NewHeader";
import Gallery from "./GalleryRoom";
import Footer from "../Footer";
import Inclusion from "./Inclusion";
import arrow from "../../image/Frame1.png";
import Ammenity from "./Ammenity";
import { NavHashLink } from "react-router-hash-link";

const Rooms = () => {
  return (
    <div className="App">
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <Banner />
        <Gallery />
        <Ammenity />
        <Inclusion />
        <div className="end">
          <div className="container">
            <h1 style={{ color: "white" }}>Reserve your room today!</h1>
            <NavHashLink to="/Rooms#top" className="btn">
              Choose Rooms
              <span>
                <img src={arrow} alt="arrow" />
              </span>
            </NavHashLink>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;
