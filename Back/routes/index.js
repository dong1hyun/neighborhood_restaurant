const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Restaurant, User } = require('../models'); // Restaurant 모델을 import합니다.
const { Op } = require('sequelize'); // Sequelize 연산자를 사용하기 위해 추가
const { Sequelize } = require('sequelize'); // Sequelize 객체를 불러옵니다.


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/admin', async (req, res) => {
    try {
        const admin = await User.findOne({
            where: {
                sessionId: req.query.session       
            }
        });
        res.json(admin);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'admin 데이터를 가져오는 중 오류가 발생했습니다' })
    }
})

// 메인 페이지에서 데이터베이스로 조회 (24개씩 랜덤으로 가져오기)
router.get('/restaurantData', async (_req, res) => {
    try {
        // 음식점 테이블에서 24개의 랜덤 레코드를 가져옵니다.
        const restaurants = await Restaurant.findAll({
            order: Sequelize.literal('RAND()'), // 랜덤으로 정렬
            limit: 24 // 24개의 레코드만 가져오기
        });

        // 각 음식점의 정보만 추출하여 배열에 담습니다.
        const restaurantData = restaurants.map(restaurant => ({
            restaurantId: restaurant.dataValues.restaurantId,
            restaurantName: restaurant.dataValues.restaurantName,
            img: restaurant.dataValues.img,
            averageRating: restaurant.dataValues.averageRating
        }));

        res.json({ restaurantData }); // 클라이언트에 음식점 데이터를 JSON 형태로 응답합니다.
    } catch (error) {
        console.error('음식점 데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '음식점 데이터를 가져오는 중 오류가 발생했습니다' }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
    }
});

// '한식'이 포함된 레스토랑 데이터를 랜덤으로 24개 전송하는 라우터
router.get('/restaurantData/korean', async (_req, res) => {
    try {
        const koreanRestaurants = await Restaurant.findAll({
            where: { restaurantCategory: { [Op.like]: '%한식%' } },
            order: Sequelize.literal('RAND()'),
            limit: 24
        });
        const restaurantData = koreanRestaurants.map(restaurant => ({
            restaurantId: restaurant.restaurantId,
            restaurantName: restaurant.restaurantName,
            img: restaurant.img,
            averageRating: restaurant.averageRating
        }));
        res.json({ restaurantData });
    } catch (error) {
        console.error('한식 레스토랑 데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '한식 레스토랑 데이터를 가져오는 중 오류가 발생했습니다' });
    }
});

// '중식'이 포함된 레스토랑 데이터를 랜덤으로 24개 전송하는 라우터
router.get('/restaurantData/chinese', async (_req, res) => {
    try {
        const chineseRestaurants = await Restaurant.findAll({
            where: { restaurantCategory: { [Op.like]: '%중식%' } },
            order: Sequelize.literal('RAND()'),
            limit: 24
        });
        const restaurantData = chineseRestaurants.map(restaurant => ({
            restaurantId: restaurant.restaurantId,
            restaurantName: restaurant.restaurantName,
            img: restaurant.img,
            averageRating: restaurant.averageRating
        }));
        res.json({ restaurantData });
    } catch (error) {
        console.error('중식 레스토랑 데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '중식 레스토랑 데이터를 가져오는 중 오류가 발생했습니다' });
    }
});

// '일식'이 포함된 레스토랑 데이터를 랜덤으로 24개 전송하는 라우터
router.get('/restaurantData/japanese', async (_req, res) => {
    try {
        const japaneseRestaurants = await Restaurant.findAll({
            where: { restaurantCategory: { [Op.like]: '%일식%' } },
            order: Sequelize.literal('RAND()'),
            limit: 24
        });
        const restaurantData = japaneseRestaurants.map(restaurant => ({
            restaurantId: restaurant.restaurantId,
            restaurantName: restaurant.restaurantName,
            img: restaurant.img,
            averageRating: restaurant.averageRating
        }));
        res.json({ restaurantData });
    } catch (error) {
        console.error('일식 레스토랑 데이터를 가져오는 중 오류 발생:', error);
        res.status(500).json({ error: '일식 레스토랑 데이터를 가져오는 중 오류가 발생했습니다' });
    }
});

// 마이페이지 사용자 주소 조회
router.get('/userAddress/:sessionID', async (req, res) => {
    const { sessionID } = req.params;
    try {
        // Find the user based on sessionID
        const user = await User.findOne({ where: { sessionID } });

        if (user) {
            // If user is found, send back the address
            res.json({ success: true, address: user.address });
        } else {
            res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('주소 조회 중 오류 발생:', error);
        res.status(500).json({ error: '주소를 조회하는 동안 오류가 발생했습니다.' });
    }
});

// 사용자 정보 업데이트 라우터
router.put('/infoUpdate/:sessionID', async (req, res) => {
    const { sessionID } = req.params;
    const { nickName, phone } = req.body;
    try {
        if (nickName) await User.update({ nickName }, { where: { sessionID } });
        if (phone) await User.update({ phone }, { where: { sessionID } });
        res.json({ message: '사용자 정보가 성공적으로 업데이트되었습니다' });
    } catch (error) {
        res.status(500).json({ error: '사용자 정보를 업데이트하는 중 오류가 발생했습니다' });
    }
});

// // 회원 탈퇴 라우터
// router.delete('/deleteUser/:id', async (req, res) => {
//     const { id } = req.params;

//     console.log('Received ID:', id); // 전달된 ID를 로그로 확인합니다.


//     try {
//         const result = await User.destroy({ where: { id } });

//         if (result) {
//             res.json({ success: true, message: '사용자가 성공적으로 삭제되었습니다.' });
//         } else {
//             res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
//         }
//     } catch (error) {
//         console.error('사용자 삭제 중 오류 발생:', error);
//         res.status(500).json({ error: '사용자를 삭제하는 중 오류가 발생했습니다.' });
//     }
// });


module.exports = router;
