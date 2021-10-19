import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import History from "./History";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState({ userType: "standard" });

  const onEnterKey = (e, callback) => {
    if (e.charCode === 13) {
      callback();
    }
  };

  const setNavButtons = () => {
    if (!loggedIn) {
      return (
        <div className="hcol-xs-3">
          <Link to="/login">
            <Button className="btn-block">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="btn-block">Register</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="hcol-xs-3">
          <Link to="/history">
            <Button className="btn-block">History</Button>
          </Link>
          <Button className="btn-block">Logout</Button>;
        </div>
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="hcol-xs-3">
            <Link to="/">
              <Button className="btn-block">Home</Button>
            </Link>
            <Link to="/search">
              <Button className="btn-block">Search</Button>
            </Link>
          </div>
          {setNavButtons()}
        </header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login onEnterKey={onEnterKey} />
          </Route>
          <Route exact path="/register">
            <Register onEnterKey={onEnterKey} />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
