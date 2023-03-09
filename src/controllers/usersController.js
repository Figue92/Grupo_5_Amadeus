const {validationResult} = require('express-validator');
const {readJSON, writeJSON} = require("../data");
const {hashSync} = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        return res.render('users/register',{
            title: "Registro"
        })
    },
    login: (req, res) => {
        return res.render('users/login',{
            title: "Ingresá"
        })
    },
    register2 : (req,res) => {
       const errors = validationResult(req);
       if(errors.isEmpty()){
        const users = readJSON('users.json')
        const {name, surname, email, tel, password}  = req.body;

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name : name.trim(),
            surname : surname.trim(),
            email : email.trim(),
            tel : tel,
            password : hashSync(password,12),
            rol : 'user'
        }

        users.push(newUser);

        writeJSON('users.json', users);
        return res.redirect('/users/login');

    }else{
        return res.render('users/register',{
            title : "Registro de usuario",
            errors : errors.mapped(),
            old : req.body
        })
    }

},
processLogin : (req,res) => {
    const errors = validationResult(req);
    console.log(hashSync(req.body.password, 12));
    if(!errors.isEmpty()){
        return res.render('users/login',{
            title : "Inicio de sesión",
            errors : errors.mapped(),
            old : req.body
        });
    }

    const userLogin = readJSON('users.json').find(user => user.email === req.body.email);
    delete userLogin.password;
    
    req.session.userLogin = userLogin;

    if(req.body.remember){
        res.cookie('userAmadeusPC', req.session.userLogin, {maxAge: 1000*60*5} )
    }

    return res.redirect('/users/profile')
},
profile : (req,res) => {
    return res.render('users/profile',{
        title : "Perfil de usuario",
        user : req.session.userLogin
    })
},
update : (req,res) => {
    return res.send(req.body)
},
logout : (req,res) => {
    res.clearCookie('userAmadeusPC');
    req.session.destroy();
    return res.redirect('/');
},
list : (req,res) => {
    return res.render('users/users',{
        users : readJSON('users.json')
    })
}
}