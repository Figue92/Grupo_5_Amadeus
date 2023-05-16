
const { getAllProducts, getAllUsers, getAllCategories } = require("../../services/countServices")

module.exports={
    metrics : async (req,res) => {
try {
    const totalProducts = await getAllProducts();
    const totalUsers = await getAllUsers();
    const totalCategories = await getAllCategories();

return res.status(200).json({
    ok:true,
    meta: {
        status: 200,
        total,
        url: '/api/metrics'
    },
    data: {
        totalProducts,
        totalUsers,
        totalCategories
    }
  
})

} catch (error) {
    
    return res.status(error.status || 500).json({
        ok : false,
        error : {
            status : error.status || 500,
            message : error.message || 'Ocurrió un error'
        }
    })
}
    },
}