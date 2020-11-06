const express = require("express");
const router = express.Router();
const db = require("../../db");
const ROLES = require("../defaults/roles.json");
const authenticateToken = require("../middlewares/authenticateToken");
const savephoto = require('../../savephoto')

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.SUPPLIER)
      return res.status(403).send("You Need To Be A Supplier To Update");

    const supplier_id = req.id;
    const { product_id,product_name, product_description, available, price } = req.body;


    await db.query(
      `UPDATE products SET product_name=$2, product_description=$3, available=$4, price=$5
        WHERE product_id=$1 AND supplier_id=$6
      `,
      [
        product_id,
        product_name,
        product_description,
        available,
        price,
        supplier_id
      ]
    );
    res.json({product_id, supplier_id})
  } catch (err) {
    res.sendStatus(400);
  }
});

router.put('/image',authenticateToken, async (req,res)=>{
  try {
    if (req.role != ROLES.SUPPLIER)
      return res.status(403).send("You Need To Be A Supplier To Update");

    const supplier_id = req.id;
    const { product_id } = req.body;
	console.log(product_id)
    if (!req.files || !req.files.file) return res.status(400).send("No Photos Added")
    
    const image_id = await savephoto(req.files.file);

    await db.query(
      `UPDATE products SET image_id=$3
        WHERE product_id=$1 AND supplier_id=$2
      `,
      [
        product_id,
        supplier_id,
        image_id
      ]
    );
    res.status(200).json({image_id})
  } catch (err) {
console.log(err)
    res.sendStatus(400);
  }
})

module.exports = router;
