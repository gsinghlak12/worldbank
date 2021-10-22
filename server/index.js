const { text } = require("express");
const express = require("express");
const path = require("path");
const indicators = require("./routers/indicators");
const users = require("./routers/users");
const history = require("./routers/history");
const sessions = require("./routers/sessions");
const countries = require("./routers/countries");
const results = require("./routers/results");
const bcrypt = require("bcrypt");
const v4 = require("uuid");
const { Server } = require("http");
const cookieSession = require("cookie-session");
const e = require("express");
const { resolveSoa } = require("dns");
const cors = require("cors");

console.log("No value for FOO yet:", process.env.FOO);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("Now the value for FOO is:", process.env.FOO);

// import { Pool } from "pg";

const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.URL || "http://localhost:3000";
console.log(ORIGIN);

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get("/api/", (req, res) => {
  res.json({ message: "API is active" });
});

app.use("/api/indicators", indicators);
app.use("/api/users", users);
app.use("/api/history", history);
app.use("/api/sessions", sessions);
app.use("/api/countries", countries);
app.use("api/results", results);

app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
