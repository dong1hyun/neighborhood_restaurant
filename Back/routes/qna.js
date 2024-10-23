const express = require('express');
const { QnA } = require('../models');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/list", async (req, res) => {
    try {
        const data = await QnA.findAll({
            attributes: ["qnaId", "question", "createdAt"],
            order: [
                ['createdAt', 'DESC']
            ]
        });
        
        const qna = data.map((question) => ({
            id: question.dataValues.qnaId,
            question: question.dataValues.question,
            answer: question.dataValues.answer,
            createdAt: question.dataValues.createdAt
        }));
        res.json(qna);
    } catch(error) {
        console.error(error)
    }
});

router.get("/:id", async (req, res) => {
    console.log("qna")
    try {
        const result = await QnA.findOne({
            where: {
                qnaId: req.params.id
            },
            attributes: ["qnaId", "question", "answer", "createdAt"],
        });
        console.log(result.dataValues)
        res.json(result.dataValues);
    } catch(error) {
        console.error(error)
    }
});

router.post("/add", async (req, res) => {
    console.log("add");
    console.log(req.body)
    try {
        const { question, answer } = req.body;
        const result = await QnA.create({
            question,
            answer
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