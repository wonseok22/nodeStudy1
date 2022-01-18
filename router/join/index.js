var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// DATABASE setting
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'asdf1234',
    port : '3306',
    database : 'study_db'
});

connection.connect();

router.get('/', function(req, res){
    var msg;
    var errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    console.log("join is loaded") 
	res.render('join.ejs', {'message' : msg});
});

//passpoer.serialize()
passport.serializeUser(function(user, done){
    console.log('passport session save:' , user.id);
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    done(null,id);
})

passport.use('local-join', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    }, 
    function(req, email, password, done) {
        var query = connection.query('select * from user where email=?', [email], function(err, rows){
            if(err) return done(err);
            if(rows.length){
                console.log('existed user');
                return done(null, false, {message : "your email is already used"});
            } else {
                var sql = {email : email, pw : password};
                var query = connection.query('insert into user set ?', sql, function(err, rows){
                    if(err) throw err;
                    return done(null, {'email' : email , 'id' : rows.insertId});
                });
            }
        })
    }
));


router.post('/', passport.authenticate('local-join', {
    successRedirect : '/main',
    failureRedirect : '/join',
    failureFlash : true})
);
// router.post('/', function(req, res){
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var passwd = body.password;

//     // create sql
//     var sql = {
//         email : email,
//         name : name,
//         pw : passwd
//     };
//     // create query 
//     var query = connection.query('insert into user set ?' , sql, function(err,rows){
//         if(err) throw err;
//         else res.render('welcom.ejs', {'name' : name, 'id' : rows.insertId});
//     }); 
// });



module.exports = router;
