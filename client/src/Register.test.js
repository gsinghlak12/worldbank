import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";

describe("Register input field Username is validated", () => {
  test("Username has to be larger than 6 characters", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "tert4");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.getByText(
        "Your username must be at least 6 characters long and contain a number."
      )
    ).toBeInTheDocument();
  });
  test("Username must at least contain 1 digit", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "asdfgghjkl");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.getByText(
        "Your username must be at least 6 characters long and contain a number."
      )
    ).toBeInTheDocument();
  });
  test("Username is Valid", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "K1ngCoder425");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.getByText(
        "Password is weak. Must be 8 characters long and contain special characters."
      )
    ).toBeInTheDocument();
  });
});

describe("Register input field Password is validated", () => {
  test("Password has to be larger than 8 numbers", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "K1ngCoder425");
    userEvent.type(document.getElementById("password"), "hehe@£$");
    userEvent.type(document.getElementById("confirm"), "hehe@£$");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.getByText(
        "Password is weak. Must be 8 characters long and contain special characters."
      )
    ).toBeInTheDocument();
  });
  test("Password must at least contain 1 special character", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "K1ngCoder425");
    userEvent.type(document.getElementById("password"), "hehebebebibizeze");
    userEvent.type(document.getElementById("confirm"), "hehebebebibizeze");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.getByText(
        "Password is weak. Must be 8 characters long and contain special characters."
      )
    ).toBeInTheDocument();
  });
  test("Password is Valid", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "K1ngCoder425");
    userEvent.type(document.getElementById("password"), "hehe@£$zizibi");
    userEvent.type(document.getElementById("confirm"), "hehe@£$zizibi");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.queryByText(
        "Password is weak. Must be 8 characters long and contain special characters."
      )
    ).not.toBeInTheDocument();
  });
});

describe("Register input field confirm password is validated", () => {
  test("Confirm password must be equal to password", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "K1ngCoder425");
    userEvent.type(document.getElementById("password"), "hehe@£$zizibi");
    userEvent.type(document.getElementById("confirm"), "hehe@£$fifiji");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.getByText("Passwords do not match. Please try again.")
    ).toBeInTheDocument();
  });
  test("Confirm password is the same as password", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const leftClick = { button: 0 };

    userEvent.click(screen.getByText("Register"), leftClick);
    userEvent.type(document.getElementById("username"), "K1ngCoder425");
    userEvent.type(document.getElementById("password"), "hehe@£$zizibi");
    userEvent.type(document.getElementById("confirm"), "hehe@£$zizibi");
    userEvent.click(screen.getByText("Create account"), leftClick);

    expect(
      screen.queryByText("Passwords do not match. Please try again.")
    ).not.toBeInTheDocument();
  });
});

// describe("Register input field Confirm password should be identical to Password field", () => {
//   test("conformation field must be the same", () => {
//     const password = "R!ghtPa$$word";
//     const conformation = "Wr()ngPa$$word";
//     expect(confirmPass(password, conformation)).toBe(false);
//   });
//   test("Conformation is Valid", () => {
//     const password = "S4MePa$$word";
//     const conformation = "S4MePa$$word";
//     expect(confirmPass(password, conformation)).toBe(true);
//   });
// });
