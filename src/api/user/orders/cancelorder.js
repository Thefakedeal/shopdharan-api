const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middlewares/authenticateToken");
const ROLES = require("../../defaults/roles.json");
const db = require("../../../db");
const ORDER_STATUS = require("../../defaults/order_status.json");

router.put("/", authenticateToken, async (req, res) => {
  const client = await db.connect();
  try {
    if (req.role !== ROLES.USER)
      return res.status(403).send("Only Users Can Perform This Action");

    const { order_id } = req.body;
    await client.query("BEGIN");
    const query = await client.query(
      `SELECT order_status FROM orders
    WHERE order_id=$1 AND user_id=$2`,
      [order_id, req.id]
    );
    const order_status = query.rows[0].order_status;
    if (query.rowCount == 0) return res.status(404).send("Order Not Found");
    if (order_status !== ORDER_STATUS.PROCESSING)
      return res
        .status(400)
        .send(`Your Order is ${order_status} it can't be cancelled`);

    const cancelorder = await client.query(
      `UPDATE orders SET order_status=$1
    WHERE order_id=$2 AND user_id=$3
    `,
      [ORDER_STATUS.CANCELLED, order_id, req.id]
    );
    client.query('COMMIT')
    res.send("Order Cancelled");
  } catch (err) {
    res.status(400).send("Something Went Wrong");
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
});

module.exports = router;
