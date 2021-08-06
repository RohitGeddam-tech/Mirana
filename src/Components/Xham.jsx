import React from "react";
import "./hamburger.css";

const Hamburger = ({ ClickHandle }) => {
  return (
    <>
      <div className="menu-btnx" onClick={ClickHandle}>
        <div className="xline1"></div>
        <div className="xline2"></div>
      </div>
    </>
  );
};

export default Hamburger;
