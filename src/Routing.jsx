import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Rooms from "./Components/Rooms/Rooms";
import Rest from "./Components/Restaurant/Rest";
import Attract from "./Components/Attract/Attract";
import AboutPage from "./Components/About/AboutPage";
import ContactPage from "./Components/ContactPage";
import Sign from "./Components/Sign";
import Book from "./Components/Book/Book";
import Pay from "./Components/Payment/Pay";
import Part2 from "./Components/Payment/Part2";

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
        </Switch>
      </>
    </Router>
  );
};

export default Routing;
