const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res) => {
    try {
        //요청 받은 값의 body를 restaurantList변수에 넣어줌. 
        const restaurantList = req.body;
        // restaurantList변수 순회하면서 place에 맞게 키 배열해서 넣어줌.
        for (const place of restaurantList) {

            // 새로운 레스토랑을 생성하거나 기존 레스토랑을 찾습니다.
            // 조회 후 있으면 false할당. 없으면 true할당
            const [restaurant, created] = await Restaurant.findOrCreate({
                where: { restaurantID: place.id },
                defaults: {
                    restaurantName: place.place_name,
                    address: place.address_name,
                    restaurantNumber: place.phone,
                    restaurantCategory: place.category_name,
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


module.exports = router;
