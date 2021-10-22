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
import Register from "./Register";
import Search from "./Search";
import History from "./History";
import Team from "./Team";
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
