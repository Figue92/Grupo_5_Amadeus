const express = require('express');
const path = require('path');

const app = express();
const port = 3002;

app.use(express.static(path.resolve(__dirname,  'public' )))


app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
app.get('/productDetail.html', (req, res) => res.sendFile(path.resolve(__dirname, './views/productDetail.html')));
app.get('/register.html', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/login.html', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
app.get('/filtrarProductos', (req, res) => res.sendFile(path.resolve(__dirname, './views/filtrarProductos.html')));
app.get('/carrito.html', (req, res) => res.sendFile(path.resolve(__dirname, './views/carrito.html')));
app.get('/register-data', (req, res) => res.sendFile(path.resolve(__dirname, './views/register-data.html')));
