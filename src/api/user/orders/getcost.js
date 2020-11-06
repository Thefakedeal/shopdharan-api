const express = require("express");
const router = express.Router();

const {
  getCartOrders,
  getOrderWithCity,
  getDeliveryCharge,
  getProductCost,
  getNumberOfSuppliers,
  getAddress,
} = require("./ordersFunctions");

router.post("/", async (req, res) => {
  try {
    const { orders = [], address_id } = req.body;
    if (orders.length == 0) return res.status(400).send("Order can't be empty");
    const cart_orders = await getOrderWithCity(orders);
    const productCost = getProductCost(cart_orders);
    const address = await getAddress(address_id)
    const numOfSuppliers = getNumberOfSuppliers(cart_orders, address);
    const deliveryCharge = getDeliveryCharge(numOfSuppliers);

    res.json({
      cart_orders,
      deliveryCharge,
      suppliers: parseInt(numOfSuppliers.sameCity) + parseInt(numOfSuppliers.differentCity),
      total: deliveryCharge + productCost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
