const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  const city_name = req.body.city_name;
  try {
    const city_id = uuid.v4();
    await db.query(`INSERT INTO city(city_id,city_name) VALUES($1,$2)`, [
      city_id,
      city_name,
    ]);
    res.status(201).json({ city_id });
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
