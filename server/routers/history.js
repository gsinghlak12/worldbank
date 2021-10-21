var express = require("express");
var router = express.Router();
const cors = require("cors");

const { Pool, Client } = require("pg");

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
router.get("/", function (req, res) {
	res.json({ message: "History list will be here soon" });
});

router.post("/postSearch", async function (req, res) {
	const client = await pool.connect();

	const { firstCountry, indicator } = await req.body;

	await client.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
		sessionID,
		userKey.rows[0].id,
	]);
	//first insert into countrysearches (country,)
	res.cookie("sessionID", sessionID).send("cookie sent");

	client.release();
});

module.exports = router;
