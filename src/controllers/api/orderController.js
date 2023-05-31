const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const {getCompletedOrdersWithProducts} = require('../../services/orderServices')
module.exports = {
    getOrders: async (req, res) => {
        try {
          const { id } = req.session.userLogin;
            const orders = await  getCompletedOrdersWithProducts({idUser: id})
            sendSuccessResponse(res, { data: orders })
        } catch (error) { sendErrorResponse(res, error) }
    }
}