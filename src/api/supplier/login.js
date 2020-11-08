const express = require("express");
const router = express.Router();
const db = require("../../db");
const { compare } = require("../../bcrypt");
const jwt = require("jsonwebtoken");
const ROLES = require('../defaults/roles.json')
const {login} = require('../../login')

router.post("/", async (req, res) => {
  
  try {
    const { email_id, password } = req.body;
    const query = await db.query(
      `SELECT email_id, password, supplier_id
        FROM suppliers WHERE email_id=$1 `,
      [email_id.toLowerCase().trim()]
    );
    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);
    
    const valid = await compare(password, response.password);
    if (!valid) return res.status(401).send(`Invalid Password`);

    const user = {
      id: response.supplier_id,
      role: ROLES.SUPPLIER
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'60m'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn: '80d'});
    
    const loggedIn = login(user.role,user.id,refreshToken)
    if(!loggedIn) return res.status(500).send("Failed To Login")
    
    res.json({ accessToken,refreshToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
