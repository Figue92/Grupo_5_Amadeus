const express = require('express');
const router = express.Router();


const{detail, filter, cart, add}= require('../controllers/productosController')

router.get('/carrito', cart);
router.get('/productDetail/:id', detail );
router.get('/filtrarProductos', filter);
router.get('/add', add);

module.exports = router;