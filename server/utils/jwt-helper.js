const jwt = require("jsonwebtoken");

module.exports = function jwtTokens({ user_uuid }) {
  const user = { user_uuid };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return { accessToken, refreshToken };
};
