var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const v4 = require("uuid");

const { Pool, Client } = require("pg");
const { application } = require("express");

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

async function postSession(req, res) {
	const { username } = await req.body;
	const sessionID = v4.generate();
	const [userKey] = pool2
		.query(`SELECT userId FROM login WHERE username=?`, [username])
		.asObjects();
	await pool2.query(
		"INSERT INTO sessions (uuid, user_id, created_at) VALUES (?, ?, datetime('now'))",
		[sessionID, userKey.userId]
	);
	res.cookie("SessionID", sessionID).send("cookie sent");
}

async function getSession(req, res) {
	const activeSession = req.cookies;
	const [sessionID] = pool2
		.query(
			`SELECT uuid FROM sessions
            ORDER BY created_at DESC
            LIMIT 1;`
		)
		.asObjects();

	if (activeSession.sessionID == sessionID.uuid) {
		res.json({ loggedIn: true });
	} else {
		res.json({ loggedIn: false });
	}
}
async function deleteSession() {
	pool2.query(
		`DELETE FROM sessions WHERE created_at=(SELECT MAX(created_at) FROM sessions)`
	);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/", async function (req, res) {
	const client = await pool.connect();

	const { username } = await req.body;
	const sessionID = v4.generate();
	const [userKey] = pool
		.query(`SELECT id FROM users WHERE username=?`, [username])
		.asObjects();
	await client.query(
		"INSERT INTO sessions (uuid, user_id, created_at) VALUES (?, ?, datetime('now'))",
		[sessionID, userKey.id]
	);
	res.cookie("SessionID", sessionID).send("cookie sent");

	client.release();
});

router.get("/check", async function (req, res) {
	const client = await pool.connect();

	const activeSession = req.cookies;
	const [sessionID] = client
		.query(
			`SELECT uuid FROM sessions
            ORDER BY created_at DESC
            LIMIT 1;`
		)
		.asObjects();

	if (activeSession.sessionID == sessionID.uuid) {
		res.json({ loggedIn: true });
	} else {
		res.json({ loggedIn: false });
	}

	client.release();
});

router.get("/delete", async function () {
	const client = await pool.connect();
	client.query(
		`DELETE FROM sessions WHERE created_at=(SELECT MAX(created_at) FROM sessions)`
	);
	client.release();
});

module.exports = router;
