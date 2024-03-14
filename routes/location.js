const express = require('express');
const router = express.Router();

router.post('/location', (req, res, next) => {
    const { latitude, longitude } = req.body;
    // 여기에서 위치 정보를 사용하여 원하는 작업을 수행합니다.
    console.log('Received location:', { latitude, longitude });
    
    // 클라이언트에 응답을 보냅니다.
    res.sendStatus(200);
});

module.exports = router;

