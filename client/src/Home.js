import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import women from "./Components/women-of-world.png";
import convertData from "./Components/GraphComponents/convertData";

function Home() {
  const [years, setYears] = useState([]);
  const [country, setCountry] = useState("");
  const [value, setValue] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/indicators");
        const json = await response.json();
        console.log(json);
        const { years, country, value, title } = json;
        setYears(years);
        setCountry(country);
        setValue(value);
        setTitle(title);
        console.log(years, country, value, title);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const dataset = convertData([years, country, value]);

  console.log(dataset);

  const outerStyle = {
    backgroundImage: "url(" + women + ")",
    backgroundSize: "85%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "50rem",
    height: "85vh",
  };

  return (
    <Container
      className="container border border-secondary rounded d-flex flex-column align-items-center justify-content-center shadow p-3 bg-white rounded"
      style={outerStyle}
    >
      <Container>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>...</p>
          <p>
            <Link to="/search">
              <Button className="btn btn-secondary">Explore the data</Button>
            </Link>
          </p>
        </Jumbotron>
      </Container>
    </Container>
  );
}

export default Home;
