const express = require("express");
const router = express.Router();
const db = require("../../db");
const { compare } = require("../../bcrypt");
const jwt = require("jsonwebtoken");
const ROLES = require('../defaults/roles.json')

router.post("/", async (req, res) => {
  
  try {
    const { username, password } = req.body;
    console.log(req)
    const query = await db.query(
      `SELECT username, password, employee_id, is_admin
        FROM employee WHERE username=$1`,
      [username]
    );
    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);
    
    const valid = await compare(password, response.password);
    if (!valid) return res.status(401).send(`Invalid Password`);

    const user = {
      id: response.employee_id,
      role: response.is_admin?ROLES.ADMIN:ROLES.EMPLOYEE
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn: '30d'});

    res.json({ accessToken,refreshToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
