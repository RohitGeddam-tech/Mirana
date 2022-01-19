import React from "react";
// import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pay from "./Components/Payment/Pay";
import Part2 from "./Components/Payment/Part2";
import Part3 from "./Components/Payment/Part3";
import PackagesBack from "./Backend/PackagesBack";
import RoomBack from "./Backend/RoomBack";
import BookBack from "./Backend/BookBack";
import Upcoming from "./Backend/Upcoming";
import Cancelled from "./Backend/Cancelled";
import Complete from "./Backend/Complete";
import MyBooking from "./Components/MyBooking";

import loadable from "@loadable/component";
const App = loadable(() => import("./App"));
const Rooms = loadable(() => import("./Components/Rooms/Rooms"));
const Rest = loadable(() => import("./Components/Restaurant/Rest"));
const Attract = loadable(() => import("./Components/Attract/Attract"));
const AboutPage = loadable(() => import("./Components/About/AboutPage"));
const ContactPage = loadable(() => import("./Components/ContactPage"));
const Sign = loadable(() => import("./Components/Sign"));
const Book = loadable(() => import("./Components/Book/BookCopy"));
// import Rooms from "./Components/Rooms/Rooms";
// import Rest from "./Components/Restaurant/Rest";
// import Attract from "./Components/Attract/Attract";
// import AboutPage from "./Components/About/AboutPage";
// import ContactPage from "./Components/ContactPage";
// import Sign from "./Components/Sign";
// import Book from "./Components/Book/Book";

const Routing = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/Mirana" exact component={App} />
          <Route path="/Rooms" exact component={Rooms} />
          <Route path="/Contact" exact component={ContactPage} />
          <Route path="/Restaurant" exact component={Rest} />
          <Route path="/Attract" exact component={Attract} />
          <Route path="/About" exact component={AboutPage} />
          <Route path="/Sign" exact component={Sign} />
          <Route path="/Book" exact component={Book} />
          <Route path="/Pay" exact component={Pay} />
          <Route path="/Part2" exact component={Part2} />
          <Route path="/Part3" exact component={Part3} />
          <Route path="/PackagesBack" exact component={PackagesBack} />
          <Route path="/RoomBack" exact component={RoomBack} />
          <Route path="/BookBack" exact component={BookBack} />
          <Route path="/BookBack/Upcoming" exact component={Upcoming} />
          <Route path="/BookBack/Cancelled" exact component={Cancelled} />
          <Route path="/BookBack/Completed" exact component={Complete} />
          <Route path="/MyBookings" exact component={MyBooking} />
        </Switch>
      </>
    </Router>
  );
};

export default Routing;
