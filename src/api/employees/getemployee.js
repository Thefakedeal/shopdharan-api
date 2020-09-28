const express = require("express");
const router = express.Router();

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  const employee_id = req.query.employee_id;
  if (req.role != ROLES.ADMIN && req.role != ROLES.EMPLOYEE) return res.sendStatus(403);
  try {
    const query = await db.query(
      `SELECT employee_id, employee_name, is_admin,username,email
        FROM employee WHERE employee_id=$1`,
      [employee_id]
    );
    const response = query.rows[0];
    if (!response) return res.sendStatus(404);
    res.json(response);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
