const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/:id', function(req, res) {
    Restaurant.findOne({
        where: { restaurantID: req.params.id } // Sequelize 모델에서 primaryKey를 `restaurantID`로 정의했기 때문에 변경합니다.
    })
    .then(result => {
        res.json(result); // `dataValues`를 사용하지 않고 바로 객체를 반환합니다.
    })
    .catch(error => {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
