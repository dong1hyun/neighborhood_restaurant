const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Restaurant, User } = require('../models'); // Restaurant 모델을 import합니다.
const { Op } = require('sequelize'); // Sequelize 연산자를 사용하기 위해 추가

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// 메인 페이지에서 데이터베이스로 조회
router.get('/restaurantData', async (_req, res) => {
    try {
        // 음식점 테이블에서 모든 레코드를 가져옵니다.
        const restaurants = await Restaurant.findAll();
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
// '한식'이 포함된 레스토랑 데이터를 전송하는 라우터
router.get('/restaurantData/korean', async (_req, res) => {
    try {
        const koreanRestaurants = await Restaurant.findAll({
            where: { restaurantCategory: { [Op.like]: '%한식%' } }
        });
        const restaurantData = koreanRestaurants.map(restaurant => ({
            restaurantId: restaurant.dataValues.restaurantId,
            restaurantName: restaurant.dataValues.restaurantName,
            img: restaurant.dataValues.img
        }));
        res.json({ restaurantData });
    } catch (error) {
        console.error('Error fetching Korean restaurants:', error);
        res.status(500).json({ error: 'An error occurred while fetching Korean restaurants' });
    }
});

// '중식'이 포함된 레스토랑 데이터를 전송하는 라우터
router.get('/restaurantData/chinese', async (_req, res) => {
    try {
        const chineseRestaurants = await Restaurant.findAll({
            where: { restaurantCategory: { [Op.like]: '%중식%' } }
        });
        const restaurantData = chineseRestaurants.map(restaurant => ({
            restaurantId: restaurant.dataValues.restaurantId,
            restaurantName: restaurant.dataValues.restaurantName,
            img: restaurant.dataValues.img
        }));
        res.json({ restaurantData });
    } catch (error) {
        console.error('Error fetching Chinese restaurants:', error);
        res.status(500).json({ error: 'An error occurred while fetching Chinese restaurants' });
    }
});

// '일식'이 포함된 레스토랑 데이터를 전송하는 라우터
router.get('/restaurantData/japanese', async (_req, res) => {
    try {
        const japaneseRestaurants = await Restaurant.findAll({
            where: { restaurantCategory: { [Op.like]: '%일식%' } }
        });
        const restaurantData = japaneseRestaurants.map(restaurant => ({
            restaurantId: restaurant.dataValues.restaurantId,
            restaurantName: restaurant.dataValues.restaurantName,
            img: restaurant.dataValues.img
        }));
        res.json({ restaurantData });
    } catch (error) {
        console.error('Error fetching Japanese restaurants:', error);
        res.status(500).json({ error: 'An error occurred while fetching Japanese restaurants' });
    }
});


router.put('/infoUpdate/:sessionID', async (req, res) => {
    const { sessionID } = req.params;
    const { nickName, id, password } = req.body;
    if(nickName) await User.update({ nickName }, { where: { sessionID } });
    if(id) await User.update({ id }, { where: { sessionID } });
    if(password) await User.update({ password }, { where: { sessionID } });
})

module.exports = router;
