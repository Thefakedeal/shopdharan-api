const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middlewares/authenticateToken");
const ROLES = require("../../defaults/roles.json");
const db = require("../../../db");

router.get("/", authenticateToken, async (req, res) => {
  try {

    const { order_status } = req.query;
    if (req.role !== ROLES.USER)
      return res.status(403).send("Only Users Can Access This");

    const query = await db.query(
      `SELECT order_id, order_status, address_id, ordered_time
        FROM orders WHERE user_id=$1 AND ($2::order_status IS NULL OR order_status=$2) ORDER BY ordered_time DESC
    `,
      [req.id, order_status]
    );
    const orders = query.rows;
    res.json(orders);
  } catch (err) {
    console.log(err)
    res.status(400).send("Something Went Wrong");
  }
});

module.exports = router;
