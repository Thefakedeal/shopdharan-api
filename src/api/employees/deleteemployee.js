const express = require("express");
const router = express.Router();

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.ADMIN) return res.sendStatus(403); 
    const employee_id = req.body.employee_id;
    await db.query('DELETE FROM employee WHERE employee_id=$1',[employee_id]);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
