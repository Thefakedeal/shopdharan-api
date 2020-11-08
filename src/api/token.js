const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verify } = require("../login");

router.post("/", (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        const valid = await verify(user.role, user.id, refreshToken);
        if (!valid) return res.sendStatus(403);
        const newUser = {
          id: user.id,
          role: user.role,
        };
        const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
        res.json({ accessToken });
      }
    );
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
