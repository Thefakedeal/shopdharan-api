const express = require("express");
const router = express.Router();
const db = require("../../db");
const {validatePassword} = require('../../validations')
const { hash } = require("../../bcrypt");
const {comparePin} = require('../pincode')
const ROLES = require('../defaults/roles.json')

router.put("/", async (req, res) => {
  try {
    const { email_id, new_password, pin } = req.body;
    if(!email_id) return res.status(401).send(`Email Not Provided`);
    if(!new_password) return res.status(401).send(`Password not Provided`);

    const pinsMatch = await comparePin(ROLES.USER, email_id, pin) 

    if(!pinsMatch) return res.status(401).send("Incorrect Pin or Email. Try again.")

    const query = await db.query(
      `SELECT email_id, password, user_id
        FROM users WHERE email_id=$1`,
      [email_id]
    );

    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);
    if(!validatePassword(new_password)) return res.status(401).send(`Invalid Password`);
    const hashedPassword = await hash(new_password);
    const change = await db.query(
      `UPDATE users SET password=$1 WHERE email_id=$2`,
      [hashedPassword, email_id]
    );

    res.status(200).send("Password Updated");
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
