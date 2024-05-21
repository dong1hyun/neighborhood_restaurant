const express = require('express');
const router = express.Router();
const axios = require('axios'); // HTTP 요청을 보내기 위한 axios 모듈
const { Restaurant, Review } = require('../models');
const { Op } = require('sequelize');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// FastAPI 서버의 URL
const FASTAPI_URL = 'http://127.0.0.1:4000';


router.get('/:id', async (req, res) => {
    try {
        // 음식점 정보 가져오기
        const restaurant = await Restaurant.findOne({
            where: { restaurantId: req.params.id }
        });

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
         // 리뷰 데이터 가져오기
         const reviews = await Review.findAll({
            where: { restaurantId: req.params.id },
            attributes: ['comment']
        });

        const reviewComments = reviews.map(review => review.comment);

        // FastAPI 서버에 리뷰 데이터를 요약 요청 (음식점 ID 포함)
        const response = await axios.post(`${FASTAPI_URL}/ais`, {
            restaurantId: req.params.id,
            reviews: reviewComments
        });

        // 음식점 정보와 요약된 리뷰 데이터를 함께 응답
        res.status(200).json({
            restaurant: restaurant,
            reviewSummary: response.data
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





module.exports = router;



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