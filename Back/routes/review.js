const express = require('express');
const router = express.Router();
const { Review, User, Restaurant } = require('../models'); // 모델 가져오기
const axios = require('axios'); // axios 모듈 가져오기

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(async (req, res, next) => {
    console.log('요청 본문:', req.body);
    
    // 세션 아이디를 추출
    const sessionID = req.body.sessionID;
    
    try {
        // 세션 아이디를 사용하여 사용자 정보 가져오기
        const user = await User.findOne({ where: { sessionID: sessionID } });
        
        if (user) {
            // 사용자가 존재하는 경우 해당 사용자의 ID를 요청 본문에 추가
            req.body.id = user.id;
            req.userLocation = { x: user.x, y: user.y }; // 사용자의 위치 저장
        }
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
    }
    
    next(); // 다음 미들웨어 함수로 요청 전달
});

// 리뷰 작성 요청 처리
router.post('/', async (req, res) => {
    try {
        // 요청으로부터 필요한 데이터 추출
        const { id, restaurantID, comment, rating } = req.body;
        console.log(req.body)
        // 사용자의 위치 정보 가져오기
        const userLocation = req.userLocation;
        
        // 음식점의 위치 정보 가져오기
        const restaurant = await Restaurant.findOne({ where: { restaurantID: restaurantID } });
        const restaurantLocation = { x: restaurant.x, y: restaurant.y };
        
        console.log('사용자 위치:', userLocation);
        console.log('음식점 위치:', restaurantLocation);
        
        // 사용자와 음식점의 위치를 비교하여 거리 계산 (단위: km)
        const distance = calculateDistance(userLocation.x, userLocation.y, restaurantLocation.x, restaurantLocation.y);

        // 거리가 1km 이내인 경우에만 리뷰 작성 가능
        const allowedDistance = 1.1; // 허용할 최대 거리 (단위: km) - 오차 범위 + 0.1km
        if (distance <= allowedDistance) {
            // 리뷰 작성 가능한 경우
            // Review 모델을 사용하여 데이터베이스에 새로운 리뷰 생성
            const newReview = await Review.create({
                id: id,
                restaurantID: restaurantID,
                comment: comment,
                rating: rating
            });
            
            // 새로운 리뷰가 성공적으로 생성되었을 경우 클라이언트에 응답
            res.status(200).json({ success: true, message: '리뷰가 성공적으로 작성되었습니다.' });
        } else {
            // 리뷰 작성 불가능한 경우
            res.status(400).json({ success: false, message: '음식점이 너무 멀어 리뷰를 작성할 수 없습니다.' });
        }
    } catch (error) {
        // 오류 발생 시 클라이언트에 오류 메시지 응답
        console.error('리뷰 작성 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '리뷰 작성 중 오류가 발생했습니다.' });
    }
});

// 두 지점 간의 거리를 계산하는 함수
function calculateDistance(x1, y1, x2, y2) {
    const R = 6371; // 지구의 반지름 (단위: km)
    const dLat = deg2rad(x2 - x1);
    const dLon = deg2rad(y2 - y1); 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
            Math.cos(deg2rad(x1)) * Math.cos(deg2rad(x2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // 두 지점 사이의 거리 (단위: km)
    return d;
}

// 각도를 라디안으로 변환하는 함수
function deg2rad(deg) {
    return deg * (Math.PI/180);
}

module.exports = router;
