// const express = require('express');
// const router = express.Router();
// const { Review, User, Restaurant } = require('../models'); // 모델 가져오기
// const { Sequelize } = require('sequelize'); // Sequelize 객체를 불러오기
// const axios = require('axios');


// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));


// // 리뷰 작성 요청 처리
// router.post('/', async (req, res) => {
//     // 세션 아이디를 추출
//     const sessionID = req.body.sessionID;
//     try {
//         // 세션 아이디를 사용하여 사용자 정보 가져오기
//         const user = await User.findOne({ where: { sessionID: sessionID } });

//         if (user) {
//             // 사용자가 존재하는 경우 해당 사용자의 주소 정보를 가져옴
//             req.userID = user.id; // 사용자의 ID 저장
//             req.userAddress = user.address; // 사용자의 주소 저장
//         }
//     } catch (error) {
//         console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
//     }

//     try {
//         // 요청으로부터 필요한 데이터 추출
//         const { restaurantId, comment, rating } = req.body;
//         // 사용자의 ID 및 주소 정보 가져오기
//         const userID = req.userID;
//         const userAddress = req.userAddress;

//         // 음식점 정보 가져오기
//         const response = await axios.get(`https://place.map.kakao.com/m/main/v/${restaurantId}`);
       
//         const { basicInfo } = response.data;
//         const { address } = basicInfo;
//         const { region } = address;
//         const restaurantAddress = region.fullname;

//         // 사용자와 음식점의 주소를 비교하여 동일한 지역인지 확인
//         const isSameLocation = isAddressMatch(userAddress, restaurantAddress);

//         if (isSameLocation) {
//             // 사용자와 음식점이 동일한 지역에 있는 경우에만 리뷰 작성 가능
//             // Review 모델을 사용하여 데이터베이스에 새로운 리뷰 생성
//             // 반환은 하지 않음
//             await Review.create({
//                 id: userID, // 사용자 ID
//                 restaurantId: restaurantId,
//                 comment: comment,
//                 rating: rating,
//                 like: 0
//             });

//             // restaurantId를 가진 리뷰의 개수 출력
//             // const reviewCount = await Review.count({
//             //     where: { restaurantId: restaurantId }
//             // });
//             const averageRating = await Review.findOne({
//                 where: { restaurantId: restaurantId },
//                 attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
//             });
//             const avgRating = parseFloat(averageRating.get('avgRating')).toFixed(1);
            
//             // Restaurant 테이블에서 해당 restaurantId의 컬럼을 찾아 averageRating 업데이트
//             await Restaurant.update(
//                 { averageRating: avgRating },
//                 { where: { restaurantId: restaurantId } }
//             );

//             // 새로운 리뷰가 성공적으로 생성되었을 경우 클라이언트에 응답
//             res.status(200).json({ success: true, message: '리뷰가 성공적으로 작성되었습니다.' });
//         } else {
//             // 사용자와 음식점이 동일한 지역에 있지 않은 경우
//             res.status(400).json({ success: false, message: '리뷰를 작성할 수 있는 지역이 아닙니다.' });
//         }
//     } catch (error) {
//         // 오류 발생 시 클라이언트에 오류 메시지 응답
//         console.error('리뷰 작성 중 오류가 발생했습니다:', error);
//         res.status(500).json({ success: false, message: '리뷰 작성 중 오류가 발생했습니다.' });
//     }
// });



// // 두 주소가 동일한 지역인지 확인하는 함수
// function isAddressMatch(address1, address2) {
//     // 주소에서 '읍', '면', '동'을 포함한 부분을 추출하는 정규식
//     const regex = /(.+(읍|면|동))/;
//     // 주소1에서 추출한 부분과 주소2에서 추출한 부분을 비교하여 동일한 지역인지 확인
//     const match1 = address1.match(regex);
//     const match2 = address2.match(regex);
//     console.log('userAddress:', address1);

//     return !!match1 && !!match2 && match1[1] === match2[1];
// }




// // 리뷰 조회 요청 처리 + 5개씩 랜덤으로 조회 함.
// router.get('/:restaurantId', async (req, res) => { // 엔드포인트를 '/reviews/:restaurantId'로 변경
//     try {
//         const restaurantId = req.params.restaurantId;
//         // 음식점 아이디로 리뷰를 랜덤으로 5개 조회합니다.
//         const reviews = await Review.findAll({
//             where: { restaurantId: restaurantId },
//             order: Sequelize.literal('RAND()'), // 랜덤으로 정렬
//             limit: 5, // 5개의 레코드만 가져오기
//             attributes: ['reviewId', 'comment', 'rating', 'like', 'id'] // 사용자 ID를 가져오기 위해 userId 속성 추가
//         });


//         // 리뷰 객체에서 comment와 rating 값만 추출하여 배열로 변환
//         const commentsWithRating = await Promise.all(reviews.map(async (review) => {
//             const user = await User.findOne({ where: { id: review.id } }); // 리뷰 작성자의 사용자 정보를 가져옵니다.
//             const nickName = user ? user.nickName : "동네맛집러"; // 사용자 이름을 가져옵니다. 없으면 "동네맛집러"으로 표시합니다.
//             return {
//                 reviewId: review.reviewId,
//                 comment: review.comment,
//                 rating: review.rating,
//                 like: review.like,
//                 nickName // 리뷰에 사용자 닉네임 추가
//             };
//         }));
//         console.log(commentsWithRating);
//         res.status(200).json(commentsWithRating); // 클라이언트에게 comment와 rating 배열을 응답으로 보냄
//     } catch (error) {
//         console.error('리뷰 조회 중 오류가 발생했습니다:', error);
//         res.status(500).json({ success: false, message: '리뷰 조회 중 오류가 발생했습니다.' });
//     }
// });

// // 마이페이지 로그인 사용자 리뷰들 조회
// router.get('/userReviews/:sessionID', async (req, res) => {
//     try {
//         // 세션 아이디를 추출
//         const sessionID = req.params.sessionID;

//         // 세션 아이디를 사용하여 사용자 정보 가져오기
//         const user = await User.findOne({ where: { sessionID: sessionID } });

//         if (!user) {
//             // 사용자를 찾지 못한 경우
//             console.error('해당 세션 아이디를 가진 사용자를 찾을 수 없습니다.');
//             res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
//             return;
//         }

//         // 사용자의 ID 및 이름 가져옴
//         const userID = user.id;
//         const nickName = user.nickName;

//         // 해당 사용자가 작성한 리뷰들을 조회
//         const userReviews = await Review.findAll({
//             where: { id: userID }, // 사용자의 ID로 리뷰 검색
//             attributes: ['comment', 'rating', 'like', 'restaurantId'] // 가져올 속성 지정에 rating 추가
//         });

//         // 리뷰 객체에서 comment와 rating 값만 추출하여 배열로 변환
//         const commentsWithRating = userReviews.map(review => ({
//             comment: review.comment,
//             rating: review.rating,
//             restaurantId: review.restaurantId,
//             like: review.like
//         }));

//         // 클라이언트에게 리뷰 데이터 및 사용자 이름을 응답으로 보냄
//         res.status(200).json({ success: true, reviews: commentsWithRating, nickName: nickName });
//     } catch (error) {
//         // 오류 발생 시 클라이언트에게 오류 메시지를 응답으로 보냄
//         console.error('사용자 리뷰 조회 중 오류가 발생했습니다:', error);
//         res.status(500).json({ success: false, message: '사용자 리뷰 조회 중 오류가 발생했습니다.' });
//     }
// });

// router.post("/like", async (req, res) => {
//     try {
//         const { reviewId } = req.body; // 요청 본문에서 reviewId를 추출

//         // 리뷰를 찾기
//         const review = await Review.findOne({ where: { reviewId } });

//         if (review) {
//             // 좋아요 수 증가
//             review.like += 1;
            
//             // 변경사항을 데이터베이스에 저장
//             await review.save();

//             // 성공 응답
//             res.status(200).json({ success: true, message: '좋아요가 증가했습니다.', like: review.like });
//         } else {
//             // 리뷰를 찾지 못한 경우
//             res.status(404).json({ success: false, message: '리뷰를 찾을 수 없습니다.' });
//         }
//     } catch (error) {
//         // 오류 발생 시 클라이언트에 오류 메시지 응답
//         console.error('좋아요 증가 중 오류가 발생했습니다:', error);
//         res.status(500).json({ success: false, message: '좋아요 증가 중 오류가 발생했습니다.' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { Review, User, Restaurant, Like } = require('../models'); // 모델 가져오기
const { Sequelize } = require('sequelize'); // Sequelize 객체를 불러오기
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 리뷰 작성 요청 처리
router.post('/', async (req, res) => {
    const sessionID = req.body.sessionID;  // sessionID를 요청 본문에서 가져오는 방식이 아닌, req.sessionID로 관리하는 것이 좋습니다.
    try {
        const user = await User.findOne({ where: { sessionID: sessionID } });

        if (user) {
            req.userID = user.id;
            req.userAddress = user.address;
        } else {
            return res.status(400).json({ success: false, message: '사용자가 존재하지 않습니다.' });
        }
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다:', error);
        return res.status(500).json({ success: false, message: '사용자 정보를 가져오는 중 오류가 발생했습니다.' });
    }

    try {
        const { restaurantId, comment, rating } = req.body;
        const { userID, userAddress } = req;

        // 음식점 정보 가져오기
        const response = await axios.get(`https://place.map.kakao.com/m/main/v/${restaurantId}`);
        
        if (!response.data.basicInfo) {
            return res.status(400).json({ success: false, message: '음식점 정보를 찾을 수 없습니다.' });
        }
        
        const { basicInfo } = response.data;
        const restaurantAddress = basicInfo.address.region.fullname;

        // 주소 매칭 확인
        const isSameLocation = isAddressMatch(userAddress, restaurantAddress);
        if (!isSameLocation) {
            return res.status(400).json({ success: false, message: '리뷰를 작성할 수 있는 지역이 아닙니다.' });
        }

        // 리뷰 작성
        await Review.create({
            id: userID,
            restaurantId: restaurantId,
            comment: comment,
            rating: rating,
            like: 0
        });

        // 평균 평점 업데이트
        const averageRating = await Review.findOne({
            where: { restaurantId },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating']]
        });

        const avgRating = parseFloat(averageRating.get('avgRating')).toFixed(1);
        
        // Restaurant 테이블 업데이트
        await Restaurant.update({ averageRating: avgRating }, { where: { restaurantId } });

        return res.status(200).json({ success: true, message: '리뷰가 성공적으로 작성되었습니다.' });
    } catch (error) {
        console.error('리뷰 작성 중 오류가 발생했습니다:', error);
        return res.status(500).json({ success: false, message: '리뷰 작성 중 오류가 발생했습니다.' });
    }
});

// 두 주소가 동일한 지역인지 확인하는 함수
function isAddressMatch(address1, address2) {
    const regex = /(.+(읍|면|동))/;
    const match1 = address1.match(regex);
    const match2 = address2.match(regex);
    return !!match1 && !!match2 && match1[1] === match2[1];
}

router.get('/:restaurantId', async (req, res) => {
    try {
        const limit = 5; // 한 번에 가져올 리뷰 개수
        const offset = +req.query.offset || 0; // 페이지네이션을 위한 offset 값
        const restaurantId = req.params.restaurantId; // 요청한 음식점 ID

        // 리뷰 조회 쿼리
        const reviews = await Review.findAll({
            where: { restaurantId: restaurantId }, // 음식점 ID로 리뷰 조회
            order: [['createdAt', 'DESC']], // 최신 리뷰 순으로 정렬
            limit, // 5개의 레코드만 가져오기
            offset, // 페이지네이션을 위한 offset 사용
            attributes: ['reviewId', 'comment', 'rating', 'id'] // 가져올 속성 지정 (id로 수정)
        });

        // 리뷰에 사용자 닉네임과 좋아요 수 추가
        const result = await Promise.all(reviews.map(async (review) => {
            const user = await User.findOne({ where: { id: review.id } }); // 작성자 정보 조회 (id로 수정)
            const like = await Like.count({
                where: { reviewId: review.reviewId } // 좋아요 수 조회
            });
            const nickName = user ? user.nickName : "동네맛집러"; // 닉네임 가져오기, 없으면 기본 값 사용

            // 결과 배열 구성
            return {
                reviewId: review.reviewId,
                comment: review.comment,
                rating: review.rating,
                nickName, // 닉네임 추가
                like, // 좋아요 수 추가
            };
        }));

        res.status(200).json(result); // 클라이언트에 결과 반환
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


// 좋아요 기능 처리
router.post("/like", async (req, res) => {
    try {
        const { reviewId, userId } = req.body;
        const review = await Review.findOne({ where: { reviewId } });

        if (!review) {
            return res.status(404).json({ success: false, message: '리뷰를 찾을 수 없습니다.' });
        }

        // 이미 좋아요를 눌렀는지 확인하는 로직 추가
        const existingLike = await Like.findOne({ where: { reviewId, userId } });

        if (existingLike) {
            return res.status(400).json({ success: false, message: '이미 좋아요를 누른 리뷰입니다.' });
        }

        // 좋아요 추가
        review.like += 1;
        await review.save();

        // 좋아요 테이블에 추가 (중복 좋아요 방지)
        await Like.create({ reviewId, userId });

        res.status(200).json({ success: true, message: '좋아요가 증가했습니다.', like: review.like });
    } catch (error) {
        console.error('좋아요 증가 중 오류가 발생했습니다:', error);
        res.status(500).json({ success: false, message: '좋아요 증가 중 오류가 발생했습니다.' });
    }
});

module.exports = router;
