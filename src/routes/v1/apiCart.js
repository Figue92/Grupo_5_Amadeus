const express = require('express');
const router = express.Router();


const {crearCarrito,guardarProductoEnCarrito} = require('../../controllers/api/carritoApiController')

router
.get('/carrito', crearCarrito)
.post('/carrito/productos', guardarProductoEnCarrito)