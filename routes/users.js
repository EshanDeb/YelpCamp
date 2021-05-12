const express = require('express');
const passport = require('passport');
const users = require('../controllers/users');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.get('/users', users.printUsers);

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout);

module.exports = router;