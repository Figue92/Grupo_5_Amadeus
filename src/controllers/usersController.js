const { validationResult } = require('express-validator');
const { readJSON, writeJSON } = require("../data");
const { hashSync } = require('bcryptjs');
const db = require('../database/models')

module.exports = {
    register: (req, res) => {
        return res.render('users/register', {
            title: "Registro"
        })
    },
    login: (req, res) => {
        return res.render('users/login', {
            title: "Ingresá"
        })
    },

    processRegister: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, surname, email, tel, password, codarea, image } = req.body;

            db.Address.create()
                .then(address => {
                    db.User.create({
                        name: name.trim(),
                        surname: surname.trim(),
                        email: email.trim(),
                        password: hashSync(password, 10),
                        phone: codarea + tel,
                        idRol: 2,
                        avatar: image,
                        idAddress: address.id
                    })
                        .then(() => {
                            return res.redirect('/users/login');
                        })
                })
                .catch(error => console.log(error));



        } else {
            return res.render('users/register', {
                title: "Registro de usuario",
                errors: errors.mapped(),
                old: req.body
            })
        }

    },
    processLogin: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('users/login', {
                title: "Inicio de sesión",
                errors: errors.mapped(),
                old: req.body
            });
        }

        db.User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(({id, name, idRol,}) => {
            req.session.userLogin = {
                id,
                name,
                rol : idRol
            }

            if (req.body.remember) {
                res.cookie('userAmadeusPC', req.session.userLogin, { maxAge: 1000 * 60 * 5 })
            }

            return res.redirect('/users/profile')
        })
        .catch(error => console.log(error));
    
    },
    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id, {
            include : ['address']
        })
        .then(user => {
            return res.render('users/profile', {
                title: "Perfil de usuario",
                user,
            })
        })

    },
    update: (req, res) => {
        const {name, surname, phone, address, city, province, zipCode} = req.body 
        const {id} = req.session.userLogin;

       db.User.findByPk(id)
            .then(user => {
                const addressUpdate = db.Address.update(
                    {
                        address : address ? address.trim() : null,
                        city : city ? city.trim() : null,
                        province: province ? province.trim() : null,
                        zipCode : zipCode ? zipCode : null
                    },
                    {
                        where : {
                            id : user.idAddress
                        }
                    }
                )
                const userUpdate = db.User.update(
                    {
                        name : name.trim(),
                        surname : surname.trim(),
                        phone,
                        avatar : req.file ? req.file.filename : user.avatar
                    },
                    {
                        where : {
                            id
                        }
                    }
                )

                Promise.all(([addressUpdate, userUpdate]))
                    .then( ()=> {

                        (req.file && fs.existsSync('public/images/users/' + user.avatar)) && fs.unlinkSync('public/images/users/' + user.avatar)

                        req.session.message = "Datos actualizados"
                        return res.redirect('/users/profile')
                    })
            }).catch(error => console.log(error))
    },
    logout: (req, res) => {
        res.clearCookie('userAmadeusPC');
        req.session.destroy();
        return res.redirect('/');
    }/* ,
    list: (req, res) => {
        db.User.findAll({
            include: ['address','rol']
        })
            .then(users => {
                return res.render('dashboard',{
                    users
                })
            })
            .catch(error => console.log(error))
    } */
}