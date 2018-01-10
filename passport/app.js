var mongoose = require('../passport/mongoose');
//var mongoose=require("mongoose");
var express=require('express');
const {user}=require('../passport/user')
var bodyParser=require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app=express();

//app.use(app.router);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
/**
 * add schema
 */



//var url = 'mongodb://localhost:27017/myproject';

//mongoose.connect(url);
//var UserDetails=new user()

app.get('/login', function(req, res) {
    res.sendfile('views/login.html');
});
/**
 * login handle route
 */
app.post('/login',
    passport.authenticate('local',{
        successRedirect:'/loginSuccess',
        failureRedirect:'/loginFailure'
    })
);
app.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
});
/**
 * serialize and deserialise user instance
 *
 */
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new LocalStrategy(function(username, password, done) {
    console.log('adsf');
    console.log("username"+username);
    console.log("password"+password);
   // user.find().then((res)=>{console.log(res)});
   //  user.find({'username':username,'password':password},(err,res)=>{
   //      if(err) throw err;
   //      console.log(res);
   //  });
    process.nextTick(function() {

        user.findOne({
            'username': username,
        }, function(err, user) {
            if (err) {

                return done(err);
            }

            if (!user) {

                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
}));
app.listen(3001,()=>{
    console.log(`started on port 3001`);
});
