const express = require('express');
const router = express.Router();


const{detail, filter, cart, add, edit, store, update, list, remove}= require('../controllers/productosController')
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const {uploadImage}= require('../middlewares/upload')
const productsValidator = require('../validations/productosValidator')

router
    .get('/carrito', cart)
    .get('/productDetail/:id', detail )
    .get('/filtrarProductos', filter)
    .get('/add', checkUserAdmin, add)
    .post('/add', uploadImage.array('images'), productsValidator, store)
    .get('/edit/:id', checkUserAdmin, edit)
    .put('/edit/:id', uploadImage.array('images'),productsValidator, update)
    .get('/productos', list)
    .delete('/delete/:id', checkUserAdmin, remove)
   
module.exports = router;