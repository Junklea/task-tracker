const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  console.log(`Server started on http://localhost:${PORT}`);
});
