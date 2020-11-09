const jwt = require("jsonwebtoken");


module.exports = function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("You Need To Be Logged In For This");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Login Token Expired. Please Try Again.")
    req.id = user.id;
    req.role= user.role;
    next();
  });
};
