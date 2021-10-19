var express = require("express");
var router = express.Router();

const { Pool, Client } = require("pg");

const client2 = new Client("postgres://localhost:5432/worldbank");

(async function () {
  await client2.connect();
})();

async function getAllUsers() {
  let sql = `SELECT * FROM users`;
  try {
    console.log(sql);
    const res = await client2.query(sql);
    console.log(res);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return err.stack;
  }
}

// define the home page route
router.get("/", async function (req, res) {
  const data = await getAllUsers();
  console.log(data);
  res.json({ message: data });
});
// define the about route

module.exports = router;
