import React from "react";
import Banner from "./BannerRoom";
import NewHeader from "../NewHeader";
import Gallery from "./GalleryRoom";
import Footer from "../Footer";
import Inclusion from "./Inclusion";
import Ammenity from "./Ammenity";

const Rooms = () => {
  return (
    <div className="App">
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
          <Banner />
          <Gallery />
          <Ammenity />
          <Inclusion />
          <Footer />
      </div>
    </div>
  );
};

export default Rooms;
