const express = require("express");
const argon2 = require("argon2");
const authenticateToken = require("../middlewares/authMiddleware");
const router = express.Router();

const { query } = require("../db");

router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log(req.cookies);
    const users = await query("SELECT * FROM users");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);
    const newUser = await query(
      "INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *",
      [req.body.username, hashedPassword]
    );
    res.json({ user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
