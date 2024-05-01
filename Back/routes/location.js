const express = require('express');
const router = express.Router();
const { User, Review } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        const { sessionID, address } = req.body;
        const user = await User.findOne({ where: { sessionID } });
        if (user) {
            if (user.address === address) {
                console.log('이전과 동일한 주소입니다:', address);
                return res.status(200).send('이전과 동일한 주소입니다.');
            }
            const prevAddress = user.address; // 이전 주소 저장
            user.address = address;
            await user.save();

            // 이전 주소와 현재 주소가 다른 경우에만 review 테이블에서 데이터 삭제
            await Review.destroy({ where: { id: user.id } });

            console.log('위치 정보가 성공적으로 업데이트되었습니다:', user.id, address);
            return res.status(200).send('위치 정보가 성공적으로 저장되었습니다.');
        } else {
            console.log('사용자를 찾을 수 없습니다:', sessionID);
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('위치 정보 저장 중 오류가 발생했습니다:', error);
        return res.status(500).send('내부 서버 오류가 발생했습니다.');
    }
});

module.exports = router;
