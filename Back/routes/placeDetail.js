const express = require('express');
const router = express.Router();
const axios = require('axios'); // HTTP 요청을 보내기 위한 axios 모듈
const { Restaurant, Review } = require('../models');
const { Op, Sequelize  } = require('sequelize');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// FastAPI 서버의 URL
const FASTAPI_URL = 'http://127.0.0.1:4000';


// 상세 음식점 정보 조회 + 해당 리뷰를 통한 간단한 평가 서비스
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

        console.log(response.data);
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


// 주변 추천 음식점 조회 서비스
router.get('/:id/similar', async function(req, res) {
    try {
        const restaurantId = req.params.id;
        // 주어진 restaurantId의 주소를 가져오기
        const { restaurantAddress } = await Restaurant.findOne({
            where: { restaurantId: restaurantId }
        });


        // 문자 뒤의 숫자 제거
        const cleanedAddress = restaurantAddress.replace(/\d.*$/, '').trim();

        
        // 동일한 주소를 가진 다른 음식점을 가져옵니다. 부분 일치를 사용하여 유사한 식당을 찾습니다.
        const similarRestaurants = await Restaurant.findAll({
            where: {
                restaurantAddress: {
                    [Op.like]: `${cleanedAddress}%` // 부분 일치를 위해 LIKE와 와일드카드 사용
                },
                restaurantId: {
                    [Op.ne]: restaurantId // 주어진 식당 ID는 제외
                }
            },
            order: Sequelize.literal('RAND()'), // 결과를 랜덤으로 정렬
            limit: 5 // 결과를 5개로 제한
        });
        

        const formattedRestaurants = similarRestaurants.map(restaurant => ({
            restaurantId: restaurant.restaurantId,
            restaurantName: restaurant.restaurantName,
            img: restaurant.img
        }));
        res.json(formattedRestaurants);
    } catch (error) {
        console.error("유사한 음식점을 가져오는 중 에러 발생:", error);
        res.status(500).json({ error: "내부 서버 오류" });
    }
});


module.exports = router;