import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";

describe("Website having links to different domain paths", () => {
  test("renders a Home link which redirects to correct route", () => {
    const history = createMemoryHistory();
    history.push("/register"); // route that isn't home page
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByTestId("Home")).toBeInTheDocument();
    const leftClick = { button: 0 };
    userEvent.click(screen.getByTestId("Home"), leftClick);
    //Something to verify that the home button brings someone back home
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });
  test("renders a Login link which redirects to correct route", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText("Login"), leftClick);
    //Something to verify that the login button brings someone to Login screen
    expect(screen.getByText("Log into your account")).toBeInTheDocument();
  });
  test("renders a Register link which redirects to correct route", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText("Register"), leftClick);
    //Something to verify that the register button lets someone register an account
    expect(screen.getByText("Register a new user")).toBeInTheDocument();
  });
  test("renders a Search link which redirects to correct route", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(screen.getByText("Search")).toBeInTheDocument();
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText("Search"), leftClick);
    //Something to verify that the search button brings up a search bar
    expect(screen.getByText("Search data")).toBeInTheDocument();
  });
  // test("renders a History link which redirects to correct route", () => {
  //   const history = createMemoryHistory();
  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>
  //   );
  //   expect(screen.getByText("History")).toBeInTheDocument();
  //   const leftClick = { button: 0 };
  //   userEvent.click(screen.getByText("History"), leftClick);
  //   //Something to verify that the history button brings up search history
  //   expect(screen.getByText("HISTORY")).toBeInTheDocument();
  // });
});

// describe("Login input fields are valid", () => {
//   test("Login field cannot be empty", () => {
//     const login = "";
//     const password = "asdflkj%sdf£";
//     expect(tryLogin(login, password)).toBe(false);
//   });
//   test("Password field cannot be empty", () => {
//     const login = "myUsernameL0L";
//     const password = "";
//     expect(tryLogin(login, password)).toBe(false);
//   });
//   test("Login fails when password and username don't match", () => {
//     const login = "Username1";
//     const password = "Pa$$word2";
//     expect(tryLogin(login, password)).toBe(false);
//   });
//   test("Login completes when correct details entered", () => {
//     const login = "Username1";
//     const password = "Pa$$word1";
//     expect(tryLogin(login, password)).toBe(true);
//   });
// });
