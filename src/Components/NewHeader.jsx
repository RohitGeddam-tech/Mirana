import React, { useState } from "react";
// import "./Nav.scss";
import "./Header.scss";
import { NavHashLink } from "react-router-hash-link";
import useWindowSize from "./useWindowSize";
import Ham from "./Hamburger";
import XHam from "./Xham";
import logo from "../image/logo.png";
import account from "../image/account.png";
import LoginBtn from "./LoginBtn";
// import moment from "moment";

const NewHeader = () => {
  const [width] = useWindowSize();
  const [isActive, setActive] = useState(false);
  const side = isActive ? "side active" : "side";
  return (
    <div className="nav">
      <div className="mob">
        <div className="container">
          <div className="call">
            <p>Call Us: </p>
            <a href="tel:+919820347152" style={{ margin: "0 5px" }}>
              +91 9820347152 |{" "}
            </a>
            <a href="tel:+919970266970">+91 9970266970</a>
          </div>
        </div>
      </div>
      {width < 1170 ? (
        <>
          <div className="header">
            <nav className="container">
              <div className="nav-image">
                <NavHashLink to="/#top" onClick={() => setActive(false)}>
                  <img src={logo} alt="logo" />
                </NavHashLink>
              </div>
            </nav>
            <div className="nav-links">
              {isActive ? (
                <>
                  <XHam
                    ClickHandle={() => {
                      setActive(!isActive);
                    }}
                  />
                </>
              ) : (
                <Ham
                  ClickHandle={() => {
                    setActive(!isActive);
                  }}
                />
              )}
            </div>
            {/* <div className="profile">
              <LoginBtn close={`loginBtn`} cancel={true} />
            </div> */}
          </div>
          <div className={side}>
            <div className="container">
              {/* <li>
                <NavHashLink to="/#top" className="navfade">
                  Home
                </NavHashLink>
              </li> */}
              <li>
                <NavHashLink to="/About#top" className="navfade">
                  About Us
                </NavHashLink>
              </li>
              <li>
                {" "}
                <NavHashLink to="/Rooms#top" className="navfade">
                  Rooms
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="/Restaurant#top" className="navfade">
                  Restaurant
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="/Attract#top" className="navfade">
                  Attractions
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="/Contact#top" className="navfade">
                  Contact Us
                </NavHashLink>
              </li>
              <li>
                <NavHashLink to="/Book#top" className="btn">
                  Book Now
                </NavHashLink>
              </li>
              {/* <li>
                <LoginBtn close="loginBtn" cancel={true} />
              </li> */}
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="header">
            <div className="container">
              <NavHashLink to="/#top">
                <img src={logo} alt="logo" onClick={() => setActive(false)} />
              </NavHashLink>
              <div className="navDetails">
                {/* <NavHashLink to="/#top" className="navfade">
                  Home
                </NavHashLink> */}
                <NavHashLink to="/About#top" className="navfade">
                  About Us
                </NavHashLink>
                <NavHashLink to="/Rooms#top" className="navfade">
                  Rooms
                </NavHashLink>
                <NavHashLink to="/Restaurant#top" className="navfade">
                  Restaurant
                </NavHashLink>
                <NavHashLink to="/Attract#top" className="navfade">
                  Attractions
                </NavHashLink>
                <NavHashLink to="/Contact#top" className="navfade">
                  Contact Us
                </NavHashLink>
                <NavHashLink
                  // onClick={() => {
                  //   sessionStorage.clear();
                  //   sessionStorage.setItem("guestData", 1);
                  //   sessionStorage.setItem("roomData", 1);
                  //   sessionStorage.setItem(
                  //     "date1Data",
                  //     JSON.stringify(new Date())
                  //   );
                  //   sessionStorage.setItem(
                  //     "date2Data",
                  //     JSON.stringify(moment(new Date()).add(1, "days"))
                  //   );
                  // }}
                  to="/Book#top"
                  className="btn"
                  style={{ marginLeft: "10px" }}
                >
                  Book Now
                </NavHashLink>
                {/* <a style={{ marginLeft: "20px" }}>
                  <LoginBtn close={`loginBtn`} cancel={true} />
                </a> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewHeader;
