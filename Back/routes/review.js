const express = require('express');
const router = express.Router();
const { Review, User, Restaurant } = require('../models'); // 모델 가져오기
const { Sequelize } = require('sequelize'); // Sequelize 객체를 불러오기
const axios = require('axios');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// 리뷰 작성 요청 처리
router.post('/', async (req, res) => {
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

    try {
        // 요청으로부터 필요한 데이터 추출
        const { restaurantId, comment, rating } = req.body;
        // 사용자의 ID 및 주소 정보 가져오기
        const userID = req.userID;
        const userAddress = req.userAddress;

        // 음식점 정보 가져오기
        const response = await axios.get(`https://place.map.kakao.com/m/main/v/${restaurantId}`);
       
        const { basicInfo } = response.data;
        const { address } = basicInfo;
        const { region } = address;
        const restaurantAddress = region.fullname;

        // 사용자와 음식점의 주소를 비교하여 동일한 지역인지 확인
        const isSameLocation = isAddressMatch(userAddress, restaurantAddress);

        if (isSameLocation) {
            // 사용자와 음식점이 동일한 지역에 있는 경우에만 리뷰 작성 가능
            // Review 모델을 사용하여 데이터베이스에 새로운 리뷰 생성
            // 반환은 하지 않음
            const newReview = await Review.create({
                id: userID, // 사용자 ID
                restaurantId: restaurantId,
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

// 두 주소가 동일한 지역인지 확인하는 함수
function isAddressMatch(address1, address2) {
    // 주소에서 '읍', '면', '동'을 포함한 부분을 추출하는 정규식
    const regex = /(.+(읍|면|동))/;
    // 주소1에서 추출한 부분과 주소2에서 추출한 부분을 비교하여 동일한 지역인지 확인
    const match1 = address1.match(regex);
    const match2 = address2.match(regex);
    console.log('userAddress:', address1);

    return !!match1 && !!match2 && match1[1] === match2[1];
}




// 리뷰 조회 요청 처리 + 5개씩 랜덤으로 조회 함.
router.get('/:restaurantId', async (req, res) => { // 엔드포인트를 '/reviews/:restaurantId'로 변경

    try {
        const restaurantId = req.params.restaurantId;

        // 음식점 아이디로 리뷰를 랜덤으로 5개 조회합니다.
        const reviews = await Review.findAll({
            where: { restaurantId: restaurantId },
            order: Sequelize.literal('RAND()'), // 랜덤으로 정렬
            limit: 5, // 5개의 레코드만 가져오기
            attributes: ['comment', 'rating', 'id'] // 사용자 ID를 가져오기 위해 userId 속성 추가
        });


        // 리뷰 객체에서 comment와 rating 값만 추출하여 배열로 변환
        const commentsWithRating = await Promise.all(reviews.map(async (review) => {
            const user = await User.findOne({ where: { id: review.id } }); // 리뷰 작성자의 사용자 정보를 가져옵니다.
            const nickName = user ? user.nickName : "Unknown"; // 사용자 이름을 가져옵니다. 없으면 "Unknown"으로 표시합니다.
            return {
                comment: review.comment,
                rating: review.rating,
                nickName // 리뷰에 사용자 닉네임 추가
            };
        }));

        res.status(200).json(commentsWithRating); // 클라이언트에게 comment와 rating 배열을 응답으로 보냄
    } catch (error) {
        console.error('리뷰 조회 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '리뷰 조회 중 오류가 발생했습니다.' });
    }
});

// 특정 restaurantId에 대한 평균 rating값 응답
router.get('/reviews/ratings/:restaurantId', async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;

        // 해당 음식점의 모든 리뷰를 가져와서 평균 rating을 계산합니다.
        const reviews = await Review.findAll({
            where: { restaurantId: restaurantId },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']] // 평균 rating 계산
        });

        const avgRating = parseFloat(reviews[0].get('avgRating')).toFixed(1); // 평균 rating 값 추출 후 소수점 한 자리까지 반올림

        res.status(200).json({ success: true, averageRating: avgRating });
    } catch (error) {
        console.error('평균 rating 계산 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '평균 rating 계산 중 오류가 발생했습니다.' });
    }
});



// 마이페이지 로그인 사용자 리뷰들 조회
router.get('/userReviews/:sessionID', async (req, res) => {
    try {
        // 세션 아이디를 추출
        const sessionID = req.params.sessionID;

        // 세션 아이디를 사용하여 사용자 정보 가져오기
        const user = await User.findOne({ where: { sessionID: sessionID } });

        if (!user) {
            // 사용자를 찾지 못한 경우
            console.error('해당 세션 아이디를 가진 사용자를 찾을 수 없습니다.');
            res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
            return;
        }

        // 사용자의 ID 및 이름 가져옴
        const userID = user.id;
        const nickName = user.nickName;

        // 해당 사용자가 작성한 리뷰들을 조회
        const userReviews = await Review.findAll({
            where: { id: userID }, // 사용자의 ID로 리뷰 검색
            attributes: ['comment', 'rating', 'restaurantId'] // 가져올 속성 지정에 rating 추가
        });

        // 리뷰 객체에서 comment와 rating 값만 추출하여 배열로 변환
        const commentsWithRating = userReviews.map(review => ({
            comment: review.comment,
            rating: review.rating,
            restaurantId: review.restaurantId,
            //userName: userName // 사용자 이름 추가
        }));

        // 클라이언트에게 리뷰 데이터 및 사용자 이름을 응답으로 보냄
        res.status(200).json({ success: true, reviews: commentsWithRating, nickName: nickName });
    } catch (error) {
        // 오류 발생 시 클라이언트에게 오류 메시지를 응답으로 보냄
        console.error('사용자 리뷰 조회 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '사용자 리뷰 조회 중 오류가 발생했습니다.' });
    }
});




module.exports = router;
