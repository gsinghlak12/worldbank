import React, { useState, useEffect } from "react";

function Login(props) {
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState({
    error: "",
    success: "",
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentUser),
    };

    const response = await fetch(
      `http://localhost:8080/sessions`,
      requestOptions
    );
    const json = await response.json();

    if (!response.ok) {
      setMessage({ error: json.status });
    } else {
      setMessage({ success: "Logged in!" });
    }
  };

  return (
    <div className="account" id="login">
      <h3>Log into your account</h3>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        className="input"
        id="username"
        value={currentUser.username}
        onChange={(e) => {
          handleLoginInput(e);
        }}
        onKeyPress={(e) => {
          props.onEnterKey(e, postLogin);
        }}
      ></input>
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        className="input"
        id="password"
        value={currentUser.password}
        onChange={(e) => {
          handleLoginInput(e);
        }}
        onKeyPress={(e) => {
          props.onEnterKey(e, postLogin);
        }}
      ></input>
      <br />
      <button
        onClick={() => {
          postLogin();
        }}
      >
        Log in
      </button>
      <p style={{ color: "green" }}>{message.success}</p>
      <p style={{ color: "red" }}>{message.error}</p>
    </div>
  );
}

export default Login;
