const { getFindAndCountAllBrands } = require("../../services/countServices")

module.exports={
    index: async (req,res)=>{
        try {
            const {count, brands} = await getFindAndCountAllBrands()

return res.status(200).json({
    ok: true,
    data: {
        count,
        brands
    }
})

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Hubo un error"
                }
            })
            
        }
    }
}
