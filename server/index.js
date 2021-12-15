const express = require("express");
const app = express();
const port = 3001;

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "taskdb",
  password: "postgres",
  port: 5432,
});

pool.query("SELECT * FROM tasks", (err, res) => {
  if (err) {
    console.error(err);
    pool.end();
  } else {
    console.log(res.rows);
    pool.end();
  }
});

console.log("Start");

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
