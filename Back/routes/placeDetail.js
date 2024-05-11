const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/:id', function(req, res) {
    Restaurant.findOne({
        where: { restaurantId: req.params.id } // Sequelize 모델에서 primaryKey를 `restaurantId`로 정의했기 때문에 변경합니다.
    })
    .then(result => {
        if (result) {
            res.json(result);
        } else {
            console.error('Restaurant not found');
            res.status(404).json({ error: 'Restaurant not found' });
        }
    })
    .catch(error => {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

// 추천음식점 조회
// router.get('/recommended', async (_req, res) => {
//     try {
//         // 음식점 테이블에서 랜덤하게 5개의 레코드를 가져옵니다.
//         const restaurants = await Restaurant.findAll({
//             order: sequelize.random(), // Sequelize에서 지원하는 랜덤 정렬
//             limit: 5 // 5개의 레코드만 선택
//         });
        
//         // 각 음식점의 이미지 정보만 추출하여 배열에 담습니다.
//         const restaurantData = restaurants.map(restaurant => ({
//             restaurantId: restaurant.dataValues.restaurantId,
//             restaurantName: restaurant.dataValues.restaurantName,
//             img: restaurant.dataValues.img
//         }));
        
//         res.json({ restaurantData }); // 클라이언트에 이미지 배열을 JSON 형태로 응답합니다.
//     } catch (error) {
//         console.error('Error fetching random restaurants:', error);
//         res.status(500).json({ error: 'An error occurred while fetching random restaurants' }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
//     }
// });


module.exports = router;
