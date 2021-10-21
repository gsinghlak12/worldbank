var express = require("express");
var router = express.Router();
const cors = require("cors");

const bcrypt = require("bcrypt");
const v4 = require("uuid");

const { Pool, Client } = require("pg");
//router.use(cors({ origin: "http://localhost:3000", credentials: true }));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "worldbank",
  password: null,
  port: 5432,
});

(async function () {
  res = await pool.connect();
  return res;
})();


// define the home page route
router.post("/", async function (req, res) {
  const client = await pool.connect();


	const { username, password } = await req.body;
	const salt = await bcrypt.genSalt(8);
	const passwordEncrypted = await bcrypt.hash(password, salt);
	const duplicate = await client.query(
		`SELECT username FROM users WHERE username=$1`,
		[username]
	);
	console.log(duplicate.rows.length);
	if (duplicate.rows.length !== 0) {
		res.status(400).json({ Message: "Error" }, 400);
		console.log("shit");
	} else {
		res.status(200).json({ Message: "Works" }, 200);

		await client.query(`INSERT INTO users(username,password) VALUES($1,$2)`, [
			username,
			passwordEncrypted,
		]);

    client.release();
  }
});

router.post("/verify", async function (req, res) {
  const client = await pool.connect();

  const { username, password } = await req.body;
  const hash = await client.query(
    `SELECT password FROM users WHERE username=$1`,
    [username]
  );
  const hashing = hash.rows[0].password;

  const result = await bcrypt.compare(password, hashing);
  if (result) {
    res.json({ status: "loggedIn" }, 200);
  } else {
    res.json({ status: "notLoggedIn" }, 400);
  }

  client.release();
});

module.exports = router;
