
const db = require('../../database/models');


const { getAllProductos, getOneProducto, createProducto, updateProducto, destroyProducto, getNewestProductos, getOfferProductos, storeProducto } = require('../../services/productosServices')
const createResponseError = ('../helpers/createResponseError.js')
const { validationResult } = require('express-validator');
const { getAllCategories } = require('../../services/categoryServices');
const { getAllBrands } = require('../../services/countServices');


const API = 'http://www.omdbapi.com/?apikey=7c7f3cb2';


module.exports = {
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
            }
            return res.status(200).json({
                ok: true,
                data,
                meta: {
                    status: 200,
                    url: '/api/productos'
                },
            });
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Ha ocurrido un error"
                }
            })
        }
    },
    otro: async (req, res) => {
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            const offset = req.query.offset ? parseInt(req.query.offset) : 0;

            //la consulta por thunder es localhost:3000/api/productos?limit=10&offset=1
            const productos = await getAllProductos(limit, offset);
            const categories = await getAllCategories()

            /* 
            
            {
                pc: 3,
                monitor: 9,
            }
                */

            const countByCategory = categories.reduce((obj, category) => {
                obj[category.nameCategory] = category.products.length
                return obj
            }, {})

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: productos.length,
                    countByCategory,
                    url: '/api/productos'
                },
                data: productos
            })
        } catch (error) {

            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Ocurrió un error'
                }
            })
        }
    },
    detail: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await getOneProducto(req, id);

            const response = {
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/productos/${id}`
                },
                data: {
                    id: producto.id,
                    name: producto.name,
                    description: producto.description,
                    price: producto.price,
                    discount: producto.discount,
                    image: producto.image,
                    linkVideo: producto.linkVideo,
                    brand: producto.brand.name,
                    category: producto.category.nameCategory

                }
            }

            return res.status(200).json(response)
        } catch (error) {

            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Ocurrió un error'
                }
            })
        }

    },
    store: async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const newProducto = await createProducto(req.body);
            const categories = await getAllCategories()
            const brands = await getAllBrands()

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 201,
                    total: 1,
                    url: `/api/productos/${newProducto.id}`
                },
                data: newProducto,
                categories, brands
            })
        } catch (error) {

            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Ocurrió un error'
                }
            })
        }
    },

    update: async (req, res) => {
      const {id} = req.params.id
        try {
            const errors = validationResult(req, id);

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            const producto = await updateProducto(req)
            return res.status(200).json({
                ok: true,
                data:{ producto }
            })
        } catch (error) {

            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Ocurrió un error'
                }
            })
        }

    },
    destroy: async (req, res) => {

        try {

            const {
                params: { id }
            } = req;

            const dstProducto = await destroyProducto(id);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/productos/${id}`
                },
                data: dstProducto
            });

        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Ocurrió un error'
                }
            })
        }
    },
    newest: async (req, res) => {
        try {
            const { withPagination = "true", page = 1, limit = 6 } = req.query;
            const { count, productos, pages } = await getNewestProductos(req, {
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
            }
            return res.status(200).json({
                ok: true,
                data,
                meta: {
                    status: 200,
                    url: '/api/productos/newest'
                },
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Ha ocurrido un error"
                }
            });
        }
    },

    offer: async (req, res) => {
        try {
            /* const { withPagination = "true", page = 1, limit = 4 } = req.query; */
            const { count, productos/* , pages */ } = await getOfferProductos(req/* , {
                withPagination,
                page,
                limit: +limit
            } */);
            let data = {
                count,
                productos
            }
            /* if (withPagination === "true") {
                data = {
                    ...data,
                    pages,
                    currentPage: +page
                }
            } */
            return res.status(200).json({
                ok: true,
                data,
                meta: {
                    status: 200,
                    url: '/api/productos/offer'
                },
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Ha ocurrido un error"
                }
            });
        }
    },
    storeImage: async (req, res) => {
        try {
            const producto = await storeProducto(req)

            return res.status(200).json({
                ok: true,
                data: { producto }

            })
        } catch (error) {

            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || 'Ocurrió un error'
                }
            })
        }
    },

}