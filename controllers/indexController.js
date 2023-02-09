const fs= require('fs');
const path= require('path');
const productosFilePath= path.join(__dirname, '../data/productos.json');
const productos= JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

module.exports={
    index :
    (req,res) =>{

        const nuevos= productos.filter(producto=>producto.novedad);
        const oferta= productos.filter(producto=> producto.discount > 0 );
       return res.render('index',
       {title : 'Amadeus PC | HOME',
    productos,
    oferta,
    nuevos
})
    },
    search : (req,res) =>{
const{keywords} = req.query;

const productoFiltrado = productos.filter(producto => producto.name.toLowerCase().includes(keywords) || producto.description.toLowerCase().includes(keywords))
  return res.render('productos/resultadoSearch',{
    ...productos,
    productoFiltrado,
    keywords
  }) 
}
}