// routes/review.js

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
            // 사용자가 존재하는 경우 해당 사용자의 주소 정보를 가져옴
            req.userID = user.id; // 사용자의 ID 저장
            req.userAddress = user.address; // 사용자의 주소 저장
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
        const { restaurantId, comment, rating } = req.body;
        
        // 사용자의 ID 및 주소 정보 가져오기
        const userID = req.userID;
        const userAddress = req.userAddress;
        
        // 음식점의 주소 정보 가져오기
        const restaurant = await Restaurant.findOne({ where: { restaurantId: restaurantId } });
        const restaurantAddress = restaurant.restaurantAddress; // 수정된 부분
        
        console.log('사용자 ID:', userID);
        console.log('사용자 주소:', userAddress);
        console.log('음식점 주소:', restaurantAddress);
        
        // 사용자와 음식점의 주소를 비교하여 동일한 지역인지 확인
        const isSameLocation = isAddressMatch(userAddress, restaurantAddress);
        
        if (isSameLocation) {
            // 사용자와 음식점이 동일한 지역에 있는 경우에만 리뷰 작성 가능
            // Review 모델을 사용하여 데이터베이스에 새로운 리뷰 생성
            const newReview = await Review.create({
                id: userID, // 사용자 ID
                restaurantId: restaurantId, // 수정된 부분
                comment: comment,
                rating: rating
            });
            
            // 새로운 리뷰가 성공적으로 생성되었을 경우 클라이언트에 응답
            res.status(200).json({ success: true, message: '리뷰가 성공적으로 작성되었습니다.' });
        } else {
            // 사용자와 음식점이 동일한 지역에 있지 않은 경우
            res.status(400).json({ success: false, message: '리뷰를 작성할 수 있는 지역이 아닙니다.' });
        }
    } catch (error) {
        // 오류 발생 시 클라이언트에 오류 메시지 응답
        console.error('리뷰 작성 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '리뷰 작성 중 오류가 발생했습니다.' });
    }
});

// 리뷰 조회 요청 처리
router.get('/:restaurantId', async (req, res) => { // 엔드포인트를 '/reviews/:restaurantId'로 변경
    try {
        const reviews = await Review.findAll({ 
            where: { restaurantId: req.params.restaurantId }, // 음식점 아이디로 리뷰 검색
            attributes: ['comment', 'rating'] // 가져올 속성 지정에 rating 추가
        });
        // 리뷰 객체에서 comment와 rating 값만 추출하여 배열로 변환
        const commentsWithRating = reviews.map(review => ({
            comment: review.comment,
            rating: review.rating
        }));
        res.status(200).json(commentsWithRating); // 클라이언트에게 comment와 rating 배열을 응답으로 보냄
    } catch (error) {
        console.error('리뷰 조회 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '리뷰 조회 중 오류가 발생했습니다.' });
    }
});



// 두 주소가 동일한 지역인지 확인하는 함수
function isAddressMatch(address1, address2) {
    const regex = /(.+?(읍|면|동))/;
    const match1 = address1.match(regex);
    const match2 = address2.match(regex);
    return !!match1 && !!match2 && match1[1] === match2[1];
}

module.exports = router;
