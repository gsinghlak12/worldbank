import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Search() {
  const [countryList, setCountryList] = useState([]);
  const [firstCountry, setFirstCountry] = useState("");
  const [secondCountry, setSecondCountry] = useState("");
  const [indicatorList, setIndicatorList] = useState([]);
  const [indicator, setIndicator] = useState("None");
  const [start, setStart] = useState("1980");
  const [end, setEnd] = useState("2021");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    //fetch data from server side of all indicators and countries
    setCountryList(
      [
        "America",
        "Japan",
        "England",
        "Korea",
        "India",
        "Pakistan",
        "Norway",
        "Switzerland",
        "Brazil",
        "Mexico",
        "Canada",
        "Denmark",
        "France",
        "Portugal",
        "Vietnam",
        "Hungary",
        "Qatar",
      ].sort()
    ); //placeholder data
    setIndicatorList(
      [
        "Life",
        "Death",
        "Spirit",
        "Wind",
        "Earth",
        "Time",
        "Fire",
        "Water",
        "Magic",
        "List",
      ].sort()
    ); //placeholder data
  }, []);
  useEffect(() => {
    console.log(firstCountry, secondCountry, indicator, start, end);
  });

  const validateInput = (e, listOfItems, callback) => {
    if (listOfItems.some((input) => input === e)) {
      callback(e);
    }
  };

  const yearDropDown = (startYear, endYear, type) => {
    const options = [];
    options.push(
      <option key={0 + type} value={0} disabled hidden>
        {type} year
      </option>
    );
    for (let i = startYear; i >= endYear; i--) {
      options.push(
        <option key={i + type} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const countryDropDown = (type) => {
    return countryList.map((input) => (
      <option key={input + type} value={input}>
        {input}
      </option>
    ));
  };

  const indicatorDropDown = () => {
    let indicatorOption = indicatorList.map((input) => (
      <option key={input} value={input}>
        {input}
      </option>
    ));
    indicatorOption.unshift(
      <option key={"None"} value="None">
        {"None"}
      </option>
    );
    return indicatorOption;
  };

  const addCountryButton = () => {
    if (clicked) {
      return (
        <Button
          className="m-1"
          variant="outline-secondary"
          onClick={(e) => cleanSecondCountry(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-dash"
            viewBox="0 0 16 16"
          >
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
          </svg>{" "}
        </Button>
      );
    }
    return (
      <Button
        className="m-1 "
        variant="outline-secondary"
        onClick={(e) => makeSecondCountryInput(e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-plus "
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </Button>
    );
  };

  const makeSecondCountryInput = (e) => {
    e.preventDefault();
    setClicked(true);
  };
  const cleanSecondCountry = (e) => {
    e.preventDefault();
    setSecondCountry("");
    setClicked(false);
  };

  const hideSecondCountry = () => {
    if (clicked) {
      return "input";
    }
    return "d-none";
  };

  const addNewCountryField = () => {
    return (
      <Container className="d-flex flex-column align-items-center text-center">
        <div className={hideSecondCountry()}>
          <label className="p-2">Country 2:</label>
          <input
            className="btn btn-light dropdown-toggle m-1"
            list="countryList2"
            placeholder="Type a country..."
            autoComplete="on"
            onChange={(e) =>
              validateInput(e.target.value, countryList, setSecondCountry)
            }
          ></input>
          <datalist id="countryList2">{countryDropDown("second")}</datalist>
        </div>
      </Container>
    );
  };

  return (
    <div>
      <Container className="container border border-secondary rounded d-flex shadow py-4 px-5 bg-white rounded">
        <Form className="d-flex flex-column align-items-center justify-content-center">
          <Form.Text>
            <h3 className="text-center pb-2">Search data</h3>
          </Form.Text>
          <Container className="d-flex flex-row align-items-start justify-content-center">
            <Container className="d-flex flex-row align-items-end justify-items-start">
              {addCountryButton()}
              <Container className="d-flex flex-column align-items-center text-center">
                <label className="p-2">Country 1:</label>
                <input
                  className="btn btn-light dropdown-toggle m-1"
                  list="countryList1"
                  placeholder="Type a country..."
                  onChange={(e) =>
                    validateInput(e.target.value, countryList, setFirstCountry)
                  }
                ></input>
              </Container>
              {addNewCountryField()}
              <datalist id="countryList1">{countryDropDown("first")}</datalist>
            </Container>
            <Container className="d-flex flex-column align-items-center text-center">
              <label className="p-2">Indicators:</label>
              <input
                className="btn btn-light dropdown-toggle m-1"
                list="indicatorList"
                placeholder="Choose indicator..."
                onChange={(e) =>
                  validateInput(e.target.value, indicatorList, setIndicator)
                }
              ></input>
              <datalist id="indicatorList">{indicatorDropDown()}</datalist>
            </Container>
            <Container className="d-flex flex-column align-items-center text-center">
              <label className="p-2">Year range:</label>
              <Container className="d-flex flex-row align-items-center text-center">
                <select
                  className="btn btn-light dropdown-toggle p-2 m-1"
                  defaultValue={0}
                  onChange={(e) => setStart(e.target.value)}
                >
                  {yearDropDown(parseInt(end), 1980, "Start")}
                </select>
                <select
                  className="btn btn-light dropdown-toggle p-2 m-1"
                  defaultValue={0}
                  onChange={(e) => setEnd(e.target.value)}
                >
                  {yearDropDown(2021, parseInt(start), "End")}
                </select>
              </Container>
            </Container>
          </Container>
          <Button className="btn btn-secondary mt-3">See results</Button>{" "}
        </Form>
      </Container>
    </div>
  );
}

export default Search;
