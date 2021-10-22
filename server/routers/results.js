var express = require("express");
var router = express.Router();
const cors = require("cors");
const { Pool, Client } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://mdyeizsw:5uQ87xIDkLZWdnE30hzc1z5rydLuOHZ1@tai.db.elephantsql.com/mdyeizsw",
});

(async function () {
  res = await pool.connect();
  return res;
})();

///

///
module.exports = router;
