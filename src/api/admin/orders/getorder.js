const router = require("express").Router();
const prices = require("../../defaults/deliveryprice.json");
const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");

router.get("/", async (req, res) => {
  try {
    if (req.role !== ROLES.ADMIN && req.role !== ROLES.EMPLOYEE)
      return res.status(403).send("You're not Allowed To Access This");
    const { order_id } = req.query;
    const query = await db.query(
      `SELECT order_id, order_status, address_id, ordered_time,user_id
    FROM orders WHERE order_id=$1 `,
      [order_id]
    );
    const order = query.rows[0];
    if (query.rowCount === 0)
      return res.status(404).send("No Such Order Exists");
    const addressquery = await db.query(
      `SELECT address_id,city.city_name,street_name,details
    FROM address,city WHERE address_id = $1 AND address.city_id=city.city_id
    `,
      [order.address_id]
    );
    const address = addressquery.rows[0];

    const userquery = await db.query(
      `SELECT user_id,user_name,mobile_number,email_id
      FROM users WHERE user_id = $1 
      `,
      [order.user_id]
    );
    const user = userquery.rows[0];
    const items_query = await db.query(
      `SELECT oit.ordered_item_id, oit.product_id, oit.quantity,
          pd.product_name, pd.price, pd.supplier_id, sup.supplier_name
          FROM ordered_items oit, products pd, suppliers sup
          WHERE order_id = $1 AND pd.product_id=oit.product_id AND sup.supplier_id= pd.supplier_id
      `,
      [order_id]
    );
    const ordered_items = items_query.rows;

    const chargeQuery = await db.query(
      `SELECT delivery_cost,num_suppliers
      FROM delivery_cost WHERE order_id=$1 LIMIT 1
    `,
      [order_id]
    );
    const chargeValues = chargeQuery.rows[0];
    const deliveryCharge = chargeValues?chargeValues.delivery_cost:prices.INSIDECITY;
    const numOfSuppliers = chargeValues?chargeValues.num_suppliers:1;

    res.json({
      order,
      user,
      address,
      ordered_items,
      deliveryCharge,
      numOfSuppliers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
});

module.exports = router;
