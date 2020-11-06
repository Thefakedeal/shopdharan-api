const express = require("express");
const router = express.Router();
const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");

router.put("/", async (req, res) => {
  try {
    if (req.role !== ROLES.SUPPLIER)
      return res.status(403).send("You Cant Access This");
    const supplier_id = req.id;
    const {
      supplier_name,
      city_id,
      email_id,
      supplier_description,
      visible,
      catagory_id,
      contact_number,
    } = req.body;

    const query = await db.query(
      `UPDATE suppliers SET supplier_name=$2, city_id=$3, email_id=$4,
    supplier_description=$5, visible=$6, catagory_id=$7, contact_number=$8
    WHERE supplier_id=$1
`,
      [
        supplier_id,
        supplier_name,
        city_id,
        email_id.toLowerCase().trim(),
        supplier_description,
        visible,
        catagory_id,
        contact_number,
      ]
    );
    if(query.rowCount===0) return res.status(404).send("Supplier Not Found")
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
