const { Op } = require('sequelize')
const db = require('../database/models')

module.exports ={
    getUserWithFavorites: ({idUser}) =>{
        if(!idUser){
            throw {
                status: 400,
                message: "Debes ingresar id de usuario"
            }
        }
        return db.User.findByPk(idUser,{
            include:[
                {
                    association: "productsFavorites",
                    include : [
                        {
                            association: "image"
                        }
                    ]
                }
            ]
        })
    },
    addOrRemoveToFavorite: async ({idUser, idProduct}) =>{
        if(!idUser || !idProduct){
            throw {
             status: 400,
                message: "Debes ingresar id de usuario y un id de producto"
            }
        }
        
        const [favorite, isCreated] = await db.Favorite.findOrCreate({
            where:{
                [Op.and]:[
                    {idUser},{idProduct},
                    
                ],
            },
                defaults: {idUser,idProduct}
            
    })
         
            if(!isCreated){
                await favorite.destroy()
            }
            return !isCreated
        }
    
}