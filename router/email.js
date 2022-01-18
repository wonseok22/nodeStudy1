var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

// DATABASE setting
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'asdf1234',
    port : '3306',
    database : 'study_db'
});

connection.connect();

// router
router.post('/form', function(req, res){
	console.log(req.body.email);
	res.render('email.ejs', {'email' : req.body.email});
});


router.post('/ajax', function(req, res){
      var email = req.body.email;
      var responseData = {};
      var query = connection.query('select * from user where email="'+ email + '";', function(err, rows){
          if(err) throw err;
          if(rows[0]){
              responseData.result = "OK";
              responseData.name = rows[0].name;
          }
          else{
              responseData.result = "None";
              responseData.name = "";
          }
          res.json(responseData);
      });
 
 });

module.exports = router;
