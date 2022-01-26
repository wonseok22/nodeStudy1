var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var main = require('./main');
var email = require('./email');
var join = require('./join/index');
var login = require('./login/index');
var logout = require('./logout/index');
var movie = require('./movie/index');
var mission = require('./mission/index');

//url root
router.get('/', function(req,res){
    res.sendfile( path.join(__dirname , "../public/main.html"))
});

router.use('/mission', mission);
router.use('/movie', movie);
router.use('/email', email);
router.use('/main', main);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);

module.exports = router;


