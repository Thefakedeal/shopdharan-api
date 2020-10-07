const express = require("express");
const router = express.Router();
const db = require("../../db");
const authenticateToken = require("../middlewares/authenticateToken");
const { compare, hash } = require("../../bcrypt");


router.put("/", authenticateToken, async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const query = await db.query(
      `SELECT password
        FROM suppliers WHERE supplier_id=$1`,
      [req.id]
    );
    const response = query.rows[0];
    if (!response) return res.status(401).send(`User Doesn't Exists`);

    const valid = await compare(old_password, response.password);
    if (!valid) return res.status(401).send(`Invalid Password`);

    const hashedPassword = await hash(new_password);
    const change = await db.query(
      `UPDATE suppliers SET password=$1 WHERE supplier_id=$2`,
      [hashedPassword, req.id]
    );

    res.status(200).send("Password Updated");
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
