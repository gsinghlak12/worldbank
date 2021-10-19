import React from "react";
import { useState } from "react/cjs/react.development";

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
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password,
      }),
    };

    const response = await fetch(`http://localhost:8080/users`, requestOptions);
    const json = await response.json();

    if (!response.ok) {
      setMessage({ error: json.status });
    } else {
      setMessage({ success: "Account created. Please login." });
      setNewUser({
        username: "",
        password: "",
        confirm: "",
      });
    }
  };

  return (
    <div className="account" id="register">
      <h3>Register a new user</h3>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        className="input"
        id="username"
        value={newUser.username}
        onChange={(e) => {
          handleRegisterInput(e);
        }}
        onKeyPress={(e) => {
          props.onEnterKey(e, handleNewUser);
        }}
      ></input>
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        className="input"
        id="password"
        value={newUser.password}
        onChange={(e) => {
          handleRegisterInput(e);
        }}
        onKeyPress={(e) => {
          props.onEnterKey(e, handleNewUser);
        }}
      ></input>
      <br />
      <label htmlFor="confirm">Confirm password:</label>
      <input
        type="password"
        className="input"
        id="confirm"
        value={newUser.confirm}
        onChange={(e) => {
          handleRegisterInput(e);
        }}
        onKeyPress={(e) => {
          props.onEnterKey(e, handleNewUser);
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          handleNewUser();
        }}
      >
        Create account
      </button>
      <p style={{ color: "green" }}>{message.success}</p>
      <p style={{ color: "red" }}>{message.error}</p>
    </div>
  );
}

export default Register;
