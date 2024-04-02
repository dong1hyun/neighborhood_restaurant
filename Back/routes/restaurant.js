const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');
const axios = require('axios'); // axios 모듈 가져오기


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//client/function/search P.79 -> Back/server/restaurant 
router.post('/', async (req, res) => {
    try {
        const restaurantList = req.body;
        for (const place of restaurantList) {
            const crawlingData = await axios.get(`https://place.map.kakao.com/m/main/v/${place.id}`)
            let img_url = crawlingData.data?.basicInfo?.mainphotourl;
            let timeList = JSON.stringify(crawlingData.data.basicInfo?.openHour?.periodList[0]?.timeList);
            img_url = img_url ? img_url : "none";
            timeList = timeList ? timeList : "none";

            const [restaurant, created] = await Restaurant.findOrCreate({
                where: { restaurantID: place.id },
                defaults: {
                    restaurantName: place.place_name,
                    address: place.address_name,
                    Category: place.category_name.substr(6),
                    restaurantNumber: place.phone,
                    img: img_url,
                    timeList: timeList,
                    x: place.x,
                    y: place.y
                }
            });
        }
        res.status(200).send('레스토랑이 성공적으로 추가되었습니다.');
    } catch (error) {
        console.error('레스토랑 추가 중 오류가 발생했습니다:', error);
        res.status(500).send('내부 서버 오류가 발생했습니다.');
    }
});


module.exports = router;