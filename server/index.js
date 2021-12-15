import express, { json } from "express";
import cors from "cors";
// import pool from './db.js'

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(json());

app.get("/tasks", (req, res) => {
  res.json("Hello");
});

app.listen(PORT, (err) => {
  console.log(`Server started on http://localhost:${PORT}`);
});
