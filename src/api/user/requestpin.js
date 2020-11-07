const router = require("express").Router();
const db = require("../../db");
const generate = require("../../generate");
const { sendMailText } = require("../../nodemailer");

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

    const text = `Your Recovery Pin Code is ${generate(6)}`;

    sendMailText(
      "recover.shopdharan@gmail.com",
      [response.email_id],
      "Recovery Pin Code",
      text
    );
    return res.sendStatus(200)
  } catch (err) {
      console.log(err)
      res.sendStatus(500)
  }
});

module.exports = router