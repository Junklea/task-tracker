const express = require("express");
const argon2 = require("argon2");
const jwtTokens = require("../utils/jwt-helper");

const router = express.Router();

const { query } = require("../db");

router.post("/login", async (req, res) => {
  try {
    console.log(req.cookies, req.get("origin"));
    const { username, password } = req.body;
    const users = await query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (users.rows.length === 0)
      return res.status(401).json({ error: "Email is incorrect" });
    const validPassword = await argon2.verify(users.rows[0].password, password);
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });
    let tokens = jwtTokens(users.rows[0].uuid);
    res.cookie("refresh_token", tokens.refreshToken, {
      ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
