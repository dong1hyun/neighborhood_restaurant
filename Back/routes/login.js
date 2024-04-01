const express = require('express');
const router = express.Router();
const passport = require('passport');
const { logout } = require('./helpers');
const localStrategy = require('../passport/local'); 

// 카카오로그인 추가해보기

// body-parser 미들웨어 추가
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
    console.log(JSON.stringify(req.body));

    
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({ message: '가입되지 않은 회원입니다.' });
        }
        req.login(user, loginError => {
            if (loginError) {
                return next(loginError);
            }
            return res.status(200).json({ message: '로그인 성공', user });
        });
    })(req, res, next);
});

// router.get('/logout', logout);

module.exports = router;
