import express from 'express';
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(require('cookie-parser')());

app.use(
	session ({
	  secret: 'mac',
	  resave: false,
	  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const user = {
	username: "ganhari",
	password: "password"
};

passport.use(new LocalStrategy(
  function(username, password, done) {
  	//Fill in the access to MongoDB and the users within that
  	console.log(username);
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
  //Access to mongoDB to deserialize the user that is loggedin
  let user = {username: id, password: 'pass'};
  done(null, user);
});

app.post('/login', function(req, res, next){
  console.info('post');

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.info(err);
      return next(err);
    }

    if (!user) {
      return res.send(null);
    }
    console.info(user);

    req.logIn(user, function(err) {
      if (err) {
        console.info(err);
        return next(err);
      }
      return res.send(user);
    });

  })(req, res, next);
});

export default app;