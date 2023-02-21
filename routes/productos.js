const express = require('express');
const router = express.Router();


const{detail, filter, cart, add, edit, store, update, list, remove}= require('../controllers/productosController')

router
    .get('/carrito', cart)
    .get('/productDetail/:id', detail )
    .get('/filtrarProductos', filter)
    .get('/add', add)
    .post('/', store)
    .get('/edit/:id', edit)
    .put('/edit/:id', update)
    .get('/productos', list)
    .delete('/delete/:id', remove)

module.exports = router;