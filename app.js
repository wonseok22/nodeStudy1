var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

const cors = require('cors');

app.listen(3000, function() {
    console.log("start!!! express server on port 3000")
});

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(session({
    secret : 'beyboard cat',
    resave : false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);



