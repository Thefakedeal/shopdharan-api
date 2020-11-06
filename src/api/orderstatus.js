const router = require("express").Router();

const ORDER_STATUS = require('./defaults/order_status.json')

router.get("/", (req, res) => {
  try {
    //Converts Object values to array
    const order_status_array = Object.keys(ORDER_STATUS).map(key=>ORDER_STATUS[key])
    res.json(order_status_array)
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
});

module.exports = router;