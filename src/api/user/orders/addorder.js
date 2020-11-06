const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const authenticateToken = require("../../middlewares/authenticateToken");
const ROLES = require("../../defaults/roles.json");
const db = require("../../../db");

const {
  getOrderWithCity,
  getDeliveryCharge,
  getProductCost,
  getNumberOfSuppliers,
  getAddress,
} = require("./ordersFunctions");

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

    //Calculate Delivery Charge And Num Of Supplier
    const cart_orders = await getOrderWithCity(orders);
    const address = await getAddress(address_id);
    const suppliers = getNumberOfSuppliers(cart_orders, address);
    const numOfSuppliers = parseInt(suppliers.sameCity) + parseInt(suppliers.differentCity);
    const deliveryCharge = getDeliveryCharge(suppliers);

    //Begin Transaction
    await client.query("BEGIN");
    //Add Order
    const insertOrder = await client.query(
      `INSERT INTO orders(order_id, user_id, address_id)
        VALUES($1,$2,$3)
    `,
      [order_id, user_id, address_id]
    );

    //Add Order Items
    for (const order of orders) {
      const order_item_id = uuid.v4();
      const { product_id, quantity = 1 } = order;
      const order_item = await client.query(
        `INSERT INTO ordered_items(ordered_item_id, order_id, product_id, quantity)
    VALUES($1,$2,$3,$4)
    `,
        [order_item_id, order_id, product_id, quantity]
      );
    }
    //Add Delivery Cost

    const addCost = await client.query(
      `INSERT INTO
    delivery_cost(order_id,delivery_cost,num_suppliers)
    VALUES($1,$2,$3)
    `,
      [order_id, deliveryCharge, numOfSuppliers]
    );

    //Commit Transaction
    client.query("COMMIT");
    res.json({ order_id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
    //If There Is An Error Revert All Transaction
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
});

module.exports = router;
