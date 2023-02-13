const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));


module.exports = {
  

    filter: (req, res) => {

        return res.render('productos/filtrarProductos', {
            title: "Lista de Productos",
            productos
        })
    },

    list : (req,res) => {
        const productosFilePath = path.join(__dirname, '../data/productos.json');
        const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));
        return res.render('productos/productos', {
            productos
        })
    },

    detail: (req, res) => {
        const { id } = req.params;

        const producto = productos.find(producto => producto.id === +id)

        return res.render('productos/productDetail', {
            title: "Detalle del curso",
            ...producto
        })
    },
    cart: (req, res) => {
        return res.render('productos/carrito', {

            title: "Carrito",

        })
    },
    add: (req, res) => {
        return res.render('productos/formAdd');
    },

    store: (req, res) => {
        const { name, price, description, category, marca, discount, novedad } = req.body;
        const newProduct = {
            id: productos.length + 1,
            name: name.trim(),
            price: +price,
            description: description.trim(),
            category: category,
            marca: marca,
            discount: +discount,
            novedad: novedad==="on",
            image: null
        }
        productos.push(newProduct);

        fs.writeFileSync(productosFilePath,JSON.stringify(productos, null, 3), 'UTF-8');

        return res.redirect('/');
    },

    edit: (req, res) => {
        const {id} = req.params;
		const producto = productos.find(producto => producto.id === +id);
		return res.render('productos/formEdit', {
			...producto
		});
    },
    update : (req,res) => {
        
        const {id} = req.params;
		const { name, price, description, category, marca, discount, novedad } = req.body;
		const producto = productos.find(producto => producto.id === +id);
		console.log(producto);

		const productoUpdate = {
			id : +id,
			name : name?.trim(),
            price : +price,
			description : description?.trim(),
			category: producto.category,
            marca: producto.marca,
			discount : +discount,
            novedad: novedad === "on" ,
			image : null,
		};

		const productosUpdate = productos.map(producto => {
			if(producto.id === +id){
				return productoUpdate
			}
			return producto;
		});

		fs.writeFileSync(productosFilePath,JSON.stringify(productosUpdate, null, 3), 'UTF-8');

  		return res.redirect('/');
    }

}