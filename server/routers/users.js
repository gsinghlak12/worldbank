var express = require("express");
var router = express.Router();
const cors = require("cors");

const bcrypt = require("bcrypt");
const v4 = require("uuid");

const { Pool, Client } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://mdyeizsw:5uQ87xIDkLZWdnE30hzc1z5rydLuOHZ1@tai.db.elephantsql.com/mdyeizsw",
});

// define the home page route
router.post("/", async function (req, res) {
  const client = await pool.connect();

  const { username, password } = await req.body;
  const salt = await bcrypt.genSalt(8);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  const duplicate = await client.query(
    `SELECT username FROM users WHERE username=$1`,
    [username]
  );
  if (duplicate.rows.length !== 0) {
    res.json(
      {
        Message: "This username is taken. Please try a different one or login.",
      },
      400
    );
  } else {
    res.status(200).json({ Message: "Works" }, 200);

    await client.query(`INSERT INTO users(username,password) VALUES($1,$2)`, [
      username,
      passwordEncrypted,
    ]);

    client.release();
  }
});

router.post("/verify", async function (req, res) {
  const client = await pool.connect();

  const { username, password } = await req.body;
  const hash = await client.query(
    `SELECT password FROM users WHERE username=$1`,
    [username]
  );
  if (hash.rows[0]) {
    const hashing = hash.rows[0].password;

    const result = await bcrypt.compare(password, hashing);
    if (result) {
      res.json({ status: "loggedIn" }, 200);
    } else {
      res.json({ status: "Incorrect password. Please try again." }, 400);
    }
  } else {
    res.json(
      {
        status:
          "Username doesn't exist. Please try again or register an account",
      },
      400
    );
  }

  client.release();
});

module.exports = router;
