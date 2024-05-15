const express = require('express');
const router = express.Router();
const axios = require('axios'); // HTTP 요청을 보내기 위한 axios 모듈
const { Review } = require('../models'); // 리뷰 모델 가져오기


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// FastAPI 서버의 URL
const FASTAPI_URL = 'http://127.0.0.1:4000';

// 리뷰 데이터를 요약하는 핸들러
router.get('/', async (req, res) => {
    try {
        // 데이터베이스에서 리뷰(comment) 데이터 가져오기
        const reviews = await Review.findAll({
            attributes: ['comment'] // comment 열만 선택
        });

        // 리뷰(comment) 데이터만 추출하여 배열로 변환
        const reviewComments = reviews.map(review => review.comment);

        console.log('리뷰데이터',reviewComments)

        // FastAPI 서버에 GET 요청을 보냄
        const response = await axios.post(`${FASTAPI_URL}/ais`, {
            reviews: reviewComments // 리뷰 데이터를 객체 형태로 전달
        });

        // FastAPI 서버에서 받은 응답 데이터를 클라이언트로 응답
        res.status(200).json(response.data);
    } catch (error) {
        console.error('에러 발생:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;
