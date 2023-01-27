const express = require('express');
const router = express.Router();


const{detail, filter}= require('../controllers/productosController')


router.get('/productDetail/:id', detail );
router.get('/filtrarProductos', filter);

module.exports = router;