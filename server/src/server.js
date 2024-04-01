const express = require("express");
const morgan = require('morgan');
const path = require('path')
const { sequelize } = require('../models')
const bodyParser = require('body-parser');
const { User, Review, Restaurant } = require("../models");
const { default: axios } = require("axios");
const app = express();

app.set('port', 3000);

sequelize.sync({ force: false })
    .then(() => {
        console.log("DB연결 성공");
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080, function () {
    console.log("listening on 8080");
})

app.post('/create/restaurant', function (req, res) {
    const restaurantList = req.body;
    console.log("@@@@@@@")
    restaurantList.forEach(async place => {
        const crawlingData = await axios.get(`https://place.map.kakao.com/m/main/v/${place.id}`)
        let img_url = crawlingData.data?.basicInfo?.mainphotourl;
        let timeList = JSON.stringify(crawlingData.data.basicInfo?.openHour?.periodList[0]?.timeList);
        console.log(timeList);
        img_url = img_url ? img_url : "none";
        timeList = timeList ? timeList : "none";

        Restaurant.findOrCreate({
            where: { 
                id: place.id, 
                name: place.place_name, 
                address: place.address_name, 
                category: place.category_name.substr(6), 
                phone: place.phone, 
                img: img_url, 
                timeList: timeList,
                x: place.x, 
                y: place.y 
            },
            default: {
                id: place.id,
                name: place.place_name,
                address: place.address_name, 
                category: place.category_name.substr(6), 
                phone: place.phone,
                img: img_url,
                timeList: timeList,
                x: place.x,
                y: place.y
            }
        })
    })
});

app.get('/placeDetail/:id', function(req, res) {
    Restaurant.findOne({
        where: { id: req.params.id }
    })
    .then(result => {
        res.json(result.dataValues)
    })
})

app.post('/register', function (req, res) {
    console.log(req.body);
    const userData = req.body;
    
});



app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
});
