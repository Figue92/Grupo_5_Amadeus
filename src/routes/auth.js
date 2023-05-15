const express = require('express');
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth").OAuth2Strategy;

const {initialize, session} = require('../controllers/loginGoogleController')

const router = express.Router();

router.get('/login/google', passport.authenticate('google',initialize))
router.get('/google/callback', passport.authenticate('google',{failureRedirect: "/users/login"}),session);


module.exports = router;



