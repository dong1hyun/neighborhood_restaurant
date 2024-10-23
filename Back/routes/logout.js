const express = require('express');
const router = express.Router();
const passport = require('passport');
const { logout } = require('./helpers');
const localStrategy = require('../passport/local'); 

// 카카오로그인 추가해보기

// body-parser 미들웨어 추가
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', logout);

module.exports = router;
