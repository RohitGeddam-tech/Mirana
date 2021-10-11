import React from "react";
import { NavHashLink } from "react-router-hash-link";
import Footer from "./Footer";
import NewHeader from "./NewHeader";
import pay from "../image/pay.png";
import "./MyBooking.scss";
import arrow from "../image/backarrow.png";

const MyBooking = () => {
  return (
    <>
      <NewHeader />
      <div className="myBook" style={{ paddingTop: "110px" }}>
        <div className="contain">
          <NavHashLink to="/#top" className="loginBtn">
            <span>
              <img src={arrow} alt="arrow" />
            </span>
            Back to homepage
          </NavHashLink>
          <h1>My Bookings</h1>
          <div className="first">
            <p>Upcoming</p>
            <div className="boxShade">
              <img src={pay} alt="pay" />
              <div className="inform">
                <div className="top">
                  <h5>Executive Package</h5>
                  <p>₹ 5540</p>
                </div>
                <div className="bottom">
                  <p>21 July 2021 to 22 July 2021 | 2 adults, 1 room</p>
                  <h5>Upcoming</h5>
                </div>
              </div>
            </div>
            <div className="last">
              <NavHashLink to="/#top">Cancel this booking</NavHashLink>
            </div>
          </div>
          <div className="second">
            <p>Others</p>
            <div className="boxShade">
              <img src={pay} alt="pay" />
              <div className="inform">
                <div className="top">
                  <h5>Executive Package</h5>
                  <p>₹ 5540</p>
                </div>
                <div className="bottom">
                  <p>05 March 2021 to 07 March 2021 | 2 adults, 1 room</p>
                  <h5>Completed</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="third">
            <div className="boxShade">
              <img src={pay} alt="pay" />
              <div className="inform">
                <div className="top">
                  <h5>Paradise Package</h5>
                  <p>₹ 5540</p>
                </div>
                <div className="bottom">
                  <p>31 December 2020 to 01 January | 5 adults, 2 room</p>
                  <h5>Cancelled</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
