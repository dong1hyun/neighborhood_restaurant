require('dotenv').config(); 


// // // 1. 세션 비교하여 사용사의 address 값을 가지고 위도 경도 값으로 수정 후 카카오맵 API로 보냄
// // // 2. 카카오맵에 등록 된 음식점 정보를 기준으로 사용자의 지역의 음식점을 추출 후 GPT를 통해 추천과 추천글 응답. 


const express = require('express');
const router = express.Router();
const { User } = require('../models'); // User 모델
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const KAKAO_API_KEY = process.env.REST_KEY;



// 주소를 위도 및 경도로 변환하는 함수
async function getCoordinates(address) {
    try {
        console.log('Getting coordinates for address:', address);
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
            params: { query: address },
            headers: { 'Authorization': `KakaoAK ${KAKAO_API_KEY}` }
        });

        console.log('Kakao API response for coordinates:', response.data);

        if (response.data.documents.length > 0) {
            const { x, y } = response.data.documents[0]; // 경도(lng)와 위도(lat)
            return { lng: x, lat: y };
        } else {
            throw new Error('Address not found');
        }
    } catch (error) {
        console.error('Error converting address to coordinates:', error.message);
        throw new Error('Failed to convert address to coordinates');
    }
}

// 카카오 API를 사용하여 특정 위치 주변의 음식점을 검색하는 함수
async function getKakaoRestaurants(location, query) {
    try {
        console.log('Searching for restaurants at location:', location, 'with query:', query);
        const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query: query,
                x: location.lng,
                y: location.lat,
                radius: 5000, // 5km 반경
                category_group_code: 'FD6', // 음식점 카테고리
                size: 10 // 최대 5개의 결과만 반환
            },
            headers: { 'Authorization': `KakaoAK ${KAKAO_API_KEY}` }
        });

        console.log('Kakao API response for restaurants:', response.data);

        return response.data.documents;
    } catch (error) {
        console.error('Error fetching restaurants from Kakao API:', error.message);
        throw new Error('Failed to fetch restaurants from Kakao API');
    }
}


router.get('/recommend', async (req, res) => {
        try {
            const sessionId = req.query.sessionId; // 클라이언트로부터 세션 ID를 쿼리 파라미터로 받음
    
            // 세션 ID를 사용해 사용자 조회
            const user = await User.findOne({ where: { sessionId: sessionId } });
    
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const address = user.address; // 문자열 형태의 사용자 주소 정보 가져오기
            const location = await getCoordinates(address); // 주소를 위도 및 경도로 변환
    
            const query = 'restaurant'; // 음식점 검색 키워드
    
            // 카카오 API를 사용해 음식점 정보 수집
            const restaurants = await getKakaoRestaurants(location, query);
    
            if (restaurants.length === 0) {
                return res.status(404).json({ error: 'No restaurants found near the provided address.' });
            }
    
            // 음식점 목록을 GPT에게 전달하여 추천 및 이유 생성
            const gptResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { 
                            role: 'user', 
                            content: `다음은 주소 "${address}" 근처에 있는 음식점들입니다: ${restaurants.map(r => r.place_name).join(', ')}. 이 음식점들 중에서 가장 좋은 곳을 추천해 주시고, 그 이유를 설명해 주세요.` 
                        }
                    ],
                    max_tokens: 500, // 필요에 따라 조정
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            const recommendation = gptResponse.data.choices[0].message.content;
    
            res.status(200).json({ recommendation }); // JSON 응답 반환
    
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to fetch and recommend restaurants.' });
        }
    });
    
    module.exports = router;