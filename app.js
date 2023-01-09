const express = require('express');
const path = require('path');

const app = express();
const port = 3030;

app.use(express.static(path.resolve(__dirname,  'public' )))


app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
app.get('/productDetail', (req, res) => res.sendFile(path.resolve(__dirname, './views/productDetail.html')));
app.get('/productCart', (req, res) => res.sendFile(path.resolve(__dirname, './views/productCart.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));