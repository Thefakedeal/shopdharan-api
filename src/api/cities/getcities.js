const express = require("express");
const router = express.Router();

const db = require("../../db");

router.get("/", async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM city`, []);
    const cities= query.rows;
    res.status(200).json(cities);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
