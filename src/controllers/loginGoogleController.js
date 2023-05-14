const db = require('../database/models')
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth").OAuth2Strategy;
/* const { socialId, socialProvider } = req.session.passport.user; */

module.exports = {
    initialize: () => { 
        passport.use(strategyConfig);
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
},
    loginGoogleController: () => {
        return passport.authenticate("google", { failureRedirect: "/users/login" });
      }
}