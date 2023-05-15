const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Op } = require('sequelize');
const { getAllProductos } = require('../services/productosServices')

module.exports = {

  filter: async (req, res) => {
    try {
      const productos = await db.Product.findAll({
        include: ["image"],
      })

      return res.render("productos/filtrarProductos", {
        title: "Lista de Productos",
        productos

      })
    } catch (error) { console.log(error) };

  },

  list: async (req, res) => {
    try {
      const { withPagination = "true", page = 1, limit = 6 } = req.query;
      const { count, productos, pages } = await getAllProductos(req, {
        withPagination,
        page,
        limit: +limit
      });
      let data = {
        count,
        productos
      }
      if (withPagination === "true") {
        data = {
          ...data,
          pages,
          currentPage: +page
        }
        return res.render("productos/productos", {
          title: "Lista de productos",
          productos,
          count,
          pages,
          data,
   
          
        });

      } }catch (error) { console.log(error) };
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

      cart: async (req, res) => {
        try {
          /*   if (!req.session.userLogin || !req.session.userLogin.id) {
             return res.render('users/login')
             
           } */

          const cart = await db.Cart.findOne({
            where: { idUser: req.session.userLogin.id },
            include: ['user'],
          });
          const productos = db.Product.findAll({

            include: ['image'],
          })

          //console.log(cart)
          if (!cart) {
            return res.status(404).send('No se encontró el carrito');
          }
          Promise.all([cart, productos])
            .then(([cart, productos]) => {
              return res.render('productos/carrito', {
                title: 'Carrito',
                cart,
                productos
              });
            })

        } catch {
          ((error) => console.log(error))
        }
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

          store: async (req, res) => {
            const errors = validationResult(req);
            console.log(errors);
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
              try {
                const producto = await db.Product.create({
                  name: name.trim(),
                  price,
                  description: description.trim(),
                  idCategory: category,
                  idBrand: marca,
                  discount,
                  novelty: novelty ? 1 : 0
                })
                req.files.forEach((image, index) => {
                  db.ProductImage.create({
                    name: image.filename,
                    idProduct: producto.id
                  })
                })
                return res.redirect('/dashboard')

              } catch (error) {
                console.log(error)
              }
            } else {
              try {
                const brands = await db.Brand.findAll({
                  order: [['name']],
                  attributes: ['name', 'id']
                })
                const categories = await db.Category.findAll({
                  order: [['nameCategory']],
                  attributes: ['nameCategory', 'id']
                })


                if (req.files.length) {
                  req.files.forEach((file) => {
                    fs.existsSync(`./public/images/productos/${file.filename}`) &&
                      fs.unlinkSync(`./public/images/productos/${file.filename}`);
                  });
                }
                return res.render('productos/formAdd', {
                  brands,
                  categories,
                  errors: errors.mapped(),
                  old: req.body,
                })

              } catch (error) { console.log(error) }
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

                if (errors.isEmpty()) {
                  const { name, price, description, category, marca, discount, novedad } = req.body;
                  const id = +req.params.id;

                  db.Product.findByPk(id, {
                    include: [
                      {
                        association: 'image',
                        attributes: ['name', 'id']
                      }
                    ]
                  }).then(producto => {
                    let imageUpdate;

                    if (req.files) {
                      const images = req.files.map((image) => ({
                        name: image.filename,
                        idProduct: id,
                      }));

                      imageUpdate = db.ProductImage.bulkCreate(images);
                    } else {
                      imageUpdate = db.ProductImage.findAll({
                        where: { id },
                      });
                    }

                    db.Product.update(
                      {
                        name: name.trim(),
                        price,
                        description: description.trim(),
                        idCategory: category,
                        idBrand: marca,
                        discount,
                        novedad: !!novedad,
                      },
                      {
                        where: { id },
                      }
                    ).then(producto => {
                      if (req.files.length) {
                        req.files.forEach((file) => {
                          fs.existsSync(`./public/images/productos/${file.filename}`) &&
                            fs.unlinkSync(`./public/images/productos/${file.filename}`);
                        });
                      }

                      return res.redirect('/dashboard')

                    })


                  }
                  )
                } else {
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
                        ...producto.dataValues,
                        errors: errors.mapped(),
                        old: req.body
                      })
                    })
                    .catch((error) => console.log(error))
                }
              },
                remove: (req, res) => {

                  db.Product.destroy({
                    where: {
                      id: req.params.id
                    }
                  }).then(() => {
                    return res.redirect('/dashboard')
                  }).catch((error) => console.log(error))
                }

  }