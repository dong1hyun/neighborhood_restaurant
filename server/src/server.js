const express = require("express");
const morgan = require('morgan');
const path = require('path')
const { sequelize } = require('../models')
const bodyParser = require('body-parser');
const { User, Review, Restaurant } = require("../models");
// const getHTML = require("./fetch");
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
    // console.log(req.body);
    const restaurantList = req.body;
    restaurantList.forEach(place => {
        // console.log(getHTML(place.id));
        Restaurant.findOrCreate({
            where: { id: place.id, name: place.place_name, address: place.address_name, category: place.category_name, phone: place.phone ,x: place.x, y: place.y },
            default: {
                id: place.id,
                name: place.place_name,
                address: place.address_name, 
                category: place.category_name, 
                phone: place.phone,
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
