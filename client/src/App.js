import "./App.css";
import React, { useState } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import History from "./History";
import Team from "./Team";
import Register from "./Register";
import { Button, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import women from "./Components/women-of-world.png";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState({ userType: "standard" });
  const [registered, setRegister] = useState(false);

  const onEnterKey = (e, callback) => {
    if (e.charCode === 13) {
      callback();
    }
  };

  async function deleteCookie() {
    const response = await fetch(`http://localhost:8080/api/sessions/`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const setNavButtons = () => {
    if (!loggedIn) {
      return (
        <div className="col-xs-3">
          <Link to="/login">
            <Button className="mx-2" variant="outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-unlock"
                viewBox="0 0 16 16"
              >
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"></path>
              </svg>{" "}
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="mx-2" variant="outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-person-plus"
                viewBox="0 0 16 16"
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                <path
                  fill-rule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                ></path>
              </svg>{" "}
              Register
            </Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/history">
            <Button className="mx-2" variant="outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-clock-history"
                viewBox="0 0 16 16"
              >
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path>
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path>
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path>
              </svg>{" "}
              History
            </Button>
          </Link>
          <Button
            onClick={async (e) => {
              // e.preventDefault();
              setLoggedIn(false);
              await deleteCookie();
            }}
            className="mx-2"
            variant="outline-secondary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"></path>
            </svg>{" "}
            Logout
          </Button>
        </div>
      );
    }
  };

  return (
    <Router>
      <Nav className="navbar p-2 mb-5 bg-light text-dark fixed-top d-flex align-content-center">
        <div>
          <Link to="/">
            <Button className="mx-2" variant="outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                ></path>
              </svg>
            </Button>
          </Link>
          <Link to="/search">
            <Button className="mx-2" variant="outline-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
              </svg>
              {"  "}
              Search
            </Button>
          </Link>
        </div>
        <div>
          <h5 className="pt-2 text-dark text-center">THE WORLD FOR WOMEN</h5>
        </div>
        {setNavButtons()}
      </Nav>

      <Container className="d-flex overflow-auto justify-content-center align-content-center position-absolute top-50 start-50 translate-middle">
        <Switch>
          <Route exact path="/">
            <Home deleteCookie={deleteCookie} setLoggedIn={setLoggedIn} />
          </Route>
          <Route exact path="/login">
            {loggedIn ? (
              <Redirect to="/search" />
            ) : (
              <Login onEnterKey={onEnterKey} setLoggedIn={setLoggedIn} />
            )}
          </Route>
          <Route exact path="/register">
            {/* <Register
								onEnterKey={onEnterKey}
								setRegister={setRegister}
								registered={registered}
							/> */}

            {registered ? (
              <Redirect to="/login" />
            ) : (
              <Register
                onEnterKey={onEnterKey}
                setRegister={setRegister}
                registered={registered}
              />
            )}
          </Route>
          <Route exact path="/search">
            <Search loggedIn={loggedIn} />
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
          <Route exact path="/about">
            <Team />
          </Route>
        </Switch>
      </Container>
      <footer className="container-fluid fixed-bottom p-1 bg-light text-dark">
        <div className="text-center ">
          Built by{" "}
          <Link className="link-dark" to="/about">
            Team μ
          </Link>{" "}
          @{" "}
          <a
            href="https://sigmalabs.co.uk/"
            target="_blank"
            rel="noreferrer"
            className="link-dark"
          >
            Sigma Labs
          </a>{" "}
          2021
        </div>
      </footer>
    </Router>
  );
}

export default App;
