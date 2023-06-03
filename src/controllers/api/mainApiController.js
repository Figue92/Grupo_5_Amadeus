
const { getAllProducts, getAllUsers, getAllCategories } = require("../../services/countServices");
const { getSearchProductos } = require("../../services/searchServices");

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
        url: '/api/apiMain/metrics'
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

    search : async (req, res) => {
        try {
            const { withPagination = "true", page = 1, limit = 6, keywords } = req.query;
            console.log(keywords);
            const { count, productos, pages } = await getSearchProductos(req, {
                withPagination,
                page,
                limit: +limit,
                keywords
            });
            let data = {
                count,
                productos
            }
            if (withPagination === "true") {
                data = {
                    ...data,
                    pages,
                    currentPage: +page
                }
            }
            return res.status(200).json({
                ok: true,
                data,
                meta: {
                    status: 200,
                    url: '/api/apiMain/search'
                },
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Ha ocurrido un error"
                }
            });
        }
    }
}