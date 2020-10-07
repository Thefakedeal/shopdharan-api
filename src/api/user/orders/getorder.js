const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middlewares/authenticateToken");
const ROLES = require("../../defaults/roles.json");
const db = require("../../../db");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const { order_id } = req.query;
    if (req.role !== ROLES.USER)
      return res.status(403).send("Only Users Can Access This");

    const query = await db.query(
      `SELECT order_id, order_status, address_id, ordered_time
        FROM orders WHERE order_id=$1 AND user_id=$2
    `,
      [order_id, req.id]
    );

    const order = query.rows[0];
    if (!order) return res.status(404).send("Order not Found");

    const items_query = await db.query(
      `SELECT oit.ordered_item_id, oit.product_id, oit.quantity,
        pd.product_name, pd.price, pd.supplier_id
        FROM ordered_items oit, products pd
        WHERE order_id = $1 AND pd.product_id=oit.product_id
    `,
      [order_id]
    );

    const ordered_items = items_query.rows;
    res.json({ order, ordered_items });
  } catch (err) {
    console.log(err)
    res.status(400).send("Something Went Wrong");
  }
});

module.exports = router;
