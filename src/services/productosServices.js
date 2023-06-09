const db = require('../database/models');
const fs = require('fs')
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
                    attributes: ["name", "id"]
                },
                {
                    model: db.Category,
                    association: "category",
                    attributes: ["nameCategory", "id"]
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
                        exclude: ["createdAt", "updatedAt", "idProduct", "name"],
                        include: [
                            literalQueryUrlImage(req, "productos", "image.name", "urlImage")

                        ]
                    }
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
const createProducto = async (req) => {
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
const storeProducto = async (req) => {
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


        const files = [];
        console.log(req.files);
        for (const key in req.files) {
            files.push(req.files[key][0].filename)
        }

        files.forEach(async (file, index) => {
            await db.ProductImage.create({
                name: file,
                idProduct: newProduct.id,

            })
        });

        const producto = await getOneProducto(req, newProduct.id);
        return producto

    } catch (error) {
        console.log(error);
        throw {
            status: 500,
            message: error.message
        }
    }
}
const updateProducto = async (req) => {
    try {

        const
            {
                name,
                price,
                description,
                idCategory,
                idBrand,
                novelty,
                discount,
                linkVideo,
                image_1,
                image_2,
                image_3,
                image_1_id,
                image_2_id,
                image_3_id
            } = req.body
        await db.Product.update({
            name: name.trim(),
            price,
            description: description.trim(),
            idCategory,
            idBrand,
            novelty,
            discount,
            linkVideo

        },
            {
                where: { id: req.params.id }
            }
        )

        if (image_1 === "null" && image_1_id !== "null") {
            const image = await db.ProductImage.findByPk(image_1_id)
            fs.existsSync(`public/images/productos/${image.name}`) && fs.unlinkSync(`public/images/productos/${image.name}`)
            image.destroy()
        }
        if (image_2 === "null" && image_2_id !== "null") {
            const image = await db.ProductImage.findByPk(image_2_id)
            fs.existsSync(`public/images/productos/${image.name}`) && fs.unlinkSync(`public/images/productos/${image.name}`)
            image.destroy()
        }
        if (image_3 === "null" && image_3_id !== "null") {
            const image = await db.ProductImage.findByPk(image_3_id)
            fs.existsSync(`public/images/productos/${image.name}`) && fs.unlinkSync(`public/images/productos/${image.name}`)
            image.destroy()
        }
        const files = [];

        for (const key in req.files) {
            files.push({
                filename: req.files[key][0].filename,
                fieldname: req.files[key][0].fieldname,
                id: req.body[`${req.files[key][0].fieldname}_id` || null]
            })

        }

        files.forEach(async (file) => {
            if (file.id !== "null") {
                const image = await db.ProductImage.findByPk(file.id)
                fs.existsSync(`public/images/productos/${image.name}`) && fs.unlinkSync(`public/images/productos/${image.name}`)
                image.name = file.filename
                image.save()
            } else {
                await db.ProductImage.create({
                    name: filename,
                    idProduct: req.params.id
                })
            }
        })


        const producto = await getOneProducto(req, req.params.id)

        return producto
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



module.exports = {
    getAllProductos,
    getOneProducto,
    createProducto,
    updateProducto,
    destroyProducto,
    getNewestProductos,
    getOfferProductos,
    storeProducto
}