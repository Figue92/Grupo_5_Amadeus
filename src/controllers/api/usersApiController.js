const { validationResult } = require('express-validator');
const { getAllUsers, getOneUser, registerUser, updateUser, destroyUser } = require('../../services/usersServices');
const createResponseError = require('../../helpers/createResponseError');

module.exports = {
    list: async (req, res) => {
        try {

            const users = await getAllUsers();

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    count: users.length,
                    url: '/api/users'
                },
                data: users
            })

        } catch (error) {
            return createResponseError(res, error);
        }
    },
    profile: async (req, res) => {
        try {

            const {
                params: { id }
            } = req;

            const user = await getOneUser(id);

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    count: 1,
                    url: `/api/users/${id}`
                },
                data: user
            })

        } catch (error) {
            return createResponseError(res, error);
        }
    },
    register: async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            const { password2, ...data } = req.body;
            const newUser = await registerUser(data, req.file);
            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200,
                    total: 1,
                    url: `/api/users/${newUser.id}`
                },
                data: newUser
            });
        } catch (error) {
            return createResponseError(res, error);
        }

    },
    /* processLogin: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('users/login', {
                title: "Inicio de sesión",
                errors: errors.mapped(),
                old: req.body
            });
        }

        db.User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(({ id, name, surname, idRol, phone }) => {
                req.session.userLogin = {
                    id,
                    name,
                    surname,
                    phone,
                    rol: idRol
                }

                if (req.body.remember) {
                    res.cookie('userAmadeusPC', req.session.userLogin, { maxAge: 1000 * 60 * 5 })
                }

                return res.redirect('/users/profile')
            })
            .catch(error => console.log(error));

    }, */
    update: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }

            const {
                params: { id }
            } = req;

            const updatedUser = await updateUser(id, req.body, req.file);
            return res.status(200).json({
                ok : true,
                meta : {
                    status : 200,
                    count : 1,
                    url : `/api/users/${updatedUser.id}`
                },
                data : updatedUser
            })
        } catch (error) {
            return createResponseError(res, error);
        }                
    },
    destroy : async (req, res) => {
        try {

            const {
                params : {id}
            } = req;

            const deletedUser = await destroyUser(id);
            return res.status(200).json({
                ok : true,
                message : 'Usuario eliminado con éxito.',
                meta : {
                    status : 200,
                    count : 1,
                    url : `/api/users/${deletedUser.id}`
                },
                data : deletedUser
            })
            
        } catch (error) {
            return createResponseError(res, error);
        }
        db.User.destroy({
            where: {
                id: req.session.userLogin.id
            }
        })
            .then(() => {
                res.clearCookie('userAmadeusPC');
                req.session.destroy();
                return res.redirect('/')
            })
            .catch(error => console.log(error))
    }
}