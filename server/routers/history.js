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

	const { user_id, firstCountry, secondCountry, indicator } = await req.body;
	console.log(user_id, firstCountry, secondCountry, indicator);
	await client.query(
		"INSERT INTO history (user_id, country1_id,country2_id,indicator_id) VALUES ($1, $2,$3,$4)",
		[user_id, firstCountry, secondCountry, indicator]
	);

	client.release();
});

module.exports = router;
