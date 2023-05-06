
const router = require('express').Router();


const {crearCarrito,guardarProductoEnCarrito} = require('../../controllers/api/carritoApiController')

router
.get('/carrito', crearCarrito)
.post('/carrito/productos', guardarProductoEnCarrito)