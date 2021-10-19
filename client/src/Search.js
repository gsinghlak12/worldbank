import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Search() {
  const [search, setSearch] = useState({
    countries: [],
    indicator: "",
    start: null,
    end: null,
  });

  return (
    <div>
      <Container>
        <Row>
          <h3>Search data</h3>
        </Row>
        <Row>
          <Col md>
            <label>Countries:</label>
            <input className="input"></input>
            <button>+</button>
          </Col>
          <Col md>
            <label>Indicators:</label>
            <input className="input"></input>
          </Col>
          <Col md>
            <label>Year range:</label>
            <option key={1} value={1950}>
              {2021}
            </option>
          </Col>
        </Row>
        <button>Search</button>
      </Container>
    </div>
  );
}

export default Search;
