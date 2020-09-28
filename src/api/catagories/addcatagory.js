const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.ADMIN) return res.sendStatus(403);
    const catagory_name = req.body.catagory_name;
    const catagory_id = uuid.v4();
    await db.query(`INSERT INTO catagory(catagory_id,catagory_name) VALUES($1,$2)`, [
      catagory_id,
      catagory_name,
    ]);
    res.status(201).json({catagory_id})
  }
  catch(err){
      res.sendStatus(500)
  }
});

module.exports = router;
