const router = require('express').Router();
const ROLES =  require('../../defaults/roles.json')

const db = require("../../../db");

router.delete("/",async (req, res) => {
    try {
      if (req.role != ROLES.SUPPLIER) return res.sendStatus(403);
      const { file } = req.files;
      const supplier_id = req.id;
      const image_id = 'logo';
      await db.query(
        `UPDATE suppliers SET image_id=$2 
              WHERE supplier_id=$1
          `,
        [supplier_id, image_id]
      );
      res.status(204).json({image_id})
    } catch (err) {
      res.sendStatus(400);
    }
  });
  
  module.exports = router;
  
