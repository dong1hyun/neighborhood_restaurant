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
            await Review.create({
                id: userID, // 사용자 ID
                restaurantId: restaurantId,
                comment: comment,
                rating: rating,
            });

            // restaurantId를 가진 리뷰의 개수 출력
            // const reviewCount = await Review.count({
            //     where: { restaurantId: restaurantId }
            // });
            const averageRating = await Review.findOne({
                where: { restaurantId: restaurantId },
                attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
            });
            const avgRating = parseFloat(averageRating.get('avgRating')).toFixed(1);
            
            // Restaurant 테이블에서 해당 restaurantId의 컬럼을 찾아 averageRating 업데이트
            await Restaurant.update(
                { averageRating: avgRating },
                { where: { restaurantId: restaurantId } }
            );

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

    return !!match1 && !!match2 && match1[1] === match2[1];
}




router.get('/:restaurantId', async (req, res) => { // 엔드포인트를 '/reviews/:restaurantId'로 변경
    try {
        const limit = 5;
        const offset = +req.query.offset || 0
        const restaurantId = req.params.restaurantId;
        const reviews = await Review.findAll({
            where: { restaurantId: restaurantId },
            order: [['createdAt', 'DESC']],
            limit, // 5개의 레코드만 가져오기
            offset,
            attributes: ['reviewId', 'comment', 'rating', 'id'] // 사용자 ID를 가져오기 위해 userId 속성 추가
        });
        // 리뷰 객체에서 comment와 rating 값만 추출하여 배열로 변환
        const commentsWithRating = await Promise.all(reviews.map(async (review) => {
            const user = await User.findOne({ where: { id: review.id } }); // 리뷰 작성자의 사용자 정보를 가져옵니다.
            const nickName = user ? user.nickName : "동네맛집러"; // 사용자 이름을 가져옵니다. 없으면 "동네맛집러"으로 표시합니다.
            return {
                reviewId: review.reviewId,
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
        }));

        // 클라이언트에게 리뷰 데이터 및 사용자 이름을 응답으로 보냄
        res.status(200).json({ success: true, reviews: commentsWithRating, nickName: nickName });
    } catch (error) {
        // 오류 발생 시 클라이언트에게 오류 메시지를 응답으로 보냄
        console.error('사용자 리뷰 조회 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '사용자 리뷰 조회 중 오류가 발생했습니다.' });
    }
});

router.post("/like", async (req, res) => {
    try {
        const { reviewId } = req.body; // 요청 본문에서 reviewId를 추출

        
    } catch (error) {
        // 오류 발생 시 클라이언트에 오류 메시지 응답
        console.error('좋아요 증가 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '좋아요 증가 중 오류가 발생했습니다.' });
    }
});

module.exports = router;