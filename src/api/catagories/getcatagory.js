const express = require("express");
const router = express.Router();

const db = require("../../db");

router.get("/", async (req, res) => {
  const catagory_id = req.query.catagory_id;
  console.log(catagory_id)
  try {
    const query = await db.query(
      `SELECT catagory_id, catagory_name FROM catagory
    WHERE catagory_id= $1
    `,
      [catagory_id]
    );
    const catagory = query.rows[0];
    if (!catagory) return res.sendStatus(404);
    res.json(catagory);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
