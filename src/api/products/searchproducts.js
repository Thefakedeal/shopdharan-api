const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/", async (req, res) => {
  try {
    const supplier_id = req.query.supplier_id;
    const available = req.query.available;
    const product_name = req.query.product_name;
    const page_no = req.query.page_no || 0;
    const city_id = req.query.city_id;
    const LIMIT = 10;
    const OFFSET = LIMIT * page_no;
    const name = `%${product_name}%`;
    const request = await db.query(
      `SELECT pd.product_id,pd.product_name,pd.supplier_id,
        pd.product_description,pd.image_id,pd.available,pd.price,
        suppliers.city_id
        FROM products pd,suppliers
        WHERE ($1::text IS NULL OR pd.supplier_id=$1) AND
        ($2::boolean IS NULL OR pd.available=$2) AND
        ($3::text IS NULL OR pd.product_name ILIKE $4)
        AND ($5::text IS NULL OR suppliers.city_id=$5)
        AND suppliers.supplier_id = pd.supplier_id LIMIT $6 OFFSET $7`,
      [supplier_id, available, product_name, name, city_id, LIMIT, OFFSET]
    );
    const products = request.rows;
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

module.exports = router;
