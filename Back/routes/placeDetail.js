const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');
const { Op } = require('sequelize');


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
 

// 주소 말고, 거리순으로 고려해보자.
// // 유사한 음식점 가져오는 라우트
// router.get('/:id/similar', async function(req, res) {
//     try {
//         const restaurantId = req.params.id;

//         // 주어진 restaurantId의 주소를 가져오기
//         const { restaurantAddress } = await Restaurant.findOne({
//             where: { restaurantId: restaurantId }
//         });

//         // 숫자를 제외한 문자열로 주소를 변환합니다.
//         const cleanedAddress = restaurantAddress.replace(/\d+/g, '').trim().replace(/-$/, '');


//         console.log('요기',cleanedAddress);

//         // 동일한 주소를 가진 다른 음식점을 가져옵니다.
//         const similarRestaurants = await Restaurant.findAll({
//             where: { 
//                 restaurantAddress: cleanedAddress, // cleanedAddress 값과 동일한 주소를 가진 음식점을 선택합니다.
//                 restaurantId: { [Op.ne]: restaurantId } // 주어진 음식점 아이디는 제외
//             },
//             limit: 5 // 5개의 음식점만 가져오기
//         });
        
//         console.log('요기',similarRestaurants);


//         const formattedRestaurants = similarRestaurants.map(restaurant => ({
//             restaurantId: restaurant.restaurantId,
//             restaurantName: restaurant.restaurantName,
//             img: restaurant.img
//         }));

//         res.json(formattedRestaurants);
//     } catch (error) {
//         console.error("유사한 음식점을 가져오는 중 에러 발생:", error);
//         res.status(500).json({ error: "내부 서버 오류" });
//     }
// });



module.exports = router;
