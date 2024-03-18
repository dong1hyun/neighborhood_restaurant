const express = require('express');
const Comment = require('../models/comment');
const { isLoggedIn } = require('./helpers');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    const { comment } = req.body;
    const userId = req.user.id;

    try {
        await Comment.create({ userId, comment });
        res.sendStatus(200); // 성공 상태 코드 반환
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // 서버 오류 상태 코드 반환
    }
});

module.exports = router;
