const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//. get으로 먼저 DB조회해서 동일 값 있는 지 확인하는 로직 추가!

router.post('/', async (req, res, next) => {
    const { nickName, id, password, phone } = req.body; 
    
    try {
        // 이미 존재하는 아이디인지 확인
        const existingUser = await User.findOne({ where: { id } });
        if (existingUser) {
            return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 새로운 사용자 생성 및 저장
        const user = await User.create({
            nickName,
            id,
            password: hashedPassword,
            phone,
        });
        
        res.status(201).json(user);
    } catch (error) {
        console.error('회원가입 중 오류가 발생했습니다:', error);
        next(error);
    }
});


module.exports = router;
