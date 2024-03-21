const express = require('express');
const router = express.Router();
const passport = require('passport');
const { logout } = require('./helpers');

// body-parser 미들웨어 추가
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) req.login(user, loginError => res.redirect('/index'));
        else next(info);
    })(req, res, next);
});

router.get('/logout', logout);

module.exports = router;
