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
    const tasks = await query(
      "SELECT id, title as text, deadline as day, reminder FROM tasks ORDER BY ID;"
    );
    res.json(tasks.rows);
  } catch (error) {
    console.error(error.message);
    res.status(404).json("Error");
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const tasks = await query(
      "SELECT id, title as text, deadline as day, reminder FROM tasks WHERE id=$1;",
      [req.params.id]
    );
    tasks.rowCount === 1
      ? res.json(tasks.rows[0])
      : res.status(404).json({ ERROR: "Not Found" });
  } catch (error) {
    console.error(error.message);
    res.status(404).json("Error");
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const insertedTask = await query(
      "INSERT INTO tasks (title, deadline, reminder) values ($1, $2, $3) " +
        "RETURNING id, title as text, deadline as day, reminder;",
      [req.body.text, req.body.day, req.body.reminder]
    );
    res.json(insertedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(404).json("Error");
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await query(
      "DELETE FROM tasks WHERE id=$1" +
        "RETURNING id, title as text, deadline as day, reminder;",
      [req.params.id]
    );
    res.json(deletedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(404).json("Error");
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const insertedTask = await query(
      "UPDATE tasks SET reminder=$1 WHERE id=$2" +
        "RETURNING id, title as text, deadline as day, reminder;",
      [req.body.reminder, req.params.id]
    );
    res.json(insertedTask.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(404).json("Error");
  }
});

app.listen(PORT, (err) => {
  console.log(`Server started on http://localhost:${PORT}`);
});
