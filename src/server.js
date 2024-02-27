const express = require("express");
const path = require("path");
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models')

console.log("dd")

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
    console.log("ddd")
    console.error(err);
})

app.use(morgan('dev'));

app.listen(8080, function() {
    console.log("listening on 8080");
})


app.use( express.static( path.join(__dirname, '/build') ) );

app.get('/', function(req, res){
    res.sendFile( path.join(__dirname, '/build/index.html') )
});

app.get('*', function(req, res){
    res.sendFile( path.join(__dirname, '/build/index.html') )
});
