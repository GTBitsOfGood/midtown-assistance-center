import express from 'express';
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const data_access = require('./api/data_access');

app.use(require('cookie-parser')());

app.use(
	session ({
	  secret: 'mac',
	  resave: false,
	  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
  	// Fill in the access to MongoDB and the users within that
  	console.info('local strategy username:', username);

  	data_access.users.getUser(username, function (err, user_instance) {
  	  if (err) {
        return done(err);
      }

      if (user_instance === null) {
  	    console.warn('no user exists for:', username);
        return done(null, false, { message: 'Incorrect username or password!' });
      }

      // FIXME hashing passwords
      if (user_instance.password === password) {
  	    console.info('passwords matched!');
        return done(null, user_instance);
      }

      return done(null, false, { message: 'Incorrect username or password!' });
    });
  }
));

passport.serializeUser(function(user, done) {
  console.info('serialize:', user.username);
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  console.info('deserialize:', id);

  // Access to mongoDB to deserialize the user that is loggedin
  data_access.users.getUser(id, function (err, user_instance) {
    if (err) {
      return done(err);
    }

    return done(null, user_instance);
  });
});

app.post('/login', function(req, res, next){
  console.info('post to /login');

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (!user) {
      console.warn('res.send(null) here');
      return res.send(null);
    }
    console.info('user from passport:', user);

    req.logIn(user, function(err) {
      console.info('trying to login');

      if (err) {
        console.info(err);
        return next(err);
      }

      return res.send(user);
    });

  })(req, res, next);
});

export default app;