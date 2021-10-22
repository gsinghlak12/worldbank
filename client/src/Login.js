import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login(props) {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    error: "",
    success: "",
  });
  const [SessionCount, setSessionCount] = useState(0);

  const [sessionUpdate, setSessionUpdate] = useState(0);

  useEffect(() => {
    if (sessionUpdate == 0) {
      checkSessionExists();
    }
  });

  const handleLoginInput = (e) => {
    const { username, password } = currentUser;
    setCurrentUser({
      username,
      password,
      [e.target.id]: e.target.value,
    });
    setMessage({
      error: "",
      success: "",
    });
  };

  const postLogin = async (e) => {
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        Access: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    };

    const response = await fetch(
      `https://world-for-women-12345.herokuapp.com/api/users/verify`,
      requestOptions
    );
    const json = await response.json();

    if (!response.ok) {
      setMessage({ error: json.status });
    } else {
      setMessage({ success: "Logged in!" });
      setTimeout(() => {
        props.setLoggedIn(true);
      }, 1000);
      postSession();
    }
  };

  async function postSession() {
    setSessionCount(1);
    try {
      const response = await fetch(
        `https://world-for-women-12345.herokuapp.com/api/sessions`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUser),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function checkSessionExists() {
    setSessionUpdate(1);
    try {
      const response = await fetch(
        `https://world-for-women-12345.herokuapp.com/api/sessions/cookie`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse.loggedIn);
      if (jsonResponse.loggedIn) {
        props.setLoggedIn(true);
      } else {
        props.setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="account" id="login">
      <Container className="container d-flex flex-column border border-secondary overflow-auto rounded d-flex align-items-center justify-content-center shadow p-5 mt-5 bg-white rounded">
        <Form>
          <Form.Text>
            <h3 className="text-center pb-3">Log into an account</h3>
          </Form.Text>
          <Form.Group controlId="formUsername">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              type="text"
              className="input"
              id="username"
              placeholder="Enter your username"
              value={currentUser.username}
              onChange={(e) => {
                handleLoginInput(e);
              }}
              onKeyPress={(e) => {
                props.onEnterKey(e, postLogin);
              }}
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formPassword">
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              type="password"
              className="input"
              id="password"
              placeholder="Enter your password"
              value={currentUser.password}
              onChange={(e) => {
                handleLoginInput(e);
              }}
              onKeyPress={(e) => {
                props.onEnterKey(e, postLogin);
              }}
            />
            <br />
            <Container className="d-flex align-items-center justify-content-center">
              <Button
                className="btn btn-secondary m-2"
                onClick={() => {
                  postLogin();
                }}
              >
                Log in
              </Button>
            </Container>
          </Form.Group>
        </Form>
        {message.success ? (
          <Alert className="mt-4" variant="success">
            {message.success}
          </Alert>
        ) : null}
        {message.error ? (
          <Alert className="mt-4" variant="danger">
            {message.error}
          </Alert>
        ) : null}
      </Container>
    </div>
  );
}

export default Login;
