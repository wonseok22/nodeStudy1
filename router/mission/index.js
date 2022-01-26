var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// DATABASE SETTING
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'asdf1234',
	database : 'study_db'
})

connection.connect()

router.get('/', function(req, res) {
	res.render('mission.ejs');
})

router.get('/login', function(req, res) {
	res.render('login.ejs');
})

router.get('/join', function(req, res) {
	res.render('join.ejs');
})

router.post('/join', function(req, res) {
    var user_id = req.body.user_id;
	var user_pw = req.body.user_pw;
	var sql = {user_id, user_pw};
	var query = connection.query('insert into accounts set ?', sql, function(err,rows) {
		if(err) throw err
		console.log("계정 생성 완료");
        return res.json({'result' : 1});
        
	})
})

router.post('/login', function(req, res) {
	var user_id = req.body.user_id;
	var user_pw = req.body.user_pw;
	var sql = {user_id, user_pw};
	var query = connection.query('select * from accounts where user_id=?', [user_id], function (err, rows) {
        if (err) return done(err);
        if (rows.length) {
            console.log(rows);
            console.log("good login complete!!");
        } else {
            console.log("cant_find_id")
        }
            
    });
})

module.exports = router;
