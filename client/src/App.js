import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import History from "./History";

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
        <div>
          <Link to="/register">
            <button>Register</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/history">
            <button>History</button>
          </Link>
          <button>Logout</button>;
        </div>
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <Link to="/">Home </Link>
        <Link to="/search">Search </Link>
        {setNavButtons()}
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
