const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  try {
    const product_id = req.query.product_id;
    const request = await db.query(
      `SELECT product_id,product_name,supplier_id,product_description,image_id,available,price
        FROM products WHERE product_id=$1`,
      [product_id]
    );
    const product = request.rows[0];
    res.status(200).json(product);
  } catch (err) {
    console.log(err)
    res.sendStatus(400);
  }
});

module.exports = router;
