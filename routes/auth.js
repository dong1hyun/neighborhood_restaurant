const express = require('express');
const router = express.Router();
const passport = require('passport');
const { logout } = require('./helpers');

router.get('/logout', logout);

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

module.exports = router;
