const express = require("express");
const path = require("path");
const morgan = require('morgan');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const restaurantRouter = require('./routes/restaurant');
const locationRouter = require('./routes/location');
const logoutRouter = require('./routes/logout');
const placeDetailRouter = require('./routes/placeDetail');
const favoriteRouter = require('./routes/favorite');
const reviewRouter = require('./routes/review');
const noticeRouter = require('./routes/notice');
const qnaRouter = require('./routes/qna');

dotenv.config();
passportConfig();

const app = express();
app.set('port', 3001);

sequelize.sync({ force: false })
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error(err));

app.use(
    morgan('dev'), //HTTP 요청을 콘솔에 로그로 기록
    express.static(path.join(__dirname, 'index')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser('SECRET'), // 비밀 키를 'SECRET'로 설정
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'SECRET', // 비밀 키를 'SECRET'로 설정
        cookie: {
            httpOnly: true,
            secure: false
        },
        name: 'session-cookie'
    })
);


app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/restaurant', restaurantRouter);
app.use('/location', locationRouter);
app.use('/logout', logoutRouter);
app.use('/placeDetail', placeDetailRouter);
app.use('/favorite', favoriteRouter);
app.use('/review', reviewRouter);
app.use('/notice', noticeRouter);
app.use('/qna', qnaRouter);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
});


app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});