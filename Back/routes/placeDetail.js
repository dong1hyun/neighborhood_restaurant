const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/:id', function(req, res) {
    Restaurant.findOne({
        where: { restaurantId: req.params.id } // Sequelize 모델에서 primaryKey를 `restaurantId`로 정의했기 때문에 변경합니다.
    })
    .then(result => {
        if (result) {
            // console.log('응답 콘솔입니다:', result);
            res.json(result);
        } else {
            console.error('Restaurant not found');
            res.status(404).json({ error: 'Restaurant not found' });
        }
    })
    .catch(error => {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
