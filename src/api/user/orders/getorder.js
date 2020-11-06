const express = require("express");
const router = express.Router();
const authenticateToken = require("../../middlewares/authenticateToken");
const ROLES = require("../../defaults/roles.json");
const db = require("../../../db");
const {
  getNumberOfSuppliers,
  getDeliveryCharge,
  getProductCost,
} = require("./ordersFunctions");
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

    const addressquery = await db.query(`SELECT address_id, address.city_id, city.city_name, address.street_name, address.details 
    FROM address,city
    WHERE address.address_id = $1 AND address.city_id = city.city_id
    `,[order.address_id])

    const address = addressquery.rows[0];

    const items_query = await db.query(
      `SELECT oit.ordered_item_id, oit.product_id, oit.quantity,
        pd.product_name, pd.price, pd.supplier_id, sup.city_id
        FROM ordered_items oit, products pd,suppliers sup
        WHERE order_id = $1 AND pd.product_id=oit.product_id
        AND pd.supplier_id=sup.supplier_id
    `,
      [order_id]
    );

    const ordered_items = items_query.rows;

    const productCost = getProductCost(ordered_items);
    const suppliers = getNumberOfSuppliers(ordered_items,address);
    const deliveryCharge = getDeliveryCharge(suppliers);
    
    res.json({
      order,
      address,
      ordered_items,
      numOfSuppliers: parseInt(suppliers.sameCity) + parseInt(suppliers.differentCity),
      deliveryCharge,
      total: deliveryCharge + productCost,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something Went Wrong");
  }
});

module.exports = router;
