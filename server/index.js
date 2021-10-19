const { text } = require("express");
const express = require("express");
const path = require("path");
const client2 = new Client("postgres://localhost:5432/worldbank");
const PORT = process.env.PORT || 8080;
const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Pool, Client } = require("pg");
const client = new Client({
	user: "doadmin",
	host: "db-postgresql-lon1-54384-do-user-10062307-0.b.db.ondigitalocean.com",
	database: "data",
	password: "mEW3kfIjm7w9dnDG",
	port: "25060",
	sslmode: "require",
	ssl: true,
});

(async function () {
	await client.connect();
})();


(async function () {
  await client2.connect();
})();

app.get("/api", async (req, res) => {
	const result = await client.query("SELECT * FROM Series LIMIT 5");
	res.json(result.rows);
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

// Handle GET requests to /api route
app.get("/api/users", async (req, res) => {
  const data = await getAllUsers();
  console.log(data);
  res.json({ message: data });
}

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
