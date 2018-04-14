/**
 * @file
 * api.js
 *
 * @fileoverview
 * What? This is the MongoDB API endpoints file. You can call an endpoint and change
 * the database in various ways.
 * Who? These endpoints can be hit by redux on the front end.
 * When? When a new user signs up or creates a session, the database should change with
 * respect to this action
 * Where? The database is on mlab.com. You can actively see/change data in there.
 * Why? We need a way to add data into the database. This file helps to separate the
 * actual database calls and the API calls from the front end.
 */

import express from 'express';
import data_access from './data_access';
const app = express();

/*
    1. This is a route for the admin dash to get the N most recent tutoring sessions
    2.
*/

app.get('/getRecentSessions', (req, res) => {
    // TO DO: Add method in Session Dao
    //
});

app.get('/onlineTutors', (req, res) => {
    function addActiveSession(tutor) {
        var return_tutor = JSON.parse(JSON.stringify(tutor));
        var getSession = new Promise(function(resolve, reject) {
            data_access.tutor_sessions.getActiveSession(return_tutor._id, function(err, response) {
                if (err) {
                    reject(err);
                } else if (response.length == 0) {
                    return_tutor.session = undefined;
                    return_tutor.has_session = false;
                    resolve(return_tutor);
                } else {
                    return_tutor.session = response[0];
                    return_tutor.has_session = true;
                    resolve(return_tutor);
                }
            });
        });

        return getSession;
    }

    function onTutorsFound(err, tutors) {
        if (err) {
            console.error(err);
            return res.send([]);
        }
        var tutor_promises = tutors.map(addActiveSession);
        Promise.all(tutor_promises).then(function(values) {
            res.send(values);
        }, function(err) {
            console.log(err);
            res.send({
                success: false,
                error_message: err
            });
        });
        return;
    }

    data_access.users.getAllAvailableTutors(req.query.subject, req.query.availability, onTutorsFound);
});

// register a new tutor, ensure that the tutor username and email don't already exist
app.post('/registerTutor', (req, res) => {
    // Add this information to the database
    data_access.users.checkIfUsernameIsTaken(req.body.username, function(err, duplicateUsernameFound){

        //If we find an error querying the database using the api, throw the error
        if (err) {
            console.log(err);
            return;
        }


        if (!duplicateUsernameFound) {

            //Query the database now for email to make sure there are no duplicates as we did for username above
            data_access.users.checkIfEmailIsTaken(req.body.email, function(err, duplicateEmailFound){

                //If we find an error querying the database using the api, throw the error
                if (err) {
                    console.error(err);
                    return;
                }

                //If we could not find an existing user with the same user
                if (!duplicateEmailFound) {
                    data_access.users.createTutor({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        gmail: req.body.gmail,
                        _id: req.body.username,
                        password: req.body.password,
                        profile_picture: '/images/default_user_img.png',
                        join_date: Date.now(),
                        status: true,
                        availability: req.body.availability,
                        approved: false
                    }, function(err, user_instance){
                        if (err) {
                            console.error(err);
                            res.send({
                                success: false,
                                error_message: 'Unknown error'
                            });
                        } else {
                            res.send({
                                success: true,
                                error_message: null
                            });
                        }
                    });
                } else {
                    res.send({
                        success: false,
                        error_message: 'Email already exists'
                    });
                }

            });
        } else {
            res.send({
                success: false,
                error_message: 'Username already exists'
            });
        }
    });
});

/**
 * 1. Purpose: Register a new student. This method is called from StudentSignUpForm.JSX
 * 2. Axios from the frontend file sent the data to here in the parameter req
 * 3. Ensures that the student's username and email do not already exist
 * @param req: This contains the form data sent from the front end. There are a lot of things here. Check the
 *             StudentSignUpForm.jsx to see all of the fields.
 */
app.post('/registerStudent', (req, res) => {

    /**
     * 1. Query the Mongo database to see if the username already exists so we don't overwrite existing users
     * 2. req.body contains all of the fields from the form, including username.
     * 3. CheckIfUserNameIsTaken has two parameters (Username, callback function)
     */

    data_access.users.checkIfUsernameIsTaken(req.body.username,

        //resultUsername is a boolean that represents if a username was found in the database

        function(err, resultUsername){                                  //this function is the callback in user_dao.js

            //If we get an error trying to call a method in user_dao.js, throw it
            if (err) {
                console.log(err);
            }

            //If we could not find the username in the database, then we can create a user with it :)
            if (!resultUsername) {
                console.log(resultUsername);

                //Careful: We are defining this callback function, not extending checkIfEmailIsTaken
                data_access.users.checkIfEmailIsTaken(req.body.email, function(err, resultEmail) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        console.log(resultEmail);
                        if (!resultEmail) {
                            data_access.users.createStudent({
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
                // We found a username that matches this one, so we don't create a new user and overwrite the old one.
                // We alert that the username already exists to the front end!
                res.json({
                    success: false,
                    error_message: 'Username already exists'
                });
            }
        });
});

// update student in database
app.patch('/student', (req, res) => {
    data_access.users.saveStudent(req.body, function(err, resultStudent) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                error_message: 'Update failed'
            });
        }

        res.json({
            success: true,
            error_message: null
        });
    });
});

app.patch('/tutor', (req, res) => {
    data_access.users.saveTutor(req.body, function(err, resultStudent) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                error_message: 'Update failed'
            });
        }

        res.json({
            success: true,
            error_message: null
        });
    });
});

// get subjects from database
app.get('/subjects', (req, res) => {
    data_access.subjects.getAllSubjects(function(err, resSubjects) {
        if (err) {
            console.error(err);
            res.json({
                success: false,
                error_message: 'getting subjects failed'
            });
            res.send([]);
        }
        res.send(resSubjects);
    });
});

// add new subject
app.post('/subjects', (req, res) => {
    data_access.subjects.addSubject(req.body, function(err, resultSubject) {
        if (err) {
            console.error(err);
            return res.json({
                success: false,
                error_message: 'Creating subject failed',
            });
        }

        return res.json({
            success: true,
            error_message: null
        });
    });
});

// when a tutor submits a review, update the session accordingly
app.post('/tutorSubmitReview', (req, res) => {
    let session = {};
    session.update = {};
    session._id = req.body._id;
    session.update.tutor_rating = req.body.rating;
    session.update.tutor_comment = req.body.comment;
    session.update.end_time = req.body.end_time;
    data_access.tutor_sessions.updateTutorSession(session, function(err, response) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            res.json({
                success: true,
                error: null,
                session: response
            });
        }
    });
});

// when a student submits a review, update the session accordingly
app.post('/studentSubmitReview', (req, res) => {
    data_access.tutor_sessions.addStudentReview({_id: req.body._id, update: {'students_attended': req.body.review}}, function(err, response) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            res.json({
                success: true,
                error: null,
                session: response
            });
        }
    });
});

// get all tutoring sessions for a tutor
app.post('/getTutorSessions', (req, res) => {
    data_access.tutor_sessions.getSessionsByTutor(req.body.username, function(err, response) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            res.json({
                success: true,
                error: null,
                sessions: response
            });
        }
    });
});

// get the tutor statistics by username (for now just number of ratings and avg rating)
app.post('/getTutorStats', (req, res) => {
    data_access.tutor_sessions.getTutorAvgRating(req.body.username, function(err, response) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            res.json({
                success: true,
                error: null,
                statistics: response
            });
        }
    });
});

// update the administrator
app.patch('/admin', (req, res) => {
    res.json({
        success: false,
        error_message: 'Update failed because admin dao does not exist yet'
    });
});

export default app;