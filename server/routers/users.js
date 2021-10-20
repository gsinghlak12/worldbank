var express = require("express");
var router = express.Router();
const cors = require("cors");

const bcrypt = require("bcrypt");
const v4 = require("uuid");

const { Pool, Client } = require("pg");
router.use(cors());

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getAllUsers(client) {
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

async function registerUser(req, res) {
	const { username, password } = await req.body;
	const salt = await bcrypt.genSalt(8);
	const passwordEncrypted = await bcrypt.hash(password, salt);

	pool.query(`INSERT INTO login(username,password) VALUES(?,?)`, [
		username,
		passwordEncrypted,
	]);
}

async function verifyUser(req, res) {
	const { username, password } = await req.body;
	const [hash] = pool
		.query(`SELECT password FROM users WHERE username=?`, [username])
		.asObjects();
	const result = await bcrypt.compare(password, hash.password);
	if (result) {
		res.json({ status: "loggedIn" }, 200);
	} else {
		res.json({ status: "notLoggedIn" }, 400);
	}
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// define the home page route
router.post("/", async function (req, res) {
	const client = await pool.connect();

	const { username, password } = await req.body;
	const salt = await bcrypt.genSalt(8);
	const passwordEncrypted = await bcrypt.hash(password, salt);
	console.log(passwordEncrypted);
	const duplicate = await client.query(
		`SELECT username FROM users WHERE username=$1`,
		[username]
	);
	if (duplicate.rows[0]) {
		res.status(404).json({ Message: "Error, this username is already in use" });
	} else {
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
// define the about route

module.exports = router;
