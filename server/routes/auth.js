const express = require("express");
const argon2 = require("argon2");
const jwtTokens = require("../utils/jwt-helper");
const jwt = require("jsonwebtoken");

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

router.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, user) => {
        if (error) return res.status(403).json({ error: error.message });
        let tokens = jwtTokens(user);
        res.cookie("refresh_token", tokens.refreshToken, {
          ...(process.env.COOKIE_DOMAIN && {
            domain: process.env.COOKIE_DOMAIN,
          }),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        return res.json(tokens);
      }
    );
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete("/refresh_token", (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({ message: "Refresh token deleted." });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
