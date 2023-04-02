const express = require('express');
const router = express.Router();


const{register,login, processRegister ,profile, logout,list, processLogin}= require('../controllers/usersController');
const checkUser = require('../middlewares/checkUser');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { uploadPerfil } = require('../middlewares/uploadPerfil');
const { registerUserValidator, loginUserValidator } = require('../validations/index');

router.get('/register', checkUser, register)
router.get('/login', checkUser, login)
router.post('/login', loginUserValidator, processLogin)
router.post('/register', uploadPerfil.single('image') ,registerUserValidator, processRegister)
router.get('/profile', uploadPerfil.single('image'), checkUserLogin, profile)
router.get('/logout', logout)



module.exports = router;
