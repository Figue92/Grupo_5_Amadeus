const router = require('express').Router();
const { index } = require('../../controllers/api/brandApiController');


router.get('/',index)

module.exports = router;