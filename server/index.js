const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const tasksRouter = require("./routes/tasks");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();

const corsOptions = { origin: process.env.URL || "*" };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  console.log(`Server started on http://localhost:${PORT}`);
});
