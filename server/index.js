const { text } = require("express");
const express = require("express");
const path = require("path");
const indicators = require("./routers/indicators");
const users = require("./routers/users");
const history = require("./routers/history");
const sessions = require("./routers/sessions");
const bcrypt = require("bcrypt");
const v4 = require("uuid");
const { Server } = require("http");
const cookieSession = require("cookie-session");
const e = require("express");
const { resolveSoa } = require("dns");
const cors = require("cors");

// import { Pool } from "pg";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use("/api/indicators", indicators);
app.use("/api/users", users);
app.use("/api/history", history);
app.use("/api/sessions", sessions);

// app.post("/users", async (req, res) => {});

// app.post("/users/verify", async (req, res) => {});

// app.post("/sessions", async (req, res) => {});

// app.get("/sessions/check", async (req, res) => {});


app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
