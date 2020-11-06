const router = require('express').Router();
const ROLES =  require('../../defaults/roles.json')
const savephoto = require("../../../savephoto");
const db = require("../../../db");

router.put("/",async (req, res) => {
    try {
      if (req.role !== ROLES.SUPPLIER) return res.sendStatus(403);
      const { file } = req.files;
      const supplier_id = req.id;
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
  
