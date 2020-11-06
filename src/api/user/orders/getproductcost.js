const express = require("express");
const router = express.Router();

const {
  getCartOrders
} = require("./ordersFunctions");

router.post("/", async (req, res) => {
  try {
    const { orders = [] } = req.body;
    if (orders.length == 0) return res.status(400).send("Order can't be empty");
    const cart_orders = await getCartOrders(orders);

    res.json({
      cart_orders
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
