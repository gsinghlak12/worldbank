var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");
const { application } = require("express");
router.use(cookieParser());
router.use(cors({ origin: "http://localhost:3000", credentials: true }));

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

router.post("/", async function (req, res) {
	const client = await pool.connect();

	const { username, password } = await req.body;
	const sessionID = uuidv4();
	const userKey = await client.query(`SELECT id FROM users WHERE username=$1`, [
		username,
	]);

	await client.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
		sessionID,
		userKey.rows[0].id,
	]);

	res.cookie("sessionID", sessionID).send("cookie sent");

	client.release();
});

router.get("/cookie", async function (req, res) {
	const client = await pool.connect();

	const activeSession = await req.cookies;
	const sessionID = await client.query(
		`SELECT uuid FROM sessions
            ORDER BY created_at DESC
            LIMIT 1;`
	);

	if (sessionID.rows[0]) {
		if (activeSession.sessionID === sessionID.rows[0].uuid) {
			res.json({ loggedIn: true });
			console.log("passes");
		} else {
			res.json({ loggedIn: false });
			console.log("fails");
		}
	} else {
		res.json({ loggedIn: false });
		console.log("fails");
	}

	client.release();
});

router.delete("/", async function () {
	const client = await pool.connect();
	client.query(
		`DELETE FROM sessions WHERE created_at=(SELECT MAX(created_at) FROM sessions)`
	);
	client.release();
});

module.exports = router;
