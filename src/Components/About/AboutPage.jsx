import React from "react";
import Banner from "./BannerAbout";
import NewHeader from "../NewHeader";
import Footer from "../Footer";
import chef from "../../image/founder.png";

const Rooms = () => {
  return (
    <div className="App">
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <Banner />
        <div className="aboutPage">
          <div className="container">
            {/* <h1>Our Chef</h1> */}
            <div className="info">
              <img src={chef} alt="chef" />
              <div className="box">
                <h1>The Founder</h1>
                <p>
                  Rajeev Chakrabarti, Mirana’s founder, has always had his head
                  full of dreams. After all, that’s the skill set required to be
                  a leader in the media world. He’s shaped leading brands,
                  produced larger-than-life events, signed off on heart touching
                  campaigns and grown some of the biggest businesses in the
                  media industry. And now he’s dreaming all the time, on adding
                  a Spanish flair to Indian modernist hospitality with a
                  boutique hotel he would stay at every time he’s in Alibaug.
                  Rajeev : +91 9820347152
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;
