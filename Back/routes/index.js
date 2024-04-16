const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models'); // Restaurant 모델을 import합니다.

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//추가) 메인 페이지에서 데이터베이스로 조회

// router.get('/', async (_req, res) => {
//     try {
//         console.log('Reached router'); // 라우터 도달 확인을 위한 콘솔 로깅

//         // 음식점 테이블에서 모든 레코드를 가져옵니다.
//         const restaurants = await Restaurant.findAll();
//         // 각 음식점의 이미지 정보만 추출하여 배열에 담습니다.
//         const images = restaurants.map(restaurant => restaurant.dataValues.img);

//         console.log('Response images:', images); // 응답 데이터를 콘솔에 출력합니다.

//         res.json({ images }); // 클라이언트에 이미지 배열을 JSON 형태로 응답합니다.
//     } catch (error) {
//         console.error('Error fetching images:', error);
//         res.status(500).json({ error: 'An error occurred while fetching images' }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
//     }
// });

module.exports = router;
