const db = require('../database/models')
module.exports={
    getCompletedOrdersWithProducts: async ({idUser}) => {
        try {
          const orders = await db.Order.findAll({
            where: {
              idUser,
              status: 'completed'
            },
            include: [
              {
                model: db.Product,
                as: 'cart',
                through: {
                  model: db.Cart,
                  attributes: ['quantity']
                },
                include: [
                  {
                    model: db.ProductImage,
                    as: 'image'
                  }
                ]
              }
            ]
          });
      
          return orders;
      
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
}

