const { text } = require("express");
const express = require("express");
const path = require("path");

const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/worldbank");

const PORT = process.env.PORT || 8080;

const app = express();

(async function () {
  await client.connect();
})();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

async function getAllUsers() {
  let sql = `SELECT * FROM users`;
  try {
    console.log(sql);
    const res = await client.query(sql);
    console.log(res);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return err.stack;
  }
}

// Handle GET requests to /api route
app.get("/api/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Handle GET requests to /api route
app.get("/api/users", async (req, res) => {
  const data = await getAllUsers();
  console.log(data);
  res.json({ message: data });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
