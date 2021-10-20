import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import Register from "./Register.js";

describe("Register input field Username is validated", () => {
  test("Username has to be larger than 6 characters", () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    userEvent.type(screen.getById("username"), "tert4");

    expect(screen.getById("username")).toBe("invalid");
  });
  test("Username must at least contain 1 digit", () => {
    expect(Register.validateUsername("asdfgghjkl")).toBe("invalid");
  });
  test("Username is Valid", () => {
    expect(Register.validateUsername("K1ngCoder425")).toBe(true);
  });
});

describe("Register input field Password is validated", () => {
  test("Password has to be larger than 8 numbers", () => {
    expect(validatePassword("pas$wor")).toBe(false);
  });
  test("Password must at least contain 1 special character", () => {
    expect(validatePassword("myRealBadPassword")).toBe(false);
  });
  test("Password is Valid", () => {
    expect(validatePassword("Th1sP@s5W0r|)")).toBe(true);
  });
});

describe("Register input field Confirm password should be identical to Password field", () => {
  test("conformation field must be the same", () => {
    const password = "R!ghtPa$$word";
    const conformation = "Wr()ngPa$$word";
    expect(confirmPass(password, conformation)).toBe(false);
  });
  test("Conformation is Valid", () => {
    const password = "S4MePa$$word";
    const conformation = "S4MePa$$word";
    expect(confirmPass(password, conformation)).toBe(true);
  });
});
