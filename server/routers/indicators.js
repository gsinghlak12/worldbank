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
  // RETURN A LIST OF ALL REQUIRED INDICATORS
  const data = [
    "SP.ADO.TFRT",
    "SE.ADT.LITR.FE.ZS",
    "SL.TLF.0714.WK.FE.TM",
    "SP.DYN.CBRT.IN",
    "SP.DYN.LE00.FE.IN",
  ];

  const sql = `SELECT seriescode,topic,indicatorname
              FROM series 
              WHERE seriescode = ANY($1::text[])
              LIMIT 10`;

  const indicators = await client.query(sql, [data]);

  res.json({ data: indicators.rows });
});
// define the about route

// User can enter country code and that data will be used

router.get("/countries/:country_code", async function (req, res) {
  // WE NEED TO CHANGE THIS TO MAKE SURE URM
  // THAT THE OTHER INDICATORS ARE THERE
  // AND ALL INDICATORS WE ARE INTERESTED IN, ARE PUT IN AN ARRAY
  // THAT WE CAN MAP THROUGH IN THE FRONT
  // ALSO GET RID OF URM THE SQL INJECTION!!!

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

  sql = `SELECT value,year,countryname FROM indicators
  WHERE indicatorcode=$1 AND countrycode=$2
  ORDER BY year DESC
   LIMIT 10;`;

  const years = await client.query(sql, [indicator_code, country]);

  const plot = years.rows.reduce(
    (obj, val) => {
      obj.years.push(val.year);
      obj.value.push(val.value);
      return obj;
    },
    { years: [], value: [] }
  );

  console.log(years.rows);

  plot["indicator"] = indicator_code;
  plot["country"] = years.rows[0].countryname;
  res.json({ data: [plot] });
});

module.exports = router;
