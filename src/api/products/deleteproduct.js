const express = require("express");
const router = express.Router();
const db = require("../../db");
const ROLES = require("../defaults/roles.json");
const authenticateToken = require("../middlewares/authenticateToken");


router.delete("/", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.SUPPLIER)
      return res.status(403).send("You Need To Be A Supplier To Update");

    const supplier_id = req.id;
    const { product_id } = req.body;


    await db.query(
      `DELETE FROM products WHERE supplier_id=$1 AND product_id=$2
      `,
      [
        supplier_id,
        product_id
      ]
    );
    res.sendStatus(204)
  } catch (err) {
      console.log(err)
    res.sendStatus(400);
  }
});

module.exports = router;
