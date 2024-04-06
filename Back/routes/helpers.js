exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(403).send('로그인 필요');
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) next();
};

exports.logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(200); // 클라이언트에 성공 상태 코드 응답
};
