import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Rooms from "./Components/Rooms/Rooms";

const Routing = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/Mirana" exact component={App} />
          <Route path="/Rooms" exact component={Rooms} />
        </Switch>
      </>
    </Router>
  );
};

export default Routing;
