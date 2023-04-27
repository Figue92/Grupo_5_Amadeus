const db = require('../database/models');
module.exports = {
    getAllProductos : async () => {
       try {
         const productos = await db.Product.findAll();
     return productos 
    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
    }
},

getOneProducto : async(id) => {
    try {
        const producto = await db.Product.findByPk(id);
return producto

    } catch (error){
        throw {
            status : 500,
            message : error.message
        }
}
},
createProducto : async (data) =>
{
    try{
        const newProducto = await db.Product.create({
            ...data
        })
        return newProducto
    } catch (error){
        throw{
            status : 500,
            message : error.message
        }
    }
},
updateProducto: async (productoId,productoData) => {
    try {
   
      const updProducto= await db.Product.update(
                {
                    name: productoData.name,
                    price: productoData.price,
                    description: productoData.description,
                    category: productoData.category,
                    marca: productoData.marca,
                    
                },
                {
                    where: { id: productoId }
                }
                )
                return updProducto
    } catch (error) {
        throw{
            status : 500,
            message : error.message
        }
    }
},
destroyProducto : async (id) => {
    try {
        const dstProducto = await db.Product.destroy({
            where : {id}
        });
        return dstProducto;
    } catch (error) {
        throw {
            status : 500,
            message : error.message
        }
    }
}
}