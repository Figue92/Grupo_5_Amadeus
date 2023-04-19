
const { validationResult } = require('express-validator');
const db = require('../database/models')

module.exports = {

  filter: (req, res) => {
    db.Product.findAll({
      include: ["image"],
    })
      .then((productos) => {
        return res.render("productos/filtrarProductos", {
          title: "Lista de Productos",
          productos
        });
      })
      .catch((error) => console.log(error));

  },

  list: (req, res) => {
    db.Product.findAll({

      include: ['image'],
    })
      .then((productos) => {
        console.log(req.body)
        return res.render("productos/productos", {
          title: "Lista de productos",
          productos,
        });
      })
      .catch((error) => console.log(error));
  },

  detail: (req, res) => {
    const { id } = req.params;

    db.Product.findByPk(id, {
      include: [
        {
          association: 'image',
          attributes: ['name', 'id']
        },
        {
          association: 'category',
          attributes: ['nameCategory', 'id']
        },
        {
          association: 'brand',
          attributes: ['name', 'id']
        }
      ]
    }).then((producto) => {
      return res.render('productos/productDetail', {
        title: "Detalle del producto",
        ...producto.dataValues,
        /*    image: producto.images.find(image => image.id) */

      });
    })
      .catch(error => console.log(error));
  },
  cart: (req, res) => {
    db.Cart.findAll({
      include: ['user'],
      where : {
        idUser: req.session.userLogin.id
      }
    }).then((cart)=>{
      return res.render('productos/carrito', {

        title: "Carrito",
        cart
  
      })
    }).catch(error => console.log(error));
   
  },
  add: (req, res) => {
    const brands = db.Brand.findAll({
      order: [['name']],
      attributes: ['name', 'id']
    });
    const categories = db.Category.findAll({
      order: [['nameCategory']],
      attributes: ['nameCategory', 'id']
    });
    Promise.all([brands, categories])
      .then(([brands, categories]) => { // completar el callback
        return res.render('productos/formAdd', {
          brands,
          categories
        });
      })
      .catch((error) => console.log(error));
  },

  store: (req, res) => {
    const errors = validationResult(req);
    if (!req.files.length && !req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener por lo menos una imagen",
        param: "images",
        location: "files",
      });
    }

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files",
      });
    }

    if (errors.isEmpty()) {
      const {
        name,
        price,
        description,
        category,
        marca,
        discount,
        novelty
      } = req.body;

      db.Product.create({
        name: name.trim(),
        price,
        description: description.trim(),
        idCategory: category,
        idBrand: marca,
        discount,
        novelty: novelty ? 1 : 0
      })
        .then((producto) => {

          req.files.forEach((image, index) => {
            db.ProductImage.create({
              name: image.filename,
              idProduct: producto.id
            })
          })
          return res.redirect('/productos/productos')
        })
        .catch((error) => console.error(error));
    } else {
      const brands = db.Brand.findAll({
        order: [['name']],
        attributes: ['name', 'id']
      })
      const categories = db.Category.findAll({
        order: [['nameCategory']],
        attributes: ['nameCategory', 'id']
      })


      if (req.files.length) {
        req.files.forEach((file) => {
          fs.existsSync(`./public/images/productos/${file.filename}`) &&
            fs.unlinkSync(`./public/images/productos/${file.filename}`);
        });
      }

      Promise.all([brands, categories])
        .then(([brands, categories])=>{
      return res.render('productos/formAdd', {
        brands,
        categories,
        errors: errors.mapped(),
        old: req.body,
      })
    })
      .catch((error) => console.log(error))  
    }
  },
  edit: (req, res) => {

    const { id } = req.params;

    const producto = db.Product.findByPk(id, {
      include: ['image']
    })

    const brands = db.Brand.findAll({
      order: [['name']],
      attributes: ['name', 'id']
    })
    const categories = db.Category.findAll({

      attributes: ['nameCategory', 'id']
    })


    Promise.all([brands, categories, producto])
      .then(([brands, categories, producto]) => {
        //return res.send(producto)
        return res.render('productos/formEdit', {
          brands,
          categories,
          ...producto.dataValues
        })
      })
      .catch((error) => console.log(error))
  },

  update: (req, res) => {
    const errors = validationResult(req);

    if (req.fileValidationError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidationError,
        param: "images",
        location: "files",
      });
    }

    if (errors.isEmpty()) {
  
      const { name, price, description, category, marca, discount, novedad } = req.body;
      const id = +req.params.id;

db.Product.findByPk(id)
.then(product =>{
  if (req.files) {
    const images = req.files.map((image) => {
      return {
        name: image.filename,
        idProduct: id
      }
    })

   const imageUpdate = db.ProductImage.bulkCreate(images)
  }else{
    const imageUpdate = db.ProductImage.findAll({
      where : {
        id
      }
    }
    )
  }
  const productUpdate = db.Product.update({
    name: name.trim(),
    price,
    description: description.trim(),
    idCategory: category,
    idBrand: marca,
    discount,
    novedad: novedad ? true : false,
  },
  {
    where: { id }
  })
  Promise.all(([imageUpdate, productUpdate]))
  .then(() => {
    return res.redirect('/dashboard')
  })
}).catch((error) => console.log(error))


    /*   db.Product.update({
        name: name.trim(),
        price,
        description: description.trim(),
        idCategory: category,
        idBrand: marca,
        discount,
        novedad: novedad ? true : false,
      },
        {
          where: { id }
        })


      if (req.files) {
        const images = req.files.map((image) => {
          return {
            name: image.filename,
            idProduct: id
          }
        })

        db.ProductImage.bulkCreate(images)
      } */

      return res.redirect('/dashboard')

    } else {


      if (req.files.length) {
        req.files.forEach((file) => {
          fs.existsSync(`./public/images/productos/${file.filename}`) &&
            fs.unlinkSync(`./public/images/productos/${file.filename}`);
        });
      }

      const producto = db.Product.findByPk(id, {
        include: ['image']
      })

      const brands = db.Brand.findAll({
        order: [['name']],
        attributes: ['name', 'id']
      })
      const categories = db.Category.findAll({
        order: [['name']],
        attributes: ['name', 'id']
      })


      Promise.all([brands, categories, producto])
        .then(([brands, categories, producto]))
      return res.render('productos/formEdit', {
        brands,
        categories,
        ...producto.dataValues,
        errors: errors.mapped(),
        old: req.body,
      })
        .catch((error) => console.log(error))
    }


  },
  remove: (req,res) => {
   
    db.Product.destroy({
      where: {
id: req.params.id
      }
    }).then(()=>{
      return res.redirect('/dashboard')
    }) .catch((error) => console.log(error))
  }
    }
  