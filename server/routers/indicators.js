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

function arrangeData(row) {
  const plot = row.reduce(
    (obj, val) => {
      obj.years.push(val.year);
      obj.value.push(val.value);
      return obj;
    },
    { years: [], value: [] }
  );

  plot["indicator"] = row[0].indicatorname;
  plot["country"] = row[0].countryname;

  return plot;
}

// One Indicator , One Country
router.get(
  "/:indicator_code/countries/:country_code",
  async function (req, res) {
    const indicator_code = req.params.indicator_code;
    const country = req.params.country_code;
    console.log(req.params);

    const sql = `SELECT value,year,countryname,indicatorname FROM indicators
  WHERE indicatorcode=$1 AND countrycode=$2
  ORDER BY year DESC
   LIMIT 10;`;

    const data = await client.query(sql, [indicator_code, country]);

    const plot = arrangeData(data.rows);

    res.json({ data: [plot] });
  }
);

router.get(
  "/:indicator_code/countries/:country_code1/:country_code2",
  async function (req, res) {
    const indicator_code = req.params.indicator_code;
    const country1 = req.params.country_code1;
    const country2 = req.params.country_code2;
    console.log(req.params);

    const sql = `SELECT value,year,countryname,indicatorname FROM indicators
  WHERE indicatorcode=$1 
  AND countrycode=$2
  ORDER BY year DESC
   LIMIT 10;`;

    const data = await client.query(sql, [indicator_code, country1]);
    const data2 = await client.query(sql, [indicator_code, country2]);

    const plot1 = arrangeData(data.rows);
    const plot2 = arrangeData(data2.rows);

    res.json({ data: [plot1, plot2] });
  }
);

module.exports = router;
