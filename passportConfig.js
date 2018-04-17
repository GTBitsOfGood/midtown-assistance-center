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

/**
 * Configure Passport to use the Local strategy. Passport-local is
 * "A module lets you authenticate using a username and password in your Node.js applications."
 * https://github.com/jaredhanson/passport-local
 * @param Strategy
 */

passport.use(
    new LocalStrategy(
        /**
         * 1. We check to see if this user exists in the database.
         * 2. We must do this to handle login in.
         * 3. We must query the mongo-database using the user_dao.js file (we defined the interface methods here)
         * 4. If the user doesn't exist, then we return an error or report that password was false
         * @param username: Username
         * @param password: Non-hashed Password
         * @param done: A callback that has parameters (error, user object (or false if failure))
         */

        data_access.users.getUser(username, function(err, user_instance) {
            if (err) {
                console.log('ERROR: logging in');
                return done(err);
            }

            //If we were passed a null user_instance for some reason, throw an error
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
            return done(null, false, {
                message: 'Incorrect username or password!'
            });
        })
    )
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

/**
 * 1. This function will login in a user of type: Tutor, Student, and Admin
 * 2. This method is called using axios in LoginForm.jsx
 * @param req: This contains the information from the frontend (namely: username, password, logInTime).
 * @param res: This contains the info being sent back to the frontend
 * @param next: ???
 */

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        // If you find an error authenticating, print it
        if (err) {
            console.error(err);
            return next(err);
        }

        // If authentication failed, user will be set to false. (http://www.passportjs.org/docs/authenticate/)
        //This if statement tells frontend in LoginForm that authentication failed.
        if (!user) {
            return res.send(null);
        }

        //At this point, we have that authentication is successful.
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            let session_obj = {
                type: 'Login',
                username: req.body.username,
                time: Date.now()
            };
            session_dao.createSession(session_obj, function(
                err,
                session_instance
            ) {
                if (err) {
                    console.log(err);
                }
                console.log('Login session successfully created');
                console.log(session_instance);
            });

            //We tell LoginForm.jsx that a user has been properly authenticated
            return res.send(user);
        });
    })(req, res, next); //Passport's API uses this anonymous function calling notation, don't change it.
});

export default app;
