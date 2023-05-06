const express = require('express');
const session = require('express-session');
const app = express();

// Configuración de la sesión
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true
}));

module.exports = {
    crearCarrito: async (req, res) => {
        try {
          let idCart = req.session.idCart;
          if (!idCart) {
            idCart = generarIdCart();
            req.session.idCart = idCart;
          }
          return res.status(200).json({
            ok: true,
            meta: {
              status: 200,
              total: 1,
              url: '/api/carrito'
            },
            data: {
              idCart
            }
          });
        } catch (error) {
          return res.status(error.status || 500).json({
            ok : false,
            error : {
              status : error.status || 500,
              message : error.message || 'Ocurrió un error'
            }
          });
        }
      },
      guardarProductoEnCarrito: async (req, res) => {
        try {
          const { idProduct, quantity } = req.body;
          const idCart = req.session.idCart;
          console.log(`Producto ${idProduct} agregado al carrito ${idCart} con cantidad ${quantity}`);
          return res.status(200).json({
            ok: true,
            meta: {
              status: 200,
              total: 1,
              url: '/api/carrito/productos'
            },
            data: {
              message: `Producto ${idProduct} agregado al carrito ${idCart} con cantidad ${quantity}`
            }
          });
        } catch (error) {
          return res.status(error.status || 500).json({
            ok : false,
            error : {
              status : error.status || 500,
              message : error.message || 'Ocurrió un error'
            }
          });
        }
      }
}


// Endpoint para guardar un producto en el carrito
app.post('/carrito/productos', (req, res) => {
  const { idProduct, quantity } = req.body;
  const idCart = req.session.idCart;
  // Guardar el producto en la base de datos o en una variable en memoria
  guardarProductoEnCarrito(idCart, idProduct, quantity);
  // Devolver una respuesta al cliente
  res.json({ success: true });
});

// Función para generar un ID de carrito 
const { v2: uuidv2 } = require('uuid');
function generarIdCart() {
    return uuidv2();
}

// Función para guardar un producto en el carrito
function guardarProductoEnCarrito(idCart, idProduct, quantity) {
  // Aquí debes implementar el código para guardar el producto en la base de datos o en una variable en memoria
  console.log(`Producto ${idProduct} agregado al carrito ${idCart} con cantidad ${quantity}`);
}
/*Revisar estos códigos, estoy agregándolos para ir avanzando en el carrito, pero falta consultar algunos detalles con
los profes!!! (están creadas las rutas ya)*/