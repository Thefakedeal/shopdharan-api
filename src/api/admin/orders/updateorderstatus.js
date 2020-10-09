const router = require("express").Router();

const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");
const ORDER_STATUS = require('../../defaults/order_status.json')
router.put("/", async (req, res) => {
  try {
    if (req.role !== ROLES.ADMIN && req.role !== ROLES.EMPLOYEE)
      return res.status(403).send("You're not Allowed To Access This");
    const { order_status, order_id } = req.body;
    //Converts Order status json to array values
    const order_status_array = Object.keys(ORDER_STATUS).map(key=>ORDER_STATUS[key])
    if(!order_status_array.includes(order_status)) return res.status(400).send("Invalid Order Status")
    const query = await db.query(
      ` UPDATE orders SET order_status=$1 WHERE order_id=$2
    `,
      [order_status, order_id]
    );
    console.log(query)
    res.status(200).send("Order Updated!!!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
});

module.exports = router;
