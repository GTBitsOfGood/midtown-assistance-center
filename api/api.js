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
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
        let return_tutor = JSON.parse(JSON.stringify(tutor));
        let getSession = new Promise(function(resolve, reject) {
            data_access.tutor_sessions.getActiveSession(
                return_tutor._id,
                function(err, response) {
                    if (err) {
                        reject(err);
                    } else if (response.length === 0) {
                        return_tutor.session = undefined;
                        return_tutor.has_session = false;
                        resolve(return_tutor);
                    } else {
                        return_tutor.session = response[0];
                        return_tutor.has_session = true;
                        resolve(return_tutor);
                    }
                }
            );
        });

        return getSession;
    }

    function onTutorsFound(err, tutors) {
        if (err) {
            console.error(err);
            return res.send([]);
        }
        let tutor_promises = tutors.map(addActiveSession);
        Promise.all(tutor_promises).then(
            function(values) {
                res.send(values);
            },
            function(err) {
                console.log(err);
                res.send({
                    success: false,
                    error_message: err
                });
            }
        );
        return;
    }

    data_access.users.getAllAvailableTutors(
        req.query.subject,
        req.query.availability,
        onTutorsFound
    );
});

// register a new tutor, ensure that the tutor username and email don't already exist
app.post('/registerTutor', (req, res) => {
    // Add this information to the database
    data_access.users.checkIfUsernameIsTaken(req.body.username, function(
        err,
        resultUsername
    ) {
        if (err) {
            console.log(err);
        }
        if (!resultUsername) {
            console.log(resultUsername);
            data_access.users.checkIfEmailIsTaken(req.body.email, function(
                err,
                resultEmail
            ) {
                if (err) {
                    console.log(err);
                } else {
                    if (!resultEmail) {
                        let confirm_key = Math.random()
                            .toString(36)
                            .substring(7);
                        let endpoint =
                            req.headers.host +
                            (req.headers.port ? ':' + req.headers.port : '');
                        data_access.users.createTutor(
                            {
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
                                approved: false,
                                confirmed: false,
                                confirm_key: confirm_key
                            },
                            function(err, user_instance) {
                                if (err) {
                                    console.log(err);
                                    res.send({
                                        success: false,
                                        error_message: 'Unknown error'
                                    });
                                } else {
                                    const msg = {
                                        to: req.body.email,
                                        from: 'mac@mactutoring.com',
                                        subject:
                                            'Confirm your MAC Tutoring account',
                                        text:
                                            'Click here to confirm your MAC tutoring account ' +
                                            endpoint +
                                            '/api/confirmEmail?confirm_key=' +
                                            confirm_key +
                                            '&tutor_id=' +
                                            req.body.username,
                                        html:
                                            'Click here to confirm your MAC tutoring account <strong>' +
                                            endpoint +
                                            '/api/confirmEmail?confirm_key=' +
                                            confirm_key +
                                            '&tutor_id=' +
                                            req.body.username +
                                            '</strong>'
                                    };
                                    sgMail.send(msg);
                                    res.send({
                                        success: true,
                                        error_message: null
                                    });
                                }
                            }
                        );
                    } else {
                        res.send({
                            success: false,
                            error_message: 'Email already exists'
                        });
                    }
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
    //Add this information to the database
    console.log(req.body);
    data_access.users.checkIfUsernameIsTaken(req.body.username, function(
        err,
        resultUsername
    ) {
        if (err) {
            console.log(err);
        }
        if (!resultUsername) {
            console.log(resultUsername);
            data_access.users.checkIfEmailIsTaken(req.body.email, function(
                err,
                resultEmail
            ) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(resultEmail);
                    if (!resultEmail) {
                        data_access.users.createStudent(
                            {
                                first_name: req.body.firstName,
                                last_name: req.body.lastName,
                                email: req.body.email,
                                _id: req.body.username,
                                password: req.body.password,
                                join_date: Date.now(),
                                classroom: req.body.access_code,
                                grade_level: req.body.grade_level
                            },
                            function(err, user_instance) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send({
                                        success: true,
                                        error_message: null
                                    });
                                }
                            }
                        );
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
});

app.get('/confirmEmail', (req, res) => {
    let confirm_key = req.query.confirm_key;
    let tutor_id = req.query.tutor_id;
    data_access.users.confirmEmail(
        { _id: tutor_id, confirm_key: confirm_key },
        function(err, resultTutor) {
            if (err) {
                console.error(err);
                return res.json({
                    success: false,
                    error_message: 'Error confirming email'
                });
            }
            if (resultTutor.length === 0) {
                return res.json({
                    success: false,
                    error_message: 'Failed to confirm tutor, no tutor found'
                });
            } else {
                return res.json({
                    success: true,
                    error_message: null,
                    message: 'Successfully confirmed email'
                });
            }
        }
    );
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
            error_message: null,
            student: resultStudent
        });
    });
});

// update tutor in database
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
            error_message: null,
            tutor: resultStudent
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
                error_message: 'Creating subject failed'
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
    data_access.tutor_sessions.updateTutorSession(session, function(
        err,
        response
    ) {
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

// endpoint to forcefully end tutor session on logout
app.post('/endTutorSession', (req, res) => {
    let data = {};
    data.update = {};
    data._id = req.body._id;
    data.update.end_time = new Date();
    data_access.tutor_sessions.updateTutorSession(data, function(
        err,
        response
    ) {
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

// when a student joins a session, add them
app.post('/addStudentToSession', (req, res) => {
    data_access.tutor_sessions.addStudentReview(
        { _id: req.body._id, update: { students_attended: req.body.review } },
        function(err, response) {
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
        }
    );
});

// when a student requests to join the session, add the request
app.post('/addJoinRequest', (req, res) => {
    data_access.tutor_sessions.addJoinRequest(
        { _id: req.body._id, update: { join_requests: req.body.join_request } },
        function(err, response) {
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
        }
    );
});

// when a tutor updates a join request (accept/deny), update it in the db
app.post('/updateJoinRequest', (req, res) => {
    data_access.tutor_sessions.updateJoinRequest(
        { _id: req.body._id, update: { join_requests: req.body.join_request } },
        function(err, response) {
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
        }
    );
});

// when a student joins a session for the first time, submit a review, update the session accordingly
app.post('/studentSubmitReview', (req, res) => {
    data_access.tutor_sessions.addStudentReview(
        { _id: req.body._id, update: { students_attended: req.body.review } },
        function(err, response) {
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
        }
    );
});

// when a student submits a review, update the review in the session accordingly
app.post('/studentUpdateReview', (req, res) => {
    data_access.tutor_sessions.updateStudentReview(
        { _id: req.body._id, update: { students_attended: req.body.review } },
        function(err, response) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    error: err
                });
            } else {
                console.log(response);
                res.json({
                    success: true,
                    error: null,
                    session: response
                });
            }
        }
    );
});

app.post('/getTutorSession', (req, res) => {
    console.log(req.body._id);
    data_access.tutor_sessions.getSessionByTutor(req.body._id, function(
        err,
        response
    ) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                link: false,
                error: err
            });
        }
        return res.json({
            success: true,
            session: response[0],
            link: response[0] ? response[0].hangouts_link : '',
            id: response[0] ? response[0].eventId : ''
        });
    });
});

// get all tutoring sessions for a tutor
app.post('/getTutorSessions', (req, res) => {
    data_access.tutor_sessions.getSessionsByTutor(req.body.username, function(
        err,
        response
    ) {
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
    data_access.tutor_sessions.getTutorAvgRating(req.body.username, function(
        err,
        response
    ) {
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

app.get('/unapprovedTutors', (req, res) => {
    data_access.users.getUnapprovedTutors(function(err, response) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            console.log(err);
            res.json({
                success: true,
                error: null,
                tutors: response
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

// check if a tutor has an active session
app.post('/checkActiveSession', (req, res) => {
    console.log(req.body.username);
    data_access.tutor_sessions.getActiveSession(req.body.username, function(
        err,
        response
    ) {
        if (err) {
            res.json({
                success: false,
                error: err
            });
        } else if (response.length === 0) {
            console.log(response);
            res.json({
                success: true,
                error: null,
                has_open_session: false
            });
        } else {
            console.log(response);
            res.json({
                success: true,
                error: null,
                has_open_session: true,
                session: response[0]
            });
        }
    });
});

export default app;
