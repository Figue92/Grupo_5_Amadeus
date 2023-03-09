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
    processLogin: (req,res) => {
        

        
        return res.redirect('/');
    },
    register2 : (req,res) => {
        return res.render('users/register-data');
    },   
}