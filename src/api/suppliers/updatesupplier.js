const express = require("express");
const router = express.Router();

const ROLES = require("../defaults/roles.json");
const authenticateToken = require("../middlewares/authenticateToken");
const savephoto = require("../../savephoto");
const db = require("../../db");

router.put("/", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.ADMIN) return res.sendStatus(403);
    const {
      supplier_id,
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
    if (query.rowCount === 0) return res.status(404).send("Supplier Not Found");
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.put("/photo", authenticateToken, async (req, res) => {
  try {
    if (req.role != ROLES.ADMIN) return res.sendStatus(403);
    const { file } = req.files;
    const { supplier_id } = req.body;
    if (!supplier_id) return res.status(400).send("No Supplier ID provided");
    if (!file) res.status(400).send("No photo to update");
    const image_id = await savephoto(file);
    await db.query(
      `UPDATE suppliers SET image_id=$2 
            WHERE supplier_id=$1
        `,
      [supplier_id, image_id]
    );
    res.status(200).json({image_id});
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
