const express = require("express");
const path = require("path");
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('../models')
// const {User} = require('./models')
const cors = require('cors')

app.use(cors());

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

app.listen(8080, function() {
    console.log("listening on 8080");
})

app.get('/create', (req, res) => {
    res.json("asdf")
})

const db = require('../models');
app.post('/create', async (req, res, next) => {
    // console.log(req.body)
    console.log(db)
})

app.use( express.static( path.join(__dirname, '/build') ) );

app.get('/', function(req, res){
    console.log("dd")
    res.sendFile( path.join(__dirname, '/build/index.html') )
});

app.get('*', function(req, res){
    res.sendFile( path.join(__dirname, '/build/index.html') )
});
