import express from 'express';
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
const app = express();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
app.use(require('cookie-parser')());

app.use(
	session ({
	  secret: 'mac',
	  resave: false,
	  saveUninitialized: false
}));

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

const user = {
	username: "ganhari",
	password: "password"
};


passport.use(new LocalStrategy(
  function(username, password, done) {
  	if (username === user.username) {
  		if (password === user.password) {
  			return done(null, user);
  		}
  	}
  	return done(null, false);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  	var user = {username: id, password: "pass"};
  	done(null, user);
});

app.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err); }
	    if (!user) {
	    	console.log('failed');
	    	return res.send(null); 
	    }
	    console.log(user);
	    req.logIn(user, function(err) {
	      if (err) { 
	      	console.log(err);
	      	return next(err); 
	      }
	      console.log(user);
	      return res.send(user);
	    });
	})(req, res, next);
});



export default app;