const express = require('express');
const router = express.Router();


const{register,login, register2}= require('../controllers/usersController')

router.get('/register', register)
router.get('/login', login)
router.get('/register-data', register2)


module.exports = router;
