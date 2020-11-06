const router = require('express').Router();
const updatephoto = require('./updatephoto')
const deletephoto = require('./deletephoto')

const authenticateToken = require('../../middlewares/authenticateToken')
router.use(authenticateToken)

router.use('/update', updatephoto)
router.use('/delete', deletephoto)

module.exports = router