const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const { getOrder, createProductInCart, removeProductFromCart, moreOrLessQuantityFromProduct, clearAllProductFromCart, modifyStatusFromOrder } = require('../../services/cartServices')

module.exports = {
    getOrderPending: async (req, res) => {
        try {
          const { id } = req.session.userLogin;
            const order = await getOrder({ idUser:id })
            sendSuccessResponse(res, { data: order })
        } catch (error) { sendErrorResponse(res, error) }
    },
    addProduct: async (req, res) => {
        try {
            const { idProduct } = req.body
           const {id}= req.session.userLogin
            await createProductInCart({ idUser: id, idProduct })
            sendSuccessResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }


    },
    removeProduct: async (req, res) => {
        try {
            const { idProduct } = req.body;
            const { id } = req.session.userLogin;
            await removeProductFromCart({ idUser: id, idProduct })
            sendSuccessResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }


    },

    moreQuantity: async (req, res) => {
        try {
            const { idProduct } = req.body;
            const { id } = req.session.userLogin;

            await moreOrLessQuantityFromProduct({ idUser: id, idProduct })
            sendSuccessResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }


    },
    lessQuantity: async (req, res) => {
        try {
            const { idProduct } = req.body;
            const { id } = req.session.userLogin;

            await moreOrLessQuantityFromProduct({ idUser: id, idProduct, action: "less" })
            sendSuccessResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }

    },
    clearCart: async (req, res) => {
        try {
            const { id } = req.session.userLogin;
            await clearAllProductFromCart({ idUser: id })
            sendSuccessResponse(res)
        } catch (error) {
            sendErrorResponse(res, error)
        }
    },
    statusOrder: async (req, res) => {
        try {
            const { status } = req.body
            const { id } = req.session.userLogin;
            await modifyStatusFromOrder({ idUser: id, status })
            sendSuccessResponse(res);

        } catch (error) {
            sendErrorResponse(res, error)
        }

    }
}
