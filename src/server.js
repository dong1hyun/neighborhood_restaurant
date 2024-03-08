const express = require("express");
const path = require("path");
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models')
const bodyParser = require('body-parser');
const {User, Review, Restaurant} = require("./models");

app.set('port', 3000);
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({force:false})
.then(() => {
    console.log("DB연결 성공");
})
.catch((err) => {
    console.error(err);
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080, function() {
    console.log("listening on 8080");
})

app.post('/create', function(req, res) {
    console.log(User);
})

app.post('/create/restaurant', function(req, res) {
    console.log(req.body);
    const {id, name} = req.body
    Restaurant.create({
        id,
        name
    })
})



app.use( express.static( path.join(__dirname, '../build') ) );

app.get('/', function(req, res){
    res.sendFile( path.join(__dirname, '../build/index.html') )
});

app.get('*', function(req, res){
    res.sendFile( path.join(__dirname, '../build/index.html') )
});
