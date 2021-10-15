import React from "react";
import { NavHashLink } from "react-router-hash-link";
import logo from "../image/logo.png";
import "./Side.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="logo" />
      <div className="links">
        <NavHashLink
          to="/RoomBack#top"
          className="backLinks"
          activeClassName="active"
        >
          Rooms
        </NavHashLink>
        <NavHashLink
          to="/PackagesBack#top"
          className="backLinks"
          activeClassName="active"
        >
          Packages
        </NavHashLink>
        <NavHashLink
          to="/BookBack#top"
          // className="backLinks"
          className={`${
            window.location.href.includes("BookBack") ? "backLinks active" : "backLinks"
          }`}
        >
          Bookings
        </NavHashLink>
      </div>
      <div className="navBorder">
        <div className="border"></div>
      </div>
    </div>
  );
};

export default Sidebar;
