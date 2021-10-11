import React from "react";
import Banner from "./BannerAt";
import NewHeader from "../NewHeader";
import Footer from "../Footer";
// import chef from "../../image/chef.png";
import AtSlider from "./AtSlider";

const Rooms = () => {
  return (
    <div className="App">
      <NewHeader />
      <div style={{ paddingTop: "110px" }}>
        <Banner />
        <div className="thing">
          <div className="container">
            <h1>Things to do in Alibaug</h1>
            <p>
              Out of the many things to explore in Alibaug and around Nagaon,
              basking in the glory of various sunset points should top your
              charts. Be it by the pristine Nagaon, Kashid and Kihim Beach or
              from atop the Murud-Janjira Fort every view offers an experience
              of its own. Indulge the adventurer in you with a bumpy ride, go
              parasailing, speed boating or kick-back with easy cycling around
              the quaint shores of Nagaon. Don’t forget to shop at the Alibaug
              city market(s) and bring home some handicraft souvenirs.
            </p>
            <span>Also Explore :</span>
            <div className="Slider">
              <AtSlider dot={true} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;
