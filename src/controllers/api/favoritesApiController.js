const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccessResponse = require("../../helpers/sendSuccessResponse");
const { getUserWithFavorites, addOrRemoveFavorite } = require("../../services/favoritesServices");


module.exports = {
    getFavorites: async (req,res)=>{

        try {
            const {id} = req.session.userLogin;
            await getUserWithFavorites({idUser: id})
            sendSuccessResponse(res,{data:user.productsFavorites})
        } catch (error) {
            sendErrorResponse(res,error)
        }
    },
    toggleProductFavorite: async (req,res)=>{
        try {
        const {id} = req.session.userLogin;
        const {idProduct} = req.body;
        const isRemove = await addOrRemoveFavorite({idUser: id, idProduct})
        sendSuccessResponse(res,{data:{isRemove}})
        
            
        } catch (error) {
            sendErrorResponse(res,error)
        }
    }
}