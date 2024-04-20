const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models'); // Restaurant 모델을 import합니다.

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//추가) 메인 페이지에서 데이터베이스로 조회

router.get('/restaurantData', async (_req, res) => {
    try {
        // 음식점 테이블에서 모든 레코드를 가져옵니다.
        const restaurants = await Restaurant.findAll();
        console.log("식당정보 출력:", restaurants);
        // 각 음식점의 이미지 정보만 추출하여 배열에 담습니다.
        const restaurantData = restaurants.map(restaurant => ({
            restaurantId: restaurant.dataValues.restaurantId,
            restaurantName: restaurant.dataValues.restaurantName,
            img: restaurant.dataValues.img
        }));
        res.json({ restaurantData }); // 클라이언트에 이미지 배열을 JSON 형태로 응답합니다.
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'An error occurred while fetching images' }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
    }
});


// 클라이언트로부터 이미지 URL을 받아서 해당하는 음식점의 ID를 찾아 응답합니다.
router.post('/restaurantId', async (req, res) => {
    try {
        const imageUrl = req.body.imageUrl;

        // 이미지 URL을 기반으로 해당하는 음식점을 찾습니다.
        const restaurant = await Restaurant.findOne({ where: { img: imageUrl } });

        if (!restaurant) {
            // 해당하는 음식점이 없을 경우 에러를 응답합니다.
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }

        // 응답으로 찾은 음식점의 ID를 전송합니다.
        res.json({ restaurantId: restaurant.restaurantId });
    } catch (error) {
        console.error('Error fetching restaurantId:', error);
        res.status(500).json({ error: 'An error occurred while fetching restaurantId' });
    }
});

module.exports = router;
