const express = require("express");
const router = express.Router();
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

// define the indicators
router.get("/", async function (req, res) {
  sql = "SELECT countrycode,shortname FROM countries";

  const countries = await client.query(sql);

  res.json({
    countries: countries.rows,
  });
});
// define the about route

module.exports = router;
