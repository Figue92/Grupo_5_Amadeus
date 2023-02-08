const productos= require('../data/productos.json');

module.exports={
    index :
    (req,res) =>{
       return res.render('index',
       {title : 'Amadeus PC | HOME',
    productos
})
    }
}