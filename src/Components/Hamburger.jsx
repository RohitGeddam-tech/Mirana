import React from "react";
import "./hamburger.css";

const Hamburger = ({ ClickHandle }) => {
  return (
    <div className="menu-btn" onClick={ClickHandle}>
      <div className="line1"></div>
      <div className="line2"></div>
      <div className="line3"></div>
    </div>
  );
};

export default Hamburger;
