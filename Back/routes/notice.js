const express = require('express');
const { Notice } = require('../models');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/list", async (req, res) => {
    console.log("here")
    try {
        const data = await Notice.findAll({
            attributes: ["noticeId", "title", "createdAt"],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        
        const notices = data.map((notice) => ({
            id: notice.dataValues.noticeId,
            title: notice.dataValues.title,
            description: notice.dataValues.description,
            createdAt: notice.dataValues.createdAt
        }));
        res.json(notices);
    } catch(error) {
        console.error(error)
    }
});

router.get("/:id", async (req, res) => {
    console.log("here22");
    try {
        const result = await Notice.findOne({
            where: {
                noticeId: req.params.id
            },
            attributes: ["noticeId", "title", "description", "createdAt"],
        });
        console.log(result.dataValues)
        res.json(result.dataValues);
    } catch(error) {
        console.error(error)
    }
});

router.post("/add", async (req, res) => {
    try {
        const { title, description } = req.body;
        const result = await Notice.create({
            title,
            description
        });

        if (result) {
            res.status(200).json({ message: '공지사항 작성 성공'});
        } else {
            res.status(404).json({ message: '공지사항 작성 실패.' });
        }
    } catch(error) {
        console.error('공지사항 작성 중 오류 발생:', error);
        res.status(500).json({ message: '공지사항 작성 중 오류 발생' });
    }
});

module.exports = router;