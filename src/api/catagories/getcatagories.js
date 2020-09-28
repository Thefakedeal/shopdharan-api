const express = require("express");
const router = express.Router();


const db = require("../../db");

router.get("/", async (req, res) => {
  try {
    const query = await db.query(`SELECT catagory_id, catagory_name FROM catagory`, []);
    const catagories = query.rows;
    res.json(catagories)
  }
  catch(err){
      res.sendStatus(500)
  }
});

module.exports = router;