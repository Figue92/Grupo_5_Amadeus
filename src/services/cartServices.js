const db = require('../database/models')
const { Op } = require('sequelize')


module.exports = mtd = {
getOrder: async ({ idUser }) => {
    if (!idUser) {
        throw {
            ok: false,
            message: "Debes ingresar id de usuario"
        }
    }
    const [order] = await db.Order.findOrCreate({
        where: {
            [Op.and]: [
                { idUser },
                { status: "pending" }
            ],
        },
        defaults:
            { idUser },
        include: [{
            association: "cart",
            through: {
                attributes: ["quantity"],
            },
            include: ["image"]
        }]
    })
    //console.log(order);
    return order

},
getCart: ({ idOrder, idProduct }) => {
    //console.log({idOrder, idProduct});
    return db.Cart.findOrCreate({
    
        where: {
            [Op.and]: [
                { idOrder },
                { idProduct }
            ]
        },
        defaults:
        {
            idOrder,
            idProduct

        }
    })
},
calcularTotal: ({ cart }) => {
    return cart.reduce((acum, { price,Cart, discount }) => {
        const priceCalc = discount ? price - (price * discount) / 100 : price;
        acum += priceCalc * Cart.quantity
        return acum
    }, 0)
},

removeCart: ({ idOrder, idProduct }) => {
    db.Cart.destroy({
        where: {
            [Op.and]: [
                { idOrder },
                {
                    idProduct
                }
            ]
        }
    })
},
createProductInCart: async ({ idUser, idProduct }) => {
        if (!idUser || !idProduct) {
            throw {
                ok: false,
                message: "Debes ingresar un id de usuario y un id de producto"
            }
        }
        const order = await mtd.getOrder({ idUser })

        await mtd.getCart({ idOrder: order.id, idProduct })
        const orderReload = await order.reload({ include: { all: true } })
        order.total = mtd.calcularTotal(orderReload)
        await order.save()
    },
removeProductFromCart: async ({ idUser, idProduct }) => {
        if (!idUser || !idProduct) {
            throw {
                ok: false,
                message: "Debes ingresar un id de usuario y un id de producto"
            }
        }
        const order = await mtd.getOrder({ idUser });
        await mtd.removeCart({ idOrder: order.id, idProduct })
        const orderReload = await order.reload({ include: { all: true } })
        order.total = mtd.calcularTotal(orderReload)
        await order.save()
    },
moreOrLessQuantityFromProduct: async ({
        idUser,
        idProduct,
        action = "more"
    }) => {
        if (!idUser || !idProduct) {
            throw {
                ok: false,
                message: "Debes ingresar un id de usuario y un id de producto"
            }
        }
        const order = await mtd.getOrder({ idUser });
        const [cart, isCreated] = await mtd.getCart({
            idOrder: order.id,
            idProduct
        })

        if (!isCreated) {
            if (action === "more") {
                cart.quantity++
            } else {
                if (cart.quantity > 1) {
                    cart.quantity--
                }
            }
            await cart.save()
        }
        const orderReload = await order.reload({ include: { all: true } })
        order.total = mtd.calcularTotal(orderReload)
        await order.save()
        return order;
    },
    clearAllProductFromCart: async ({ idUser }) => {
        if (!idUser) {
            throw {
                ok: false,
                message: "Debes ingresar un id de usuario"
            }
        }
        const order = await mtd.getOrder({ idUser })
        await db.Cart.destroy({
            where: {
                idOrder: order.id
            }
        })
        const orderReload = await order.reload({ include: { all: true } })
        order.total = mtd.calcularTotal(orderReload)
        await order.save()
       
    },
    modifyStatusFromOrder: async ({ idUser, status }) => {
        if (!idUser || !status) {
            throw {
                ok: false,
                message: "Debes ingresar un user y un estado"
            }
        }
        const order = await mtd.getOrder({ idUser })
        order.status = status
        return order.save()
    }
   
  

}
