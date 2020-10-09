const router = require("express").Router();

const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");

router.get("/", async (req, res) => {
  try {
    if (req.role !== ROLES.ADMIN && req.role !== ROLES.EMPLOYEE)
      return res.status(403).send("You're not Allowed To Access This");
    const {order_status, page_number=0, payed} = req.query;
    const LIMIT = 10;
    const OFFSET = LIMIT * page_number 
    const query = await db.query(`SELECT order_id, order_status, address_id, ordered_time
    FROM orders WHERE ($1::order_status IS NULL OR order_status=$1) AND ($2::boolean IS NULL OR payed=$2) 
    ORDER BY ordered_time DESC
    LIMIT $3 OFFSET $4
    `,[order_status,payed,LIMIT,OFFSET])
    const orders = query.rows
    res.json(orders)
  } catch (err) {
      console.log(err)
      res.status(500).send("Something Went Wrong")
  }
});

module.exports = router;
