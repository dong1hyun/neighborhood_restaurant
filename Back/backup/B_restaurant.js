// 데이터베이스 백업 코드

const express = require('express');
const router = express.Router();
const { Restaurant, User, Favorites } = require('../models');
const axios = require('axios'); // axios 모듈 가져오기

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


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
            let timeList;
            if (crawlingData.data.basicInfo?.openHour?.periodList) {
                timeList = JSON.stringify(crawlingData.data.basicInfo?.openHour?.periodList[0]?.timeList);
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



// 마이페이지 로그인 된 사용자의 즐겨찾기
router.get('/:sessionID', async (req, res) => {
    try {
        // 세션 아이디를 추출합니다.
        const sessionID = req.params.sessionID;

        // 세션 아이디를 사용하여 사용자 정보를 가져옵니다.
        const user = await User.findOne({ where: { sessionID: sessionID } });

        if (!user) {
            console.error('해당 세션 아이디를 가진 사용자를 찾을 수 없습니다.');
            res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
            return;
        }

        // 사용자의 ID를 가져옵니다.
        const userID = user.id;

        // 사용자가 즐겨찾는 식당 정보를 가져옵니다.
        const favorites = await Favorites.findAll({ where: { id: userID } });

        // 사용자가 즐겨찾는 식당의 ID 배열을 생성합니다.
        const favoriteRestaurantIds = favorites.map(favorite => favorite.restaurantId);

        // 즐겨찾는 식당들의 정보를 가져옵니다.
        const restaurants = await Restaurant.findAll({ where: { restaurantId: favoriteRestaurantIds } });

        // 각 음식점의 이미지 정보만 추출하여 배열에 담습니다.
        const restaurantData = restaurants.map(restaurant => ({
            restaurantId: restaurant.dataValues.restaurantId,
            restaurantName: restaurant.dataValues.restaurantName,
            img: restaurant.dataValues.img
        }));

        res.json({ restaurantData }); // 클라이언트에 이미지 배열을 JSON 형태로 응답합니다.
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'An error occurred while fetching images' }); // 에러 발생 시 500 상태코드와 에러 메시지를 응답합니다.
    }
});


module.exports = router;
