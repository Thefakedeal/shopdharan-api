const express = require("express");
const router = express.Router();
const db = require("../../db");
const uuid = require("uuid");
const ROLES = require("../defaults/roles.json");
const authenticateToken = require("../middlewares/authenticateToken");
const savephoto = require("../../savephoto");

router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.SUPPLIER)
      return res.status(403).send("You Need To Be A Supplier To Add Product");

    const product_id = uuid.v4();
    const supplier_id = req.id;
    const { product_name, product_description, available, price } = req.body;

    let image_id = "logo";
 
    if (req.files && req.files.file) {
      image_id = await savephoto(req.files.file);
    }

    await db.query(
      `INSERT INTO products(product_id, product_name,product_description,available,price, image_id,supplier_id) VALUES($1,$2,$3,$4,$5,$6,$7)`,
      [
        product_id,
        product_name,
        product_description,
        available,
        price,
        image_id,
        supplier_id
      ]
    );
    res.status(201).json({product_id, supplier_id})
  } catch (err) {
      console.log(err)
    res.sendStatus(400);
  }
});

module.exports = router;
