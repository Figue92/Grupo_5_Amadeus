const express = require('express');
const router = express.Router();
const {getOrders} = require('../../controllers/api/orderController');



router.get('/', getOrders);

module.exports = router;