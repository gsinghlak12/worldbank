var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { Pool, Client } = require("pg");
const { application } = require("express");
router.use(cookieParser());

const pool = new Pool({
  connectionString:
    "postgres://mdyeizsw:5uQ87xIDkLZWdnE30hzc1z5rydLuOHZ1@tai.db.elephantsql.com/mdyeizsw",
});

router.post("/", async function (req, res) {
  const client = await pool.connect();

  const { username, password } = await req.body;
  const sessionID = uuidv4();
  const userKey = await client.query(`SELECT id FROM users WHERE username=$1`, [
    username,
  ]);

  await client.query("INSERT INTO sessions (uuid, user_id) VALUES ($1, $2)", [
    sessionID,
    userKey.rows[0].id,
  ]);

  res.cookie("sessionID", sessionID).send("cookie sent");

  client.release();
  console.log("released");
});


router.get("/cookie", async function (req, res) {
	const client = await pool.connect();


  const activeSession = await req.cookies;
  const sessionID = await client.query(
    `SELECT uuid FROM sessions
              ORDER BY created_at DESC
              LIMIT 1;`
  );

  if (sessionID.rows[0]) {
    if (activeSession.sessionID === sessionID.rows[0].uuid) {
      res.json({ loggedIn: true });
      console.log("passes");
    } else {
      res.json({ loggedIn: false });
      console.log("fails");
    }
  } else {
    res.json({ loggedIn: false });
    console.log("fails");
  }

  client.release();
});


router.delete("/", async function () {
	const client = await pool.connect();
	client.query(
		`DELETE FROM sessions WHERE created_at=(SELECT MAX(created_at) FROM sessions)`
	);
	client.release();
});

module.exports = router;
