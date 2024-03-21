const express = require("express");
const path = require("path");
const morgan = require('morgan');
const dotenv = require('dotenv');
// const { sequelize } = require('./models');
const bodyParser = require('body-parser');
const { User, Review, Restaurant, favorites } = require("./models");
const axios = require('axios');
const cors = require('cors');
const passport = require('./passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register'); // signup 라우터 추가

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false })
    .then(() => console.log('데이터베이스 연결 성공'))
    .catch(err => console.error(err));

app.use(
    morgan('dev'),
    express.static(path.join(__dirname, 'index')),
    express.json(),
    express.urlencoded({ extended: false }),
    cookieParser(process.env.SECRET),
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SECRET,
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
app.use('/auth', authRouter); 
app.use('/register', registerRouter); // signup 라우터 사용

app.post('/create/restaurant', function (req, res) {
    const restaurantList = req.body;
    restaurantList.forEach(place => {
        Restaurant.findOrCreate({
            where: { id: place.id, name: place.place_name },
            default: {
                id: place.id,
                name: place.place_name
            }
        })
    })
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'))
});

app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
