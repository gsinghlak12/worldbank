var express = require("express");
var router = express.Router();

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

async function getAllUsers(client) {
  let sql = `SELECT * FROM users`;
  try {
    console.log(sql);
    const res = await client.query(sql);
    console.log(res);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return err.stack;
  }
}

// define the home page route
router.get("/", async function (req, res) {
  const client = await pool.connect();

  const data = await getAllUsers(client);
  console.log(data);
  res.json({ message: data });

  client.release();
});
// define the about route

module.exports = router;
