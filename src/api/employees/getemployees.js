const express = require("express");
const router = express.Router();

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN && req.role != ROLES.EMPLOYEE) return res.sendStatus(403);
  try {
    const query = await db.query(
      `SELECT employee_id, employee_name, is_admin,username,email
        FROM employee `,
      []
    );
    res.json(query.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
