const {check} = require('express-validator');

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({min:5,max:50}).withMessage('El nombre debe tener entre 5 y 50 caracteres'),
    check('description')
        .notEmpty().withMessage('La descripción del producto es requerida').bail()
        .isLength({min:20,max:500}).withMessage('La descripción debe tener entre 20 y 500 caracteres'),
    check('marca')
        .notEmpty().withMessage('La marca del producto es obligatoria'),

    check('category')
        .notEmpty().withMessage('La categoria del producto es obligatoria'),
    check('price')
        .notEmpty().withMessage('Debes indicar un precio').bail()
        .isInt({min:1}).withMessage('Solo números positivos'),

    
    
]