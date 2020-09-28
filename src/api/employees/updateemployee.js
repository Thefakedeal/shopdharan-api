const express = require("express");
const router = express.Router();

const ROLES = require('../defaults/roles.json')
const authenticateToken = require('../middlewares/authenticateToken');
const db = require("../../db");


router.put("/", authenticateToken ,async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  try {
    const { employee_id, employee_name, is_admin, username, email } = req.body;
    await db.query(
      `UPDATE employee SET employee_name=$1, is_admin=$2, username=$3, email=$4
        WHERE employee_id= $5
      `,
      [employee_name, is_admin, username, email, employee_id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
