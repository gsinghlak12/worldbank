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

///

///
module.exports = router;
