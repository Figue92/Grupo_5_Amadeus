const router = require('express').Router();
const { index } = require('../../controllers/api/categoryApiController');


router.get('/',index)

module.exports = router;