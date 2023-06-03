const db = require('../database/models');
const { literalQueryUrl, literalQueryUrlImage } = require('../helpers');
const {Op} = require('sequelize');

module.exports = {
    getSearchProductos: async (req, { withPagination = "false", page = 1, limit = 6, keywords }) => {
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
                    [Op.or]: [
                        {
                            name: { [Op.substring]: `%${keywords}%` },
                        },
                        {
                            description: { [Op.substring]: `%${keywords}%` },
                        },
                    ],
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
}