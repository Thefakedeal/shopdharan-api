const router = require("express").Router();

const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");
const ORDER_STATUS = require('../../defaults/order_status.json')

router.get("/", async (req, res) => {
  try {
    if (req.role !== ROLES.SUPPLIER){
      console.log(`${req.role}: ${ROLES.SUPPLIER}`)
      return res.status(403).send("You're not Allowed To Access This");
    }

    const {page_number=0,order} = req.query;
    const LIMIT = 10;
    const OFFSET = LIMIT * page_number 
    
    let order_by = 'DESC'
    if(String(order)==='asc'){
    order_by = 'ASC'
    }
	
    const query = await db.query(`SELECT ord.order_id, ord.order_status, ord.ordered_time,
    oit.quantity, oit.ordered_item_id,
    p.product_id,p.product_name, p.price
    FROM orders ord, ordered_items oit, products p
    WHERE ($1::order_status IS NULL OR order_status=$1) AND
    ord.order_id = oit.order_id AND
    oit.product_id = p.product_id AND
    p.supplier_id= $2
    ORDER BY ordered_time ${order_by}, ord.order_id
    LIMIT $3 OFFSET $4
    `,[ORDER_STATUS.PREPARING,req.id,LIMIT,OFFSET])
    const orders = query.rows
    res.json(orders)
  } catch (err) {
      console.log(err)
      res.status(500).send("Something Went Wrong")
  }
});

module.exports = router;
