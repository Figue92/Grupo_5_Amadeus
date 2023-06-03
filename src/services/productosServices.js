const db = require('../database/models');
const { literalQueryUrl, literalQueryUrlImage } = require('../helpers')

const getAllProductos = async (req, { withPagination = "false", page = 1, limit = 6 }) => {
    try {

        let options = {
            include: [
                {
                    model: db.ProductImage,
                    association: "image",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id", "idProduct"],
                        include: [
                            literalQueryUrlImage(req, "productos", "image.name", "urlImage"),
                        ]
                    },
                },
                {
                    model: db.Brand,
                    association: "brand",
                    attributes: ["name"]
                },
                {
                    model: db.Category,
                    association: "category",
                    attributes: ["nameCategory"]
                },
                {
                    association: "usersFavorites"
                }
            ],
            attributes: {
                include: [literalQueryUrl(req, "productos", "Product.id")],
                exclude: ["idBrand", "idCategory"]

            }

        };

        if (withPagination === "true") {
            options = {
                ...options,
                page,
                paginate: limit,
            };

            const { docs, pages, total } = await db.Product.paginate(options);

            return {
                productos: docs,
                pages,
                count: total
            };
        }

        const { count, rows: productos } = await db.Product.findAndCountAll(options);
        return {
            count,
            productos
        };
    } catch (error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
}

const getOneProducto = async (req, id) => {
    try {
        const producto = await db.Product.findByPk(id, {
            include: [
                {
                    association: "image",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id", "idProduct", "name"],
                        include: [
                            literalQueryUrlImage(req, "productos", "image.name", "urlImage")

                        ]
                    }
                }
            ],
            attributes: {
                include: [literalQueryUrl(req, "productos", "Product.id"), "linkVideo"],


            }
        });
        return producto

    } catch (error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
}
const createProducto = async (data) => {
    try {
        const newProducto = await db.Product.create({
            ...data
        })
        return newProducto
    } catch (error) {
        throw {
            status: 500,
            message: error.message
        }
    }
}
const updateProducto = async (productoId, productoData) => {
    try {

        const updProducto = await db.Product.update(
            {
                name: productoData.name,
                price: productoData.price,
                description: productoData.description,
                category: productoData.category,
                marca: productoData.marca,

            },
            {
                where: { id: productoId }
            }
        )
        return updProducto
    } catch (error) {
        throw {
            status: 500,
            message: error.message
        }
    }
}

const destroyProducto = async (id) => {
    try {
        const dstProducto = await db.Product.destroy({
            where: { id }
        });
        return dstProducto;
    } catch (error) {
        throw {
            status: 500,
            message: error.message
        }
    }
}

const getNewestProductos = async (req, { withPagination = "false", page = 1, limit = 6 }) => {
    try {
        console.log(req.protocol);
        let options = {
            include: [
                {
                    model: db.ProductImage,
                    association: "image",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id", "idProduct"],
                        include: [
                            literalQueryUrlImage(req, "productos", "image.name", "urlImage"),
                        ]
                    },
                },
                {
                    association: "usersFavorites"
                }
            ],
            attributes: {
                include: [literalQueryUrl(req, "productos", "Product.id")],
                exclude: ["idBrand", "idCategory"]
            },
            where: {
                novelty: 1
            }
        };

        if (withPagination === "true") {
            options = {
                ...options,
                page,
                paginate: limit,
            };

            const { docs, pages, total } = await db.Product.paginate(options);

            return {
                productos: docs,
                pages,
                count: total
            };
        }

        const { count, rows: productos } = await db.Product.findAndCountAll(options);
        return {
            count,
            productos
        };
    } catch (error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
}

const getOfferProductos = async (req/* , { withPagination = "false", page = 1, limit = 4 } */) => {
    try {
        let options = {
            include: [
                {
                    model: db.ProductImage,
                    association: "image",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "id", "idProduct"],
                        include: [
                            literalQueryUrlImage(req, "productos", "image.name", "urlImage"),
                        ]
                    },
                },
                {
                    association: "usersFavorites"
                }
            ],
            attributes: {
                include: [literalQueryUrl(req, "productos", "Product.id")],
                exclude: ["idBrand", "idCategory"]
            },
            where: {
                discount: { [db.Sequelize.Op.gt]: 0 }
            }
        };

        /* if (withPagination === "true") {
            options = {
                ...options,
                page,
                paginate: limit,
            };

            const { docs, pages, total } = await db.Product.paginate(options);

            return {
                productos: docs,
                pages,
                count: total
            };
        } */

        const { count, rows: productos } = await db.Product.findAndCountAll(options);
        return {
            count: productos.length,
            productos
        };
    } catch (error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
}
const storeProduct = async (req) => {
    try {
        const {
            name,
            price,
            description,
            idCategory,
            idBrand,
            discount,
            novelty,
            linkVideo
        } = req.body

        const files = [];
        console.log(req.files);
        for (const key in req.files) {
            files.push(req.files[key][0].filename)
        }

        const newProduct = await db.Product.create({
            name: name.trim(),
            price,
            description: description.trim(),
            idCategory,
            idBrand,
            discount,
            novelty,
            linkVideo
        })

        files.forEach(async (file, index) => {
            await db.ProductImage.create({
                name: file,
                idProduct: newProduct.id,

            })
        });

        const product = await getOneProducto(req, newProduct.id);
        return product

    } catch (error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
}

module.exports = {
    getAllProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    destroyProducto,
    getNewestProductos,
    getOfferProductos,
    storeProduct
}