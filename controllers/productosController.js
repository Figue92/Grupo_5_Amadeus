const productos = require('../data/productos.json')


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
            producto
        })
      }


    }