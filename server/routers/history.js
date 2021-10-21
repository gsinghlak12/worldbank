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

router.post("/postSearch", async function (req, res) {
	const client = await pool.connect();

	const { user_id, firstCountry, secondCountry, indicator } = await req.body;
	console.log(user_id, firstCountry, secondCountry, indicator);
	try {
		await client.query(
			"INSERT INTO history (user_id, country1_id,country2_id,indicator_id) VALUES ($1, $2,$3,$4)",
			[user_id, firstCountry, secondCountry, indicator]
		);
		res.status(200).json({ Message: "History updated!" }, 200);
	} catch {
		res.status(400).json({ Message: "Error" }, 400);
	}

	client.release();
});

router.get("/", async function (req, res) {
	const client = await pool.connect();
	try {
		const user_id = await client.query(`SELECT user_id FROM sessions`);
		const user_id_value = user_id.rows[0].user_id;
		const response = await client.query(
			`SELECT country1_id,country2_id,indicator_id,created_at
    FROM history WHERE user_id=$1`,
			[user_id_value]
		);
		res.json(response.rows);
		console.log(user_id.rows[0].user_id);
		console.log(response.rows);
	} catch {
		res.status(400).json({ Message: "Error" }, 400);
	}

	client.release();
});

module.exports = router;
