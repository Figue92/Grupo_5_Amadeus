const express = require('express');
const router = express.Router();


const{detail, filter, cart}= require('../controllers/productosController')

router.get('/carrito', cart);
router.get('/productDetail/:id', detail );
router.get('/filtrarProductos', filter);

module.exports = router;