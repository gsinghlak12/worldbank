import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import women from "./Components/women-of-world.png";

function Home() {
  const outerStyle = {
    backgroundImage: "url(" + women + ")",
    backgroundSize: "95%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "50rem",
    height: "80vh",
  };

  return (
    <Container
      className="container border border-secondary rounded d-flex flex-column align-items-center justify-content-center position-relative shadow p-5 bg-white rounded"
      style={outerStyle}
      data-testid="home-container"
    >
      <Container className="d-flex flex-column  text-center p-4">
        <Container className="mt-2">
          <h1>Hello, world!</h1>
        </Container>
        <Container className="mt-2 mb-5">
          <h6 className="p-1 border border-success rounded">
            Use our dashboard to visualise{" "}
            <a
              href="https://www.kaggle.com/kaggle/world-development-indicators"
              target="_blank"
              rel="noreferrer"
              className="link-dark"
            >
              World Development Indicators
            </a>{" "}
            from{" "}
            <a
              href="https://www.worldbank.org/en/home"
              target="_blank"
              rel="noreferrer"
              className="link-dark"
            >
              The World Bank
            </a>
          </h6>
          <p className="p-1 ">
            The data relates to the lives of women around the world, covering a
            wide-range of socioeconomic metrics, from healthcare to education to
            employment.
            <p className="p-1">
              Click the button below to see how the figures from one country
              have changed over time or compare data from two countries.{" "}
            </p>
          </p>
        </Container>
        <p>
          <a href="/search">
            <Button className="btn btn-secondary mb-2 mt-4">
              Explore the data
            </Button>
          </a>
        </p>
      </Container>
    </Container>
  );
}

export default Home;
