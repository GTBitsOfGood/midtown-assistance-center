import express from 'express';
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const data_access = require('./api/data_access');
import config from 'config';
import session_dao from './api/dao/session_dao';

app.use(require('cookie-parser')());

app.use(
  session({
    secret: 'mac',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function(username, password, done) {
    // Fill in the access to MongoDB and the users within that

    data_access.users.getUser(username, function(err, user_instance) {
      if (err) {
        console.log('ERROR: logging in');
        return done(err);
      }

      if (user_instance === null) {
        console.log('ERROR: user instance is null');
        return done(null, false, {
          message: 'Incorrect username or password!'
        });
      }

      // FIXME hashing passwords
      if (user_instance.password === password) {
        return done(null, user_instance);
      }

      return done(null, false, { message: 'Incorrect username or password!' });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  //Access to mongoDB to deserialize the user that is loggedin
  data_access.users.getUser(id, function(err, user_instance) {
    done(err, user_instance);
  });
});

app.get('/user', (req, res) => {
  let user_details = req.user;

  // FIXME Hide the password
  // user_details.password = config.hidden_password;

  res.send(user_details);
});

app.get('/logout', (req, res) => {
  req.logout();
  let session_obj = {
    type: 'Logout',
    username: req.query.username,
    time: Date.now()
  };
  session_dao.createSession(session_obj, function(err, session_instance) {
    if (err) {
      console.log('ERR');
      console.log(err);
    }
    console.log('Logout session successfully created');
    console.log(session_instance);
  });

  res.send(true);
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.send(null);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      let session_obj = {
        type: 'Login',
        username: req.body.username,
        time: Date.now()
      };
      session_dao.createSession(session_obj, function(err, session_instance) {
        if (err) {
          console.log(err);
        }
        console.log('Login session successfully created');
        console.log(session_instance);
      });

      return res.send(user);
    });
  })(req, res, next);
});

export default app;
