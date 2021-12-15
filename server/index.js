const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = { origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(express.json());

const { query } = require("./db");

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await query("SELECT * FROM tasks;");
    res.json(tasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(PORT, (err) => {
  console.log(`Server started on http://localhost:${PORT}`);
});
