const { Client } = require("pg");
const client = new Client(
  "postgres://mdyeizsw:5uQ87xIDkLZWdnE30hzc1z5rydLuOHZ1@tai.db.elephantsql.com/mdyeizsw"
);

async function createDatabase() {
  await client.connect();
  // createUsersTable();
  // addSeedData();
  //createSessionsTable();
  // createHistoryTable();
  // createCountrySearchesTable();
  // createIndicatorSearchesTable();
  return;
}

async function createUsersTable() {
  const sql = `

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

async function createHistoryTable() {
  const sql = `
  CREATE TABLE history(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    country1_id TEXT DEFAULT NULL,
    country2_id TEXT DEFAULT NULL,
    indicator_id TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
  `;
  try {
    const res = await client.query(sql);
    console.log("History table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("History table issue");
    return;
  }
}

async function createCountrySearchesTable() {
  const sql = `
  CREATE TABLE countrysearches(
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    indicator_id TEXT NOT NULL,
    history_id SERIAL NOT NULL REFERENCES history(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
  `;
  try {
    const res = await client.query(sql);
    console.log("CountrySearches table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("CountrySearches table issue");
    return;
  }
}
async function createIndicatorSearchesTable() {
  const sql = `
  CREATE TABLE indicatorSearches(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    history_id SERIAL NOT NULL REFERENCES history(id)
  )
  `;
  try {
    const res = await client.query(sql);
    console.log("IndicatorSearches table created");
    return;
  } catch (err) {
    console.log(err);
    console.log("IndicatorSearches table issue");
    return;
  }
}

createDatabase();
