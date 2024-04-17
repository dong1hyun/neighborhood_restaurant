const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        const { sessionID, x, y } = req.body; // 요청에서 세션 ID, x 좌표, y 좌표 추출

        console.log('Received user sessionID:', sessionID);

        // 사용자를 찾아서 위치 정보 업데이트
        const user = await User.findOne({ where: { sessionID } });
        if (user) {
            await user.save(); // 변경사항 저장
            console.log('위치 정보가 성공적으로 업데이트되었습니다:', user.id, x, y);
            res.status(200).send('위치 정보가 성공적으로 저장되었습니다.');
        } else {
            console.log('사용자를 찾을 수 없습니다:', sessionID);
            res.status(404).send('사용자를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('위치 정보 저장 중 오류가 발생했습니다:', error);
        res.status(500).send('내부 서버 오류가 발생했습니다.');
    }
});

module.exports = router;
