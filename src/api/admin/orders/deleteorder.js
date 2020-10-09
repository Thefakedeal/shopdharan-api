const router = require("express").Router();

const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");

router.delete("/", async (req, res) => {
  try {
    if (req.role !== ROLES.ADMIN && req.role !== ROLES.EMPLOYEE)
      return res.status(403).send("You're not Allowed To Access This");
    const {  order_id } = req.body;

    if(!order_id) return res.status(400).send("No Order Detected")
    const query = await db.query(
      ` DELETE from orders WHERE order_id=$1
    `,
      [order_id]
    );

    res.sendStatus(204)
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
});

module.exports = router;
