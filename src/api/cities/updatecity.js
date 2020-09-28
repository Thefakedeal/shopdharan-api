const express = require("express");
const router = express.Router();

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  const {city_id, city_name} = req.body;
  try {
    await db.query(`UPDATE city SET city_name=$2 WHERE city_id=$1`, [
      city_id,
      city_name,
    ]);
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
