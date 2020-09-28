const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const ROLES = require('../defaults/roles.json')
const {hash} = require('../../bcrypt')
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");

router.post("/", authenticateToken, async (req, res) => {
  if (req.role != ROLES.ADMIN) return res.sendStatus(403);
  
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

  const hashedPassword = await hash(password)
  const supplier_id = uuid.v4();
  try {
    await db.query(
      `INSERT INTO suppliers(supplier_id, supplier_name, city_id,email_id,supplier_description, visible,password,catagory_id,contact_number)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
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
      ]
    );
    res.status(201).json({supplier_id})
  }catch(err){
      res.sendStatus(500)
  }
});

module.exports = router;
