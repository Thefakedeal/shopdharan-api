const express = require("express");
const router = express.Router();

const db = require("../../db");

router.get("/", async (req, res) => {
const city_id= req.query.city_id;
  try {
    const query = await db.query(`SELECT * FROM city WHERE city_id=$1`, [city_id]);
    const city= query.rows[0];
    if(!city) return res.sendStatus(404);
    res.status(200).json(city);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;