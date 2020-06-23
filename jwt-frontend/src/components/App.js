import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import AuthenticatedComponent from "./AuthenticatedComponent";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={AuthenticatedComponent} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
