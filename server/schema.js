const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/worldbank");

async function createDatabase() {
  await client.connect();
  createUsersTable();
  addSeedData();
  createSessionsTable();
  return;
}

async function createUsersTable() {
  const sql = `
  DROP TABLE users;
  CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
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

async function createSessionsTable() {
  const sql = `
  CREATE TABLE sessions(
  uuid TEXT PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
  )`;

  try {
    const res = await client.query(sql);
    console.log("Sessions table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("Sessions table issue");
    return;
  }
}

async function addSeedData() {
  const sql = `
 INSERT INTO users(username, password) VALUES('test', 'test')`;

  try {
    const res = await client.query(sql);
    console.log("Seed Data added");
    return;
  } catch (err) {
    console.log(err);
    console.log("Seed data issue");
    return;
  }
}

createDatabase();
