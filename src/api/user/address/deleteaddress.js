const router = require("express").Router();
const db = require("../../../db");
const ROLES = require("../../defaults/roles.json");

router.delete("/", async (req, res) => {
  try {
    const user_id = req.id;
    if (req.role !== ROLES.USER)
      return res.status(403).send("Only Users Can Perform this action");

    const { address_id } = req.body;
    if (!address_id) return res.status(400).send("Address Not Specified");
    const query = await db.query(
      `DELETE FROM address WHERE address_id=(SELECT address_id FROM user_address WHERE address_id=$1 AND user_id=$2)`,
      [address_id, user_id]
    );
    res.sendStatus(204)
  } catch (err) {
    console.error(err)
    res.status(500).send("Something Went wrong");
  }
});

module.exports = router;
