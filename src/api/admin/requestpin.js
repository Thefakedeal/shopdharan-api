const router = require("express").Router();
const db = require("../../db");
const generate = require("../../generate");
const { sendMailText } = require("../../nodemailer");
const {savePin} = require('../pincode')
const ROLES = require('../defaults/roles.json')

router.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    const query = await db.query(
      `SELECT email,username FROM employee WHERE username=$1`,
      [username.toLowerCase().trim()]
    );
    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);
    const pin = generate(8)
    
    const success = savePin(ROLES.EMPLOYEE,username,pin)
    
    if(!success) throw "Redis Set Error"
    const text = `Your Recovery Pin Code is ${pin}`;
    
    console.log(response.email)
    sendMailText(
      "recover.shopdharan@gmail.com",
      [response.email],
      "Recovery Pin Code",
      text
    );
    return res.sendStatus(200)
  } catch (err) {
      console.log(err)
      res.status(500).send("Failed To Send Key Please Try again")
  }
});

module.exports = router