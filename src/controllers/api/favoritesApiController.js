const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const { getUserWithFavorites, addOrRemoveToFavorite } = require("../../services/favoritesServices");


module.exports = {
    getFavorites: async (req,res)=>{
        try {
            const {id} = req.session.userLogin;
           const user = await getUserWithFavorites({idUser:id})
            sendSuccessResponse(res,{ data: user.productsFavorites})
        } catch (error) {
            sendErrorResponse(res,error)
        }
    },
    toggleProductFavorite: async (req,res)=>{
        try {
        const {id} = req.session.userLogin;
        const {idProduct} = req.body;
        const isRemove = await addOrRemoveToFavorite({idUser:id, idProduct})
        sendSuccessResponse(res,{ data: {isRemove} })
        
            
        } catch (error) {
            console.log();
            sendErrorResponse(res,error)
        }
    }
}