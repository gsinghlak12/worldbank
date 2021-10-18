const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/worldbank");

async function createDatabase() {
  await client.connect();
  createUsersTable();
  return;
}

async function createUsersTable() {
  const sql = `
  CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`;

  try {
    const res = await client.query(sql);
    console.log("Stories table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Stories table issue");
    return;
  }
}

createDatabase();
