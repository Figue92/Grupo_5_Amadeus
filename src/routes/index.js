const express = require('express');
const router = express.Router();
const {index, search, admin, about, question, buys} = require('../controllers/indexController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');


router.get('/', index);
router.get('/search', search);
router.get('/dashboard', checkUserAdmin, admin);
router.get('/nosotros', about);
router.get('/preguntas', question);
router.get('/comoComprar', buys)


module.exports = router;
