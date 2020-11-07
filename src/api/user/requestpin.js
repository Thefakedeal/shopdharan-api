const router = require("express").Router();
const db = require("../../db");
const generate = require("../../generate");
const { sendMailText } = require("../../nodemailer");
const {savePin} = require('../pincode')
const ROLES = require('../defaults/roles.json')

router.post("/", async (req, res) => {
  try {
    const { email_id } = req.body;
    const query = await db.query(
      `SELECT email_id, password, user_id
              FROM users WHERE email_id=$1`,
      [email_id.toLowerCase().trim()]
    );
    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);
    const pin = generate(8)
    
    const success = savePin(ROLES.USER,email_id,pin)
    
    if(!success) throw "Redis Set Error"
    const text = `Your Recovery Pin Code is ${pin}`;
    
    sendMailText(
      "recover.shopdharan@gmail.com",
      [response.email_id],
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