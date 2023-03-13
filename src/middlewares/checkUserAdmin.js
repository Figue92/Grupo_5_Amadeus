module.exports = (req,res,next) => {
    if(!req.session.userLogin || req.session.userLogin.rol !== "admin"){
        return res.redirect('/')
    }
next()
    
}