const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models');

// body-parser 미들웨어 추가
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
    passport.authenticate('local', async (authError, user, info) => {
        if (authError) {
            return next(authError);
        }
        if (!user) {
            return res.status(401).json({ message: '가입되지 않은 회원입니다.' });
        }
        req.login(user, async (loginError) => {
            if (loginError) {
                return next(loginError);
            }
            try {
                // 세션 ID를 응답으로 포함시켜 클라이언트에게 전달
                const sessionID = req.sessionID;
                // 사용자 테이블에 세션 ID 저장
                await User.update({ sessionID }, { where: { id: user.id } });
                return res.status(200).json({ message: '로그인 성공', sessionID, nickName: user.nickName });
            } catch (error) {
                console.error('세션 ID 저장 중 오류 발생:', error);
                return res.status(500).json({ message: '로그인 성공, 하지만 세션 ID 저장 중 오류 발생' });
            }
        });
    })(req, res, next);
});

module.exports = router;
