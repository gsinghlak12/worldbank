import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Graph from "./Components/GraphComponents/Graph";
import convertData from "./Components/GraphComponents/convertData";

function Search() {
  const [countryList, setCountryList] = useState([]);
  const [firstCountry, setFirstCountry] = useState("");
  const [firstCode, setFirstCode] = useState("");
  const [secondCountry, setSecondCountry] = useState("");
  const [secondCode, setSecondCode] = useState("");
  const [indicatorList, setIndicatorList] = useState([]);
  const [indicator, setIndicator] = useState("None");
  const [indicatorCode, setIndicatorCode] = useState("");
  const [start, setStart] = useState("1980");
  const [end, setEnd] = useState("2021");
  const [clicked, setClicked] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    //fetch data from server side of all indicators and countries
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/countries");
      const json = await response.json();
      const countryData = json.countries;
      setCountryList(countryData);
      const indicatorResp = await fetch("http://localhost:8080/api/indicators");
      const indicatorJson = await indicatorResp.json();
      const indicatorData = indicatorJson.data;
      setIndicatorList(indicatorData);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(
      firstCountry,
      firstCode,
      secondCountry,
      secondCode,
      indicator,
      indicatorCode,
      start,
      end
    );
  });

  const validateCountry = (
    e,
    listOfItems,
    setStateCallback,
    setCodeCallback
  ) => {
    let countryCode = "";
    if (
      listOfItems.some((input) => {
        countryCode = input.countrycode;
        return input.shortname === e;
      })
    ) {
      setStateCallback(e);
      setCodeCallback(countryCode);
    }
  };
  const validateIndicator = (e, listOfItems) => {
    let tempCode = "";
    if (
      listOfItems.some((input) => {
        tempCode = input.seriescode;
        return input.indicatorname === e;
      })
    ) {
      setIndicator(e);
      setIndicatorCode(tempCode);
    }
  };

  const yearDropDown = (startYear, endYear, type) => {
    const options = [];
    options.push(
      <option key={0 + type} value={0} disabled hidden>
        Choose {type} year
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
      <option key={input.shortname + type} value={input.shortname}>
        {input.shortname}
      </option>
    ));
  };

  const indicatorDropDown = () => {
    let indicatorOption = indicatorList.map((input) => (
      <option key={input.indicatorname} value={input.indicatorname}>
        {input.indicatorname}
      </option>
    ));
    return indicatorOption;
  };

  const addCountryButton = () => {
    if (clicked) {
      return <button onClick={(e) => cleanSecondCountry(e)}>-</button>;
    }
    return <button onClick={(e) => makeSecondCountryInput(e)}>+</button>;
  };

  const makeSecondCountryInput = (e) => {
    e.preventDefault();
    setClicked(true);
  };
  const cleanSecondCountry = (e) => {
    e.preventDefault();
    setSecondCountry("");
    setSecondCode("");
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
      <div>
        <input
          className={hideSecondCountry()}
          list="countryList2"
          placeholder="Type a country..."
          autoComplete="on"
          onChange={(e) =>
            validateCountry(
              e.target.value,
              countryList,
              setSecondCountry,
              setSecondCode
            )
          }
        ></input>
        <datalist id="countryList2">{countryDropDown("second")}</datalist>
      </div>
    );
  };

  const sendData = async () => {
    console.log("sent");
    console.log(firstCode, secondCode, indicatorCode);
    console.log(secondCode === "");
    if (firstCode === "" || indicatorCode === "") {
      return;
    }
    if (secondCode === "" && clicked === true) {
      return;
    }
    if (secondCode === "") {
      const response = await fetch(
        `http://localhost:8080/api/indicators/${indicatorCode}/countries/${firstCode}`
      );
      const json = await response.json();
      setGraphData(convertData([json.years, json.country, json.value]));
    }
    setDataSent(true);
  };

  const showGraph = () => {
    console.log(graphData);
    if (dataSent) {
      return (
        <div>
          <Graph title={indicator} dataset={graphData} />
        </div>
      );
    }
  };

  return (
    <div>
      <Container className="container border border-secondary rounded d-flex align-content-center justify-content-center shadow p-3 bg-white rounded">
        <Form className="d-flex flex-column align-items-center">
          <Row>
            <Form.Text>
              <h3>Search data</h3>{" "}
            </Form.Text>
          </Row>
          <Row>
            <Col md>
              <label>Countries:</label>
              <input
                class="btn btn-light dropdown-toggle"
                list="countryList1"
                placeholder="Type a country..."
                onChange={(e) =>
                  validateCountry(
                    e.target.value,
                    countryList,
                    setFirstCountry,
                    setFirstCode
                  )
                }
              ></input>
              {addCountryButton()}
              {addNewCountryField()}
              <datalist id="countryList1">{countryDropDown("first")}</datalist>
            </Col>
            <Col md>
              <label>Indicators:</label>
              <input
                className="input"
                list="indicatorList"
                placeholder="Choose indicator..."
                onChange={(e) =>
                  validateIndicator(e.target.value, indicatorList)
                }
              ></input>
              <datalist id="indicatorList">{indicatorDropDown()}</datalist>
            </Col>
            <Col md>
              <label>Year range:</label>
              <select
                className="input"
                defaultValue={0}
                onChange={(e) => setStart(e.target.value)}
              >
                {yearDropDown(parseInt(end), 1980, "start")}
              </select>
              <select
                className="input"
                defaultValue={0}
                onChange={(e) => setEnd(e.target.value)}
              >
                {yearDropDown(2021, parseInt(start), "end")}
              </select>
            </Col>
          </Row>
          <Button
            className="btn btn-secondary m-2"
            onClick={async (e) => await sendData()}
          >
            See results
          </Button>{" "}
        </Form>{" "}
      </Container>
      {showGraph()}
    </div>
  );
}

export default Search;
