const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const ROLES = require("../defaults/roles.json");
const { hash } = require("../../bcrypt");
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");
const savephoto = require("../../savephoto");

router.post("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);

  try {
    const {
      supplier_name,
      city_id,
      email_id,
      supplier_description,
      visible,
      password,
      catagory_id,
      contact_number,
    } = req.body;

    let image_id = "logo";
    if (req.files && req.files.file) {
      image_id = await savephoto(req.files.file);
    }

    const hashedPassword = await hash(password);
    const supplier_id = uuid.v4();
    await db.query(
      `INSERT INTO suppliers(supplier_id, supplier_name, city_id,email_id,supplier_description, visible,password,catagory_id,contact_number,image_id)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `,
      [
        supplier_id,
        supplier_name,
        city_id,
        email_id,
        supplier_description,
        visible,
        hashedPassword,
        catagory_id,
        contact_number,
        image_id,
      ]
    );
    res.status(201).json({ supplier_id });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
