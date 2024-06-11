const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models');
const bcrypt = require('bcrypt');


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
                console.log(req);
                console.log(req.cookies);
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

// 아이디 찾기 라우터
router.get('/FId', async (req, res) => {
    const { phone } = req.query;
    try {
        const user = await User.findOne({ where: { phone } });
        if (user) {
            res.status(200).json({ message: '아이디 찾기 성공', id: user.id });
        } else {
            res.status(404).json({ message: '해당 번호로 가입된 사용자가 없습니다.' });
        }
    } catch (error) {
        console.error('아이디 찾기 중 오류 발생:', error);
        res.status(500).json({ message: '아이디 찾기 중 오류 발생' });
    }
});

// 비밀번호 재설정 라우터
router.post('/FPassword', async (req, res) => {
    const { id, phone, newPassword } = req.body;

    if (!id || !phone || !newPassword) {
        res.status(400).json({ message: '아이디, 전화번호, 새 비밀번호를 모두 입력해주세요.' });
    }

    try {
        const user = await User.findOne({ where: { id, phone } });
        if (user) {
            // 새 비밀번호 해싱
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // 데이터베이스에 저장
            await User.update({ password: hashedPassword }, { where: { id } });
            res.status(200).json({ message: '비밀번호 재설정 성공' });
        } else {
            res.status(404).json({ message: '아이디와 비밀번호 혹은 전화번호를 정확하게 입력하세요' });
        }
    } catch (error) {
        res.status(500).json({ message: '비밀번호 재설정 중 오류 발생' });
    }
});


module.exports = router;
