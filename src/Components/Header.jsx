import React from "react";
import logo from "../image/Logo1.png";
import { NavHashLink } from "react-router-hash-link";
import "./Header.scss";

const Header = () => {
  return (
    <div className="nav">
      <div className="mob">
        <div className="container">
          <a href="tel:+919820347152">
            Call Us: +91 9820347152 | +91 9970266970{" "}
          </a>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <img src={logo} alt="logo" />
          <div className="navbar">
            <NavHashLink to="/#top">Home</NavHashLink>
            <NavHashLink to="/#top">Products & Accessories</NavHashLink>
            <NavHashLink to="/#top">About Us</NavHashLink>
            <NavHashLink to="/#top">FAQs</NavHashLink>
            <NavHashLink to="/#top">Contact Us</NavHashLink>
            <NavHashLink to="/#top" className="btn">
              Book Now
            </NavHashLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
