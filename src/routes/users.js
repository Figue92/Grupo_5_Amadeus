const express = require('express');
const router = express.Router();


const{register,login, register2, processLogin}= require('../controllers/usersController')

router.get('/register', register)
router.get('/login', login)
router.post('/login', processLogin)
router.get('/register-data', register2)


module.exports = router;
