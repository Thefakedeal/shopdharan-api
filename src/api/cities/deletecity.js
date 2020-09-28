const express = require("express");
const router = express.Router();

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  const {city_id} = req.body;
  try {
    await db.query(`DELETE from city WHERE city_id=$1`, [
      city_id
    ]);
    res.sendStatus(204)
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;