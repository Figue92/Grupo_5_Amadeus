const fs= require('fs');
const path= require('path');
const productosFilePath= path.join(__dirname, '../data/productos.json');
const productos= JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));


module.exports = {

    filter : (req, res) => {
       
        return res.render('productos/filtrarProductos',{
            title: "Lista de Productos",
            productos
        })
    },

    detail : (req, res) =>{
        const { id } = req.params;

        const producto = productos.find(producto => producto.id === +id)
       
       return res.render('productos/productDetail',{
            title: "Detalle del curso",
            ...producto
        })
      },
      cart: (req, res) => {
        return res.render('productos/carrito',{
            
            title : "Carrito",

        })
      },
      add : (req,res) => {
        return res.render('productos/formAdd');
    },
    edit : (req,res) => {
        return res.render('productos/formEdit');
    }

    }