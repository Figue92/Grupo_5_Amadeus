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
      const config ={
            include:[
                {
                    association: "productsFavorites",
                    include : [
                        {
                            association: "images"
                        }
                    ]
                }
            ]
        }
        return db.User.findByPk(idUser,config)
    },
    addOrRemoveFavorite: async ({idUser, idProduct}) =>{
        if(!idUser || !idProduct){
            throw {
             status: 400,
                message: "Debes ingresar id de usuario y un id de producto"
            }
        }
        const config ={
            where:{
                [Op.and]:[
                    {idUser},{idProduct},
                    
                ],
                defaults: {idUser,idProduct}
            }
        }

        const [favorite, isCreated] = await db.Favorite.findOrCreate(config)
         
            if(!isCreated){
                await favorite.destroy()
            }
            return !isCreated
        }
    
}