const express = require('express');
const router = express.Router();
const { Favorites, User } = require('../models');
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    const { sessionID, restaurantId } = req.body;

    try {
        // 세션 ID를 사용하여 사용자를 찾습니다.
        const user = await User.findOne({ where: { sessionID } });
        if (!user) {
            return res.status(400).json({ error: '제공된 세션 ID에 해당하는 사용자를 찾을 수 없습니다.' });
        }

        // 사용자의 즐겨찾기에 이미 레스토랑이 있는지 확인합니다.
        const existingFavorite = await Favorites.findFavorite(user.id, restaurantId);
        if (existingFavorite) {
            return res.status(400).json({ error: '이미 즐겨찾기에 추가된 레스토랑입니다.' });
        }

        // 새로운 즐겨찾기 항목을 생성합니다.
        await Favorites.create({ id: user.id, restaurantId });

        // 성공적인 응답을 전송합니다.
        res.json({ message: '즐겨찾기가 성공적으로 추가되었습니다.' });
    } catch (error) {
        console.error('즐겨찾기 추가 중 오류가 발생했습니다:', error);
        res.status(500).json({ error: '서버 오류로 인해 즐겨찾기를 추가할 수 없습니다.' });
    }
});

module.exports = router;
