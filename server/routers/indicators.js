const express = require("express");
const router = express.Router();

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

// NOTE: ATM client2 IS THE LOCAL DATABASE ->
(async function () {
  await client.connect();
})();

// define the home page route
router.get("/", async function (req, res) {
  const indicator = "Birth rate, crude (per 1,000 people)";
  const country = "ARB";
  const years = await client.query(`SELECT value,year FROM indicators
  WHERE indicatorname='${indicator}' AND countrycode='${country}'
   LIMIT 10;`);

  const plot = years.rows.reduce(
    (obj, val) => {
      obj.years.push(val.year);
      obj.value.push(val.value);
      return obj;
    },
    { years: [], value: [] }
  );

  plot["title"] = indicator;
  plot["country"] = country;
  res.json(plot);
});
// define the about route

module.exports = router;
