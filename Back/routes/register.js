// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const { User } = require('../models');

// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));

// router.post('/', async (req, res, next) => {
//     const { name, id, password, location } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await User.create({
//             name,
//             id,
//             password: hashedPassword,
//             location
//         });
//         res.status(201).json(user);
//     } catch (error) {
//         console.error('회원가입 중 오류가 발생했습니다:', error);
//         next(error);
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/', async (req, res, next) => {
    const { id, password } = req.body; // 아이디와 비밀번호만 받음
    console.log(id, password);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            id,
            password: hashedPassword,
        });
        res.status(201).json(user);
    } catch (error) {
        console.error('회원가입 중 오류가 발생했습니다:', error);
        next(error);
    }
});

module.exports = router;
