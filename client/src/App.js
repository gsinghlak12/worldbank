import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import History from "./History";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home </Link>

        <Link to="/register">Register </Link>

        <Link to="/login">Login </Link>

        <Link to="/search">Search </Link>

        <Link to="/history">History </Link>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/search" component={Search} />
          <Route path="/history" component={History} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
