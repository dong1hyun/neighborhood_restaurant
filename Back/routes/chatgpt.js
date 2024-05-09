// 1. 추후 코랩을 통한 모델링 구축 
// 2. gemini
// 3. 플라스크, 장고, 페스트 api

// const express = require('express');
// const router = express.Router();
// const axios = require('axios');

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// // 코랩에서의 서비스 URL
// const colabServiceUrl = 'YOUR_COLAB_SERVICE_URL';

// // 데이터 처리 엔드포인트
// router.post('/process-data', async (req, res) => {
//     try {
//         // 클라이언트에서 받은 데이터
//         const inputData = req.body.inputData;

//         // 코랩의 서비스에 HTTP 요청 보내기
//         const response = await axios.post(colabServiceUrl, { inputData });

//         // 코랩에서 받은 응답 반환
//         res.json({ processedData: response.data });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;

