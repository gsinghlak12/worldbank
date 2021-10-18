const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Handle GET requests to /api route
app.get("/api/hello2", (req, res) => {
  res.json({ message: "Hello World!" });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
