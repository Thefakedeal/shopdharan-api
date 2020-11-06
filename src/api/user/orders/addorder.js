const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const authenticateToken = require("../../middlewares/authenticateToken");
const ROLES = require("../../defaults/roles.json");
const db = require("../../../db");

router.post("/", authenticateToken, async (req, res) => {
  const client = await db.connect();
  try { 
    if (req.role !== ROLES.USER)
      return res.status(403).send("Only Users Can Perform This Action");
    const user_id = req.id;
    const order_id = uuid.v4();
    const { orders = [], address_id } = req.body;
    if (!address_id) return res.status(400).send("Please Specify An Address");
    if (orders.length == 0) return res.status(400).send("Order can't be empty");

    await client.query("BEGIN");
    const insertOrder = await client.query(
      `INSERT INTO orders(order_id, user_id, address_id)
        VALUES($1,$2,$3)
    `,
      [order_id, user_id, address_id]
    );

    for (const order of orders) {
      const order_item_id = uuid.v4();
      const { product_id, quantity=1 } = order;
      const order_item = await client.query(
        `INSERT INTO ordered_items(ordered_item_id, order_id, product_id, quantity)
    VALUES($1,$2,$3,$4)
    `,
        [order_item_id, order_id, product_id, quantity]
      );
    }
    client.query('COMMIT')
    res.json({order_id});
  } catch (err) {
    console.log(err)
    res.status(500).send("Something Went Wrong");
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
});

module.exports = router;
