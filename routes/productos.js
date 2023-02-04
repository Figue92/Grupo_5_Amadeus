const express = require('express');
const router = express.Router();


const{detail, filter, cart, add, edit}= require('../controllers/productosController')

router.get('/carrito', cart);
router.get('/productDetail/:id', detail );
router.get('/filtrarProductos', filter);
router.get('/add', add);
router.get('/edit', edit)

module.exports = router;