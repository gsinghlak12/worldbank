import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import gp from "./Components/GP.jpg";
import adnan from "./Components/Adnan.jpg";
import kasia from "./Components/Kasia.jpg";
import sang from "./Components/Sang.jpg";

function Team() {
  return (
    <Container className="align-content-center text-center m-2 pt-4 overflow-auto position-relative">
      <h1 className="py-2">Hello from Team μ</h1>
      <Container className="m-2">
        <div class="card px-5">
          <div class="card-body text-center">
            <h6>
              We are a team of four Software Engineers working at{" "}
              <a
                href="https://sigmalabs.co.uk/"
                target="_blank"
                rel="noreferrer"
                className="link-dark"
              >
                Sigma Labs
              </a>{" "}
              in London.
            </h6>
            Using the skills learnt during our full-stack training, we have
            created this data visualisation dashboard to display{" "}
            <a
              href="https://www.kaggle.com/kaggle/world-development-indicators"
              target="_blank"
              rel="noreferrer"
              className="link-dark"
            >
              World Development Indicators
            </a>{" "}
            data from{" "}
            <a
              href="https://www.worldbank.org/en/home"
              target="_blank"
              rel="noreferrer"
              className="link-dark"
            >
              The World Bank
            </a>
            . Since the database contains over 1,300 indicators, we thought it
            would be beneficial to focus on human geography, in particular
            metrics relating to the lives of women around the world. Where the
            data for men relating to the same indicator exists, we have
            automatically displayed it on the same graph for comparison. We hope
            you find exploring this website as interesting as we found building
            it!
          </div>
        </div>
      </Container>
      <Container className="m-3">
        <Row>
          <Col>
            <div className="card text-center my-3" style={{ width: "18rem" }}>
              <img src={adnan} className="card-img-top" alt="" />
              <div className="card-body">
                <span className="badge bg-secondary p-2 mb-2">DEVOPS</span>
                <h5 className="card-title p-1">Adnan Gondal</h5>
                <p className="card-text">
                  Adnan is a recent MEng graduate from Imperial College London.
                  He loves how coding brings people from all walks of life
                  together.
                </p>
                <Button
                  href="https://github.com/AdnanGondal"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/adnan-gondal-2021/"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card text-center my-3" style={{ width: "18rem" }}>
              <img src={gp} className="card-img-top" alt="" />
              <div className="card-body">
                <span className="badge bg-secondary p-2 mb-2">
                  SOFTWARE ARCHITECT
                </span>
                <h5 className="card-title p-1">Gurpartap Lakhanpal</h5>
                <p className="card-text">
                  Gurpartap studied Mechanical Engineering at the University of
                  Warwick. He's an avid listener of TedTalks Daily podcast.
                </p>
                <Button
                  href="https://github.com/gsinghlak12"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/gurpartap-s-a1236a139/"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card text-center my-3" style={{ width: "18rem" }}>
              <img src={kasia} className="card-img-top" alt="" />
              <div className="card-body">
                <span className="badge bg-secondary p-2 mb-2">
                  PROJECT MANAGER
                </span>
                <h5 className="card-title p-1">Kasia Dutch</h5>
                <p className="card-text">
                  Kasia holds a degree in Russian and Chinese, but now uses her
                  language skills to build software. She's passionate about
                  great UI.
                </p>
                <Button
                  href="https://github.com/kashcoding"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/k-dutch/"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Col>
          <Col>
            <div className="card text-center my-3" style={{ width: "18rem" }}>
              <img src={sang} className="card-img-top" alt="" />
              <div className="card-body">
                <span className="badge bg-secondary p-2 mb-2">
                  QUALITY ASSURANCE
                </span>
                <h5 className="card-title p-1">Sang Ta</h5>
                <p className="card-text">
                  Sang is a CompSci graduate from the University of Nottingham.
                  As well as being our team's QA Tester, he also provides all
                  the snacks.
                </p>
                <Button
                  href="https://github.com/gSangsterr"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </Button>
                <Button
                  href="https://www.linkedin.com/in/sang-t-080892172/"
                  target="_blank"
                  className="btn btn-light text-secondary border m-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-linkedin"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Team;
