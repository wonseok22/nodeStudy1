var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');


//main page는 login 세션이 있을때만 접근이 가능하게 하자
router.get('/', function(req, res){
    var id = req.user;
    if(!id) res.render('login.ejs');
    res.render('main.ejs', {'id' : id});
});


module.exports = router;
