module.exports = (req,res,next) => {
    if(req.cookies.userAmadeusPC){
        req.session.userLogin = req.cookies.userAmadeusPC
    }

    next()
}