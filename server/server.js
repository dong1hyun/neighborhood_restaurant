const express = require("express");
const morgan = require('morgan');
const path = require('path')
const { sequelize } = require('./models')
const bodyParser = require('body-parser');
const { User, Review, Restaurant } = require("./models");
const app = express();

// async function fetchdata() {
//     const { data } = await axios.get('/m/15849177');
//     console.log(data);
// }
// fetchdata()

app.set('port', 3000);
// nunjucks.configure('views', {
//     express: app,
//     watch: true,
// });

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
        Restaurant.findOrCreate({
            where: { id: place.id, name: place.place_name },
            default: {
                id: place.id,
                name: place.place_name
            }
        })
    })
})

app.post('/register', function (req, res) {
    console.log(req.body);
    const userData = req.body;
    
});



app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index/html'))
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index/html'))
});
