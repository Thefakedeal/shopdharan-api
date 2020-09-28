const jwt = require("jsonwebtoken");
const ROLES = require('../defaults/roles.json')

module.exports = function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.id = user.id;
    req.role= user.role;
    next();
  });
};
