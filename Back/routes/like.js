const express = require('express');
const router = express.Router();
const { Like, User } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/add', async function(req, res) {
    const {reviewId, sessionID} = req.body;

    try {
        const user = await User.findOne({ where: { sessionID } });
        const liked = await Like.findOne({ 
            where: {
                userId: user.id,
                reviewId,
            } 
        });
        if (liked) {
            await Like.destroy({
                where: {
                    userId: user.id,
                    reviewId,
                }
            });
            res.status(200).json("삭제");
        } else {
            await Like.create({
                userId: user.id,
                reviewId
            });
            res.status(200).json("추가");
        }
    } catch(error) {
        console.error(error);
    }     
});

module.exports = router;