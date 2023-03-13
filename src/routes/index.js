const express = require('express');
const router = express.Router();
const {index, search, admin} = require('../controllers/indexController');
const checkUserAdmin = require('../middlewares/checkUserAdmin');


router.get('/', index);
router.get('/search', search);
router.get('/dashboard', checkUserAdmin, admin);


module.exports = router;
