const { text } = require("express");
const express = require("express");
const path = require("path");
const indicators = require("./routers/indicators");
const users = require("./routers/users");
const history = require("./routers/history");
const bodyParser = require("body-parser");
// const client2 = new Client("postgres://localhost:5432/worldbank");
const PORT = process.env.PORT || 8080;
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use("/api/indicators", indicators);
app.use("/api/users", users);
app.use("/api/history", history);

app.get("/api", async (req, res) => {});

app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
