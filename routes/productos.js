const express = require('express');
const router = express.Router();


const{detail, filter, cart, add, edit, store, update, list}= require('../controllers/productosController')

router.get('/carrito', cart);
router.get('/productDetail/:id', detail );
router.get('/filtrarProductos', filter);
router.get('/add', add);
router.post('/', store);
router.get('/edit/:id', edit);
router.put('/edit/:id', update);
router.get('/productos', list)

module.exports = router;