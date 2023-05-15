const db = require('../database/models')
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth").OAuth2Strategy;


module.exports = {
    initialize: () => { 
        passport.use(strategyConfig);
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    passport.deserializeUser(async(id, done) => {
      try {
        const user = await db.User.findOne({
          where: {
            id
          }

        });
        return done(null, user);
        
      } catch (error) {
       return done(error,null);
      }
    })
  },
session: (req, res) =>{
const { socialId, socialProvider } = req.session.passport.user;
 try {
 db.User.findOne({
  wher:{
    socialId
  }
 }).then((user)=>{
  if (!user) {
    db.User.create({
      socialId,
      socialProvider
    }).then((newUser)=>{
      req.login(newUser, (error) =>{
        if(error){
          return res.redirect('/users/login')
        }
        return res.redirect('/')
      })
    })
  }else{
    req.login(user, (error)=>{
      if(error){
        return res.redirect('/users/login')
      } 
      return res.redirect('/')
    })
  }
 })

 } catch (error) {
  
console.log(error);
}
}
}