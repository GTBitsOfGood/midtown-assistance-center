import express from 'express';
import config from 'config';
import session_dao from './api/dao/session_dao';

const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const data_access = require('./api/data_access');

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
    new LocalStrategy((username, password, done) => {
        // Fill in the access to MongoDB and the users within that

        data_access.users.getUser(username, (err, user_instance) => {
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

            // compare password w/ user.password
            bcrypt.compare(password, user_instance.password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (isMatch) {
                    return done(null, user_instance);
                }
                /*
                Check if it is an old account w/ an unhashed password.
                If it is, update the account's password to be hashed
                */
                if (user_instance.password === password) {
                    // generate a salt, then run callback
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            return err;
                        }

                        // hash password using salt
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) {
                                return err;
                            }

                            console.log(`hash: ${hash}`);
                            // overwrite plain text pass w/ encrypted pass
                            user_instance.update(
                                { password: hash },
                                (err, raw) => {
                                    if (err) return err;
                                    console.log(
                                        'The raw response from Mongo was ',
                                        raw
                                    );
                                }
                            );
                        });
                    });
                    return done(null, user_instance);
                }
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            });

            /* old accounts that don't have hashed passwords need to use
            this for password checking

            if (user_instance.password === password) {
                return done(null, user_instance);
            }


            return done(null, false, {
                message: 'Incorrect username or password!'
            });
            */
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((id, done) => {
    // Access to mongoDB to deserialize the user that is loggedin
    data_access.users.getUser(id, (err, user_instance) => {
        done(err, user_instance);
    });
});

app.get('/user', (req, res) => {
    const user_details = req.user;

    // FIXME Hide the password
    // user_details.password = config.hidden_password;

    res.send(user_details);
});

app.get('/logout', (req, res) => {
    req.logout();
    const session_obj = {
        type: 'Logout',
        username: req.query.username,
        time: Date.now()
    };
    session_dao.createSession(session_obj, (err, session_instance) => {
        if (err) {
            console.log('ERR');
            console.log(err);
        }
        console.log('Logout session successfully created');
        console.log(session_instance);
    });

    res.send(true);
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.send(null);
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const session_obj = {
                type: 'Login',
                username: req.body.username,
                time: Date.now()
            };
            session_dao.createSession(session_obj, (err, session_instance) => {
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
