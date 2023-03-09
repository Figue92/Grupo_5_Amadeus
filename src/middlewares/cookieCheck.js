module.exports = (req,res,next) => {
    if(req.cookies.userAmadeus){
        req.session.userLogin = req.cookies.userAmadeus
    }

    next()
}