// routes/restaurant.js

const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');
const axios = require('axios'); // axios 모듈 가져오기

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// client/function/search P.79 -> Back/server/restaurant 
router.post('/', async (req, res) => {
    try {
        const restaurantList = req.body;
        const addedRestaurants = [];
        
        for (const place of restaurantList) {
            const existingRestaurant = await Restaurant.findOne({ where: { restaurantId: place.id } });
            if (existingRestaurant) {
                // 이미 존재하는 레스토랑이면 건너뜁니다.
                continue;
            }

            const crawlingData = await axios.get(`https://place.map.kakao.com/m/main/v/${place.id}`);
            let img_url = crawlingData.data?.basicInfo?.mainphotourl;
            let timeList = "none"; // 기본값 설정
            if (
                crawlingData.data &&
                crawlingData.data.basicInfo &&
                crawlingData.data.basicInfo.openHour &&
                crawlingData.data.basicInfo.openHour.periodList &&
                crawlingData.data.basicInfo.openHour.periodList.length > 0 &&
                crawlingData.data.basicInfo.openHour.periodList[0].timeList
            ) {
                timeList = JSON.stringify(crawlingData.data.basicInfo.openHour.periodList[0].timeList);
            }
            img_url = img_url ? img_url : "none";
            timeList = timeList ? timeList : "none";

            const newRestaurant = await Restaurant.create({
                restaurantId: place.id,
                restaurantName: place.place_name,
                restaurantAddress: place.address_name,
                restaurantCategory: place.category_name.substr(6),
                restaurantNumber: place.phone,
                img: img_url,
                timeList: timeList,
                x: place.x,
                y: place.y
            });
            
            addedRestaurants.push(newRestaurant);
        }
        
        res.status(200).json({ message: '레스토랑이 성공적으로 추가되었습니다.', addedRestaurants });
    } catch (error) {
        console.error('레스토랑 추가 중 오류가 발생했습니다:', error);
        res.status(500).json({ error: '내부 서버 오류가 발생했습니다.' });
    }
});

module.exports = router;
