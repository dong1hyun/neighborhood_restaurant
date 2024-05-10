const express = require('express');
const router = express.Router();
const { Review } = require('../models'); // 리뷰 모델 가져오기
const { process_reviews } = require('Back/routes/summarization.py'); // 요약 함수 가져오기

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// 리뷰 테이블에 저장된 comment 데이터를 요약하여 응답하는 핸들러
router.get('/', async (req, res) => {
    try {
        // 데이터베이스에서 리뷰(comment) 데이터 가져오기
        const reviews = await Review.findAll();

        // 리뷰 데이터를 요약
        const summarizedReviews = process_reviews(reviews);

        // 요약된 리뷰 응답
        res.status(200).json({ summarizedReviews });
    } catch (error) {
        console.error('에러 발생:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;
