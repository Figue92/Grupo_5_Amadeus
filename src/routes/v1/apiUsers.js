const express = require('express');
const router = express.Router();

const { registerUserValidator, validatorUserLogin } = require('../../validations/index');
const { list, profile, register, update, destroy } = require('../../controllers/api/usersApiController');


/* /api/users */
router
    .get('/', list)
    .get('/:id', profile)
    /* .post('/login', validatorUserLogin, processLogin) */
    .post('/', registerUserValidator, register)
    .put('/:id', update)
    .delete('/:id', destroy)



module.exports = router;
