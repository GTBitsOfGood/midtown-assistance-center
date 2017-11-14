import express from 'express';
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const data_access = require('./api/data_access');
import config from 'config';
import user_dao from './dao/session_dao';

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

        data_access.users.getUser(username, function (err, user_instance) {
            if (err) {
                console.log('ERROR: logging in');
                return done(err);
            }

            if (user_instance === null) {
                console.log('ERROR: user instance is null');
                return done(null, false, { message: 'Incorrect username or password!' });
            }

            // FIXME hashing passwords
            if (user_instance.password === password) {
                return done(null, user_instance);
            }

            return done(null, false, { message: 'Incorrect username or password!' });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(id, done) {

    //Access to mongoDB to deserialize the user that is loggedin
    data_access.users.getUser(id, function (err, user_instance) {
        done(err, user_instance);
    });
});

app.get('/user', (req, res) => {
    let user_details = req.user;

    // Hide the password
    user_details.password = config.hidden_password;

    res.send(user_details);
});

app.get('/logout', (req, res) => {
    req.logout();
    res.send(true);
});


app.post('/login', function(req, res, next){

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
            //TO DO: create session here and add it to the database

            var session_obj = {type: 'Login', _id: req.body.username, time: new Date()};
            session_dao.createSession(session_obj, function (err, session_instance) {
                if(err) {
                    console.log(err);
                }
                console.log('Login Session Sucessfully Created.(passportConfig.js -> 98)');
            });




            return res.send(user);
            // createSession: function(session, callback) {
            //     Session.create(session, function (err, session_instance) {
            //         if (err) {
            //             console.error('Error creating a new session:', err);
            //             callback(err);
            //         } else {
            //             callback(null, session_instance);
            //         }
            //     });
            // },


            /*
            user_dao.checkIfUsernameIsTaken(req.body.username, function(err, resultUsername){
                if (err) {
                    console.log(err);
                }
                if (!resultUsername) {
                    console.log(resultUsername);
                    user_dao.checkIfEmailIsTaken(req.body.email, function(err, resultEmail){
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(resultEmail);
                            if (!resultEmail) {
                                user_dao.createStudent({
                                    first_name: req.body.firstName,
                                    last_name: req.body.lastName,
                                    email: req.body.email,
                                    _id: req.body.username,
                                    password: req.body.password,
                                    join_date: Date.now(),
                                    classroom: req.body.access_code,
                                    grade_level: req.body.grade_level
                                }, function(err, user_instance){
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.send({
                                            success: true,
                                            error_message: null,
                                        });
                                    }
                                });
                            } else {
                                res.json({
                                    success: false,
                                    error_message: 'Email already exists'
                                });
                            }
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        error_message: 'Username already exists'
                    });
                }
            });
            */

        });

    })(req, res, next);
});

export default app;
