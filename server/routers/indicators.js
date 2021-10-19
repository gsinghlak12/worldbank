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

// define the indicators
router.get("/", async function (req, res) {
  const indicator = "Birth rate, crude (per 1,000 people)";
  const country = "ARB";

  const years = await client.query(`SELECT value,year FROM indicators
  WHERE indicatorname='${indicator}' AND countrycode='${country}'
  ORDER BY year DESC
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

// User can enter country code and that data will be used

router.get("/countries/:country_code", async function (req, res) {
  // WE NEED TO CHANGE THIS TO MAKE SURE URM
  // THAT THE OTHER INDICATORS ARE THERE
  // AND ALL INDICATORS WE ARE INTERESTED IN, ARE PUT IN AN ARRAY
  // THAT WE CAN MAP THROUGH IN THE FRONT

  const indicator = "Birth rate, crude (per 1,000 people)";
  const country = req.params.country_code;
  console.log(req.params);

  const years = await client.query(`SELECT value,year FROM indicators
  WHERE indicatorname='${indicator}' AND countrycode='${country}'
  ORDER BY year DESC
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

router.get("/:series_code/countries/:country_code", async function (req, res) {
  const indicator_code = req.params.series_code;
  const country = req.params.country_code;
  console.log(req.params);

  const years =
    await client.query(`SELECT value,year,countryname FROM indicators
  WHERE indicatorcode='${indicator_code}' AND countrycode='${country}'
  ORDER BY year DESC
   LIMIT 10;`);

  const plot = years.rows.reduce(
    (obj, val) => {
      obj.years.push(val.year);
      obj.value.push(val.value);
      return obj;
    },
    { years: [], value: [] }
  );

  console.log(years.rows);

  plot["title"] = indicator_code;
  plot["country"] = years.rows[0].countryname;
  res.json(plot);
});

module.exports = router;
