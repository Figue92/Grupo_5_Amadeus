const express = require('express');
const router = express.Router();


const{register,login, register2,profile, logout,list, processLogin}= require('../controllers/usersController');
const checkUser = require('../middlewares/checkUser');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { registerUserValidator, loginUserValidator } = require('../validations');

router.get('/register', checkUser, register)
router.get('/login', checkUser, login)
router.post('/login', loginUserValidator, processLogin)
router.post('/register', registerUserValidator, register2)
router.get('/profile', checkUserLogin, profile)
router.get('/logout', logout)
router.get('/', checkUserAdmin, list)


module.exports = router;
