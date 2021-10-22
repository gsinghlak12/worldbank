import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import women from "./Components/women-of-world.png";

function Home() {
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
      data-testid="home-container"
    >
      <Container>
        <Jumbotron className="text-center">
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
