const router = require("express").Router();

const ROLES = require("../../defaults/roles.json");
const ORDER_STATUS = require('../../defaults/order_status.json')

router.get("/", async (req, res) => {
  try {
    if (req.role !== ROLES.ADMIN && req.role !== ROLES.EMPLOYEE)
      return res.status(403).send("You're not Allowed To Access This");
    //Converts Object values to array
    const order_status_array = Object.keys(ORDER_STATUS).map(key=>ORDER_STATUS[key])
    res.json(order_status_array)
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
});

module.exports = router;
