const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.delete("/", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send("Youre not logged in");
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    return res.sendStatus(204);
  });
});

module.exports = router;
