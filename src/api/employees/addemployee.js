const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const ROLES = require('../defaults/roles.json')
const authenticateToken = require('../middlewares/authenticateToken');
const db = require("../../db");
const { hash } = require("../../bcrypt");

router.post("/", authenticateToken ,async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  try {
    const employee_id = uuid.v4();
    const { employee_name, is_admin, username, password, email } = req.body;

    const hashedPassword = await hash(password);
    await db.query(
      `INSERT INTO employee(employee_id,employee_name,is_admin,username,password,email)
        VALUES($1,$2,$3,$4,$5,$6)`,
      [employee_id, employee_name, is_admin, username, hashedPassword, email]
    );
    res.status(201).json({employee_id});
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
