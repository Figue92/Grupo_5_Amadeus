const multer = require('multer');
const path = require('path');

const storageImage = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/productos')
        
    },
    filename : function (req,file,callback
        ){
        callback(null,`${Date.now()}_products_${path.extname(file.originalname)}`) 
    }
});

const uploadImage = multer({
    storage : storageImage
});

module.exports = {
    uploadImage
}