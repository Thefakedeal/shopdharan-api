const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const jwt = require('jsonwebtoken')

const ROLES = require("../defaults/roles.json");

const db = require("../../db");
const { hash } = require("../../bcrypt");
const {validateEmail, validatePassword} = require('../../validations')

router.post("/", async (req, res) => {
  try {
    const user_id = uuid.v4();
    const { user_name, email_id, password, mobile_number } = req.body;

    if(!validateEmail(email_id)) return res.status(400).send("Invalid Email")
    if(!validatePassword(password)) return res.status(400).send("Invalid Password")
    if(!user_name) return res.status(400).send("Name is required")
    if(!mobile_number) return res.status(400).send("Mobile Number Is Required")

    const hashedPassword = await hash(password);
    await db.query(
      `INSERT INTO users(user_id,user_name,email_id,password,mobile_number)
        VALUES($1,$2,$3,$4,$5)`,
      [user_id, user_name, email_id, hashedPassword, mobile_number]
    );

    const user = {
      id: user_id,
      role: ROLES.USER,
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({accessToken,refreshToken})
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
