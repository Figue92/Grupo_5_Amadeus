const db = require('../database/models');
const { literalQueryUrl, literalQueryUrlImage } = require('../helpers')
module.exports = {
    getAllProductos: async (req, { withPagination = "false", page = 1, limit = 6 }) => {
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
                    association : "usersFavorites"
                    }
                ],
                attributes: {
                    include: [literalQueryUrl(req, "productos", "Product.id")],
                    exclude: ["idBrand","idCategory"]
           
                },
                include: [
                    {
                        model: db.Brand,
                        association: "brand",
                        attributes:  ["id","name"]
                    },
                    {
                        model: db.Category,
                        association: "category",
                        attributes: ["id","nameCategory"]
                    },
                ]
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
    } catch(error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
},

    getOneProducto: async (req, id) => {
        try {
            const producto = await db.Product.findByPk(id, {
                include: [
                    {
                        assotiation: "image",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "id", "idProduct", "name"],
                            include: [
                                literalQueryImage(req, "productos", "name", "urlImage")
                            ]
                        }
                    }
                ],
                attributes: {
                    include: [literalQueryUrl(req, "productos", "Product.id")]
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
    },
        createProducto: async (data) => {
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
        },
            updateProducto: async (productoId, productoData) => {
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
            },
                destroyProducto: async (id) => {
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
}