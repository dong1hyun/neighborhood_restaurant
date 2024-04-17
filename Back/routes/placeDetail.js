const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/:id', function(req, res) {
    Restaurant.findOne({
        where: { restaurantID: req.params.id } // Sequelize 모델에서 primaryKey를 `restaurantID`로 정의했기 때문에 변경합니다.
    })
    .then(result => {
        res.json(result); // `dataValues`를 사용하지 않고 바로 객체를 반환합니다.
    })
    .catch(error => {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;


// 수정) 음식점 상세 정보 안에서 작성된 해당 음식점 리뷰 조회하기. 클라이언트 Place?에서 요청하는 걸로 예상중입니다.

// router.get('/:id', async function(req, res) {
//     try {
//         const restaurant = await Restaurant.findOne({
//             where: { restaurantID: req.params.id }
//         });

//         if (!restaurant) {
//             return res.status(404).json({ error: "Restaurant not found" });
//         }

//         const reviews = await Review.findAll({
//             where: { restaurantID: req.params.id }
//         });

//         res.json({ restaurant, reviews });
//     } catch (error) {
//         console.error("Error fetching restaurant:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });
