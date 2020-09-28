const express = require("express");
const router = express.Router();


const ROLES = require('../defaults/roles.json')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.put("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  const {catagory_name,catagory_id} = req.body;
  try {
    await db.query(`UPDATE catagory SET catagory_name=$1 WHERE catagory_id=$2`, [
      catagory_name,
      catagory_id
    ]);
    res.sendStatus(200)
  }
  catch(err){
      res.sendStatus(500)
  }
});

module.exports = router;
