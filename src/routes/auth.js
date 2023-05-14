const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth").OAuth2Strategy;

const {initialize, loginGoogleController} = require('../controllers/loginGoogleController')

const router = express.Router();

router.get('/login/google', passport.authenticate('google',{ scope: ['profile'] }),initialize);
router.get('/google/callback', 
passport.authenticate('google',{
     failureRedirect: "/users/login"
   }), 
   loginGoogleController
);
module.exports = router;



