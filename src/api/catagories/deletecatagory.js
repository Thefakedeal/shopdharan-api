const express = require("express");
const router = express.Router();

const ROLES = require("../defaults/roles.json");
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.delete("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  const { catagory_id } = req.body;
  try {
    await db.query(`DELETE FROM catagory WHERE catagory_id=$1`, [catagory_id]);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
