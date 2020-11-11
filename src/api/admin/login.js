const express = require("express");
const router = express.Router();
const db = require("../../db");
const { compare } = require("../../bcrypt");
const jwt = require("jsonwebtoken");
const ROLES = require("../defaults/roles.json");
const { login } = require("../../login");

router.post("/", async (req, res) => {
  const user = {};
  try {
    const { username, password } = req.body;
    //Check if the User is Root User Set By Env
    if (username === process.env.ROOT_ADMIN_USERNAME) {
      if (password !== process.env.ROOT_ADMIN_PASSWORD) {
        return res.status(401).send(`Invalid Password`);
      }

      user.id = process.env.ROOT_ADMIN_ID;
      user.role = ROLES.ADMIN;
    } else {
      //if not check for the user in Database
      const query = await db.query(
        `SELECT username, password, employee_id, is_admin
          FROM employee WHERE username=$1`,
        [username.toLowerCase().trim()]
      );
      const response = query.rows[0];
      if (!response) return res.status(401).send(`User Doesn't Exists`);
      const valid = await compare(password, response.password);
      if (!valid) return res.status(401).send(`Invalid Password`);

      user.id = response.employee_id;
      user.role = response.is_admin ? ROLES.ADMIN : ROLES.EMPLOYEE;
    }

    // const user = {
    //   id: response.employee_id,
    //   role: response.is_admin ? ROLES.ADMIN : ROLES.EMPLOYEE,
    // };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });

    const loggedIn = login(user.role, user.id, refreshToken);
    if (!loggedIn) return res.status(500).send("Failed To Login");
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
