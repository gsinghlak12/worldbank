const { text } = require("express");
const express = require("express");
const path = require("path");
const indicators = require("./routers/indicators");
const users = require("./routers/users");
const history = require("./routers/history");
const bodyParser = require("body-parser");
// const client2 = new Client("postgres://localhost:5432/worldbank");
const PORT = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use("/api/indicators", indicators);
app.use("/api/users", users);
app.use("/api/history", users);


app.get("/api", async (req, res) => {
	// const result =
	// 	await client.query(`SELECT countrycode,indicatorname,year,value FROM indicators
	// WHERE indicatorname='Birth rate, crude (per 1,000 people)' AND countrycode='ARB'
	//  LIMIT 10;`);

	const years = await client.query(`SELECT value,year FROM indicators
  WHERE indicatorname='Birth rate, crude (per 1,000 people)' AND countrycode='ARB'
   LIMIT 10;`);

	const Arr = years.rows.reduce(
		(obj, val) => {
			obj.years.push(val.year);
			obj.value.push(val.value);
			return obj;
		},
		{ years: [], value: [] }
	);

	res.json(Arr);
});

// app.get("/api", async (req, res) => {
// 	const result =
// 		await client.query(`SELECT countrycode,indicatorname,year,value FROM indicators
//   WHERE indicatorname='Birth rate, crude (per 1,000 people)' AND year=1999
//    LIMIT 10;`);
// 	res.json(result.rows);
// });

app.use(express.static(path.resolve(__dirname, "../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
