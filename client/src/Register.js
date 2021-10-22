import React from "react";
import { useState } from "react/cjs/react.development";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Register(props) {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const [message, setMessage] = useState({
    error: "",
    success: "",
  });

  const handleRegisterInput = (e) => {
    const { username, password, confirm } = newUser;
    setNewUser({
      username,
      password,
      confirm,
      [e.target.id]: e.target.value,
    });

    setMessage({
      error: "",
      success: "",
    });
  };

  const validateUsername = () => {
    const { username } = newUser;
    const numbers = /\d/;

    if (!numbers.test(username) || !(username.length > 5)) {
      return "invalid";
    }
  };

  const validatePassword = () => {
    const { password, confirm } = newUser;
    const specChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (password !== confirm) {
      return "match";
    } else if (
      !password ||
      !confirm ||
      password.length < 9 ||
      !specChar.test(password)
    ) {
      return "weak";
    }
  };

  const handleNewUser = () => {
    const usernameResult = validateUsername();
    const passwordResult = validatePassword();
    if (usernameResult === "invalid") {
      setMessage({
        error:
          "Your username must be at least 6 characters long and contain a number.",
      });
    } else if (passwordResult === "match") {
      setMessage({
        error: "Passwords do not match. Please try again.",
      });
    } else if (passwordResult === "weak") {
      setMessage({
        error:
          "Password is weak. Must be 8 characters long and contain special characters.",
      });
    } else {
      postNewUser();
    }
  };

  const postNewUser = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Access: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password,
      }),
    };

    const response = await fetch(
      `http://localhost:8080/api/users`,
      requestOptions
    );
    const json = await response.json();
    console.log(response);

    if (response.status == 400) {
      setMessage({
        error: "This username is taken. Please try a different one or login.",
      });
    } else {
      setTimeout(() => {
        props.setRegister(true);
      }, 1000);
      setMessage({ success: "Account created. Redirecting to login!" });
      setNewUser({
        username: "",
        password: "",
        confirm: "",
      });

      setTimeout(() => {
        props.setRegister(false);
      }, 1100);
    }
  };

  return (
    <div className="account" id="register">
      <Container className="container d-flex flex-column border border-secondary rounded d-flex align-items-center justify-content-center shadow p-5 bg-white rounded">
        <Form>
          <Form.Text>
            <h3 className="text-center pb-3">Register a new user</h3>
          </Form.Text>
          <Form.Group controlId="formUsername">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control
              type="text"
              className="input"
              id="username"
              placeholder="Choose your username"
              value={newUser.username}
              onChange={(e) => {
                handleRegisterInput(e);
              }}
              onKeyPress={(e) => {
                props.onEnterKey(e, handleNewUser);
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
              placeholder="Choose your password"
              value={newUser.password}
              onChange={(e) => {
                handleRegisterInput(e);
              }}
              onKeyPress={(e) => {
                props.onEnterKey(e, handleNewUser);
              }}
            />
          </Form.Group>
          <br />{" "}
          <Form.Group controlId="formConfirm">
            <Form.Label htmlFor="confirm">Confirm password:</Form.Label>
            <Form.Control
              type="password"
              className="input"
              id="confirm"
              placeholder="Confirm your password"
              value={newUser.confirm}
              onChange={(e) => {
                handleRegisterInput(e);
              }}
              onKeyPress={(e) => {
                props.onEnterKey(e, handleNewUser);
              }}
            />
            <br />
            <Container className="d-flex align-items-center justify-content-center">
              <Button
                className="btn btn-secondary m-2"
                onClick={() => {
                  handleNewUser();
                }}
              >
                Create account
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

export default Register;
