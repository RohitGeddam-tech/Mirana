import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Routing = () => {
  return (
    <Router>
      <>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/Mirana" exact component={App} />
        </Switch>
      </>
    </Router>
  );
};

export default Routing;
