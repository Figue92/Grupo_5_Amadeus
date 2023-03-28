const express = require('express');
const router = express.Router();


const{detail, filter, cart, add, edit, store, update, list, remove}= require('../controllers/productosController')
const checkUserLogin = require('../middlewares/checkUserLogin');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const {uploadImage}= require('../middlewares/upload')

router
    .get('/carrito', cart)
    .get('/productDetail/:id', detail )
    .get('/filtrarProductos', filter)
    .get('/add', checkUserAdmin, add)
    .post('/', uploadImage.array('images'), checkUserAdmin, store)
    .get('/edit/:id', checkUserAdmin, edit)
    .put('/edit/:id', uploadImage.array('images'), checkUserAdmin, update)
    .get('/productos', list)
    .delete('/delete/:id', checkUserAdmin, remove)
   
module.exports = router;