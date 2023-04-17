const express = require('express');
const router = express.Router();


const{destroy, register,login, processRegister ,profile, logout,list, processLogin, edit, update}= require('../controllers/usersController');
const checkUser = require('../middlewares/checkUser');
const checkUserAdmin = require('../middlewares/checkUserAdmin');
const checkUserLogin = require('../middlewares/checkUserLogin');
const { uploadPerfil } = require('../middlewares/uploadPerfil');
const { registerUserValidator, validatorUserLogin } = require('../validations/index');

router.get('/register', checkUser, register)
router.get('/login', checkUser, login)
router.post('/login', validatorUserLogin, processLogin)
router.post('/register', uploadPerfil.single('image') ,registerUserValidator, processRegister)
router.get('/profile', uploadPerfil.single('image'), checkUserLogin, profile)
router.get('/edit', checkUserLogin, edit)
router.put('/edit', uploadPerfil.single('image'), update)
router.get('/logout', logout)
router.delete('/delete', destroy)



module.exports = router;
