const express = require("express");
const router = express.Router();
const db = require("../../db");
const {validatePassword} = require('../../validations')
const { hash } = require("../../bcrypt");
const {comparePin,deletePin} = require('../pincode')
const ROLES = require('../defaults/roles.json')

router.put("/", async (req, res) => {
  try {
    const { username, new_password, pin } = req.body;
    if(!username) return res.status(401).send(`Username Not Provided`);
    if(!new_password) return res.status(401).send(`Password not Provided`);

    const pinsMatch = await comparePin(ROLES.EMPLOYEE, username, pin) 

    if(!pinsMatch) return res.status(401).send("Incorrect Pin or Email. Try again.")

    const query = await db.query(
      `SELECT username, password
        FROM employee WHERE username=$1`,
      [username]
    );

    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);
    if(!validatePassword(new_password)) return res.status(401).send(`Invalid Password`);
    const hashedPassword = await hash(new_password);
    const change = await db.query(
      `UPDATE employee SET password=$1 WHERE username=$2`,
      [hashedPassword, username]
    );
    
    deletePin(ROLES.EMPLOYEE,username)
    res.status(200).send("Password Updated");
  } catch (err) {
      console.log(err)
    res.sendStatus(500);
  }
});

module.exports = router;
