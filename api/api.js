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
const bcrypt = require('bcrypt');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function encryptPassword(password) {
    const hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    return hash;
}

/*
    1. This is a route for the admin dash to get the N most recent tutoring sessions
    2.
*/

app.get('/getRecentSessions', (req, res) => {
    // TO DO: Add method in Session Dao
    //
});

app.get('/onlineTutors', (req, res) => {
    data_access.users.getAllAvailableTutors(req.query.subject, req.query.availability, (err, tutors) => {
        if (err) {
            console.error(err);
            return res.send([]);
        }
        const tutor_promises = tutors.map(tutor => {
            const format_tutor = JSON.parse(JSON.stringify(tutor));
            const getSession = new Promise((resolve, reject) => {
                data_access.tutor_sessions.getActiveSession(tutor._id, (err, response) => {
                    if (err) {
                        reject(err);
                    } else if (response.length === 0) {
                        resolve({ ...format_tutor, session: undefined, has_session: false });
                    } else {
                        resolve({ ...format_tutor, session: response[0], has_session: true });
                    }
                });
            });

            return getSession;
        });
        Promise.all(tutor_promises).then(
            (values) => {
                res.send(values);
            },
            (err) => {
                console.log(err);
                res.send({
                    success: false,
                    error_message: err
                });
            }
        );
        return null;
    });
});

// register a new tutor, ensure that the tutor username and email don't already exist
app.post('/registerTutor', (req, res) => {
    // Add this information to the database
    const password = encryptPassword(req.body.password);
    data_access.users.checkIfUsernameIsTaken(req.body.username, (err,resultUsername) => {
        if (err) {
            console.log(err);
            return res.send(400, { error: err });
        }
        if (resultUsername) {
            return res.send({
                success: false,
                error_message: 'Username already exists'
            });
        }
        console.log(resultUsername);
        data_access.users.checkIfEmailIsTaken(req.body.email, (err, resultEmail) => {
            if (err) {
                console.log(err);
                return res.send(400, {error: err});
            }
            if (resultEmail) {
                return res.send({
                    success: false,
                    error_message: 'Email already exists'
                });
            }
            const confirm_key = Math.random()
                .toString(36)
                .substring(7);
            const endpoint =
                req.headers.host +
                (req.headers.port ? `:${req.headers.port}` : '');
            data_access.users.createTutor(
                {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    email: req.body.email,
                    gmail: req.body.gmail,
                    _id: req.body.username,
                    password,
                    profile_picture: '/images/default_user_img.png',
                    join_date: Date.now(),
                    status: true,
                    availability: req.body.availability,
                    approved: false,
                    confirmed: false,
                    confirm_key
                }, (err, user_instance) => {
                    if (err) {
                        console.log(`user instance ${  err}`);
                        return res.send(400, {
                            success: false,
                            error_message: 'Did not create tutor'
                        });
                    }
                    const msg = {
                        to: req.body.email,
                        from: 'mac@mactutoring.com',
                        subject:
                            'Confirm your MAC Tutoring account',
                        text:
                            `Click here to confirm your MAC tutoring account ${endpoint}/api/confirmEmail?confirm_key=${confirm_key}&tutor_id=${req.body.username}`,
                        html:
                            `Click here to confirm your MAC tutoring account <strong>${endpoint}/api/confirmEmail?confirm_key=${confirm_key}&tutor_id=${req.body.username}</strong>`
                    };
                    sgMail.send(msg);
                    return res.send({
                        success: true,
                        error_message: null
                    });
                }
            );
        });
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
    // Add this information to the database
    const password = encryptPassword(password);
    data_access.users.checkIfUsernameIsTaken(req.body.username, (err,resultUsername) => {
        if (err) {
            console.log(err);
        }
        if (resultUsername) {
            return res.json({
                success: false,
                error_message: 'Username already exists'
            });

        }
        console.log(resultUsername);
        data_access.users.checkIfEmailIsTaken(req.body.email, (
            err,
            resultEmail
        ) => {
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
                            password,
                            join_date: Date.now(),
                            classroom: req.body.access_code,
                            grade_level: req.body.grade_level
                        },
                        (err, user_instance) => {
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

    });
});

app.post('/newAdmin', (req, res) => {
    const newAdmin = req.body.newAdmin;

    data_access.users.checkIfUsernameIsTaken(newAdmin._id, (
        err,
        resultUsername
    ) => {
        if (err) {
            console.log('check username error:', err);
        } else if (!resultUsername) {
            data_access.users.checkIfEmailIsTaken(newAdmin.email, (
                err,
                resultEmail
            ) => {
                if (err) {
                    console.log('check email error:', err);
                } else if (!resultEmail) {
                    newAdmin.password = encryptPassword(newAdmin.password);
                    data_access.users.createAdmin(newAdmin, (
                        err,
                        user_instance
                    ) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(
                                'created new admin',
                                newAdmin._id
                            );
                            res.send({
                                success: true,
                                error_message: null
                            });
                        }
                    });
                } else {
                    console.log('Email exists');
                    res.status(400).json({
                        success: false,
                        error_message: 'Email already exists'
                    });
                }
            });
        } else {
            console.log('Username exists');
            res.status(400).json({
                success: false,
                error_message: 'Username already exists'
            });
        }
    });
});

app.get('/confirmEmail', (req, res) => {
    const confirm_key = req.query.confirm_key;
    const tutor_id = req.query.tutor_id;
    data_access.users.confirmEmail(
        { _id: tutor_id, confirm_key },
        (err, resultTutor) => {
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
            } 
            return res.json({
                success: true,
                error_message: null,
                message: 'Successfully confirmed email'
            });
            
        }
    );
});

// update student in database
app.patch('/student', (req, res) => {
    data_access.users.saveStudent(req.body, (err, resultStudent) => {
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
    data_access.users.saveTutor(req.body, (err, resultStudent) => {
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
    data_access.subjects.getAllSubjects((err, resSubjects) => {
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

/**
  * @param req: body json to contain only one key-value item:
 *              { _id: subject_name_here }
 */
app.post('/subjects', (req, res) => {
    data_access.subjects.addSubject(req.body, (err, resultSubject) => {
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
    const session = {};
    session.update = {};
    session._id = req.body._id;
    session.update.tutor_rating = req.body.rating;
    session.update.tutor_comment = req.body.comment;
    session.update.end_time = req.body.end_time;
    data_access.tutor_sessions.updateTutorSession(session, (
        err,
        response
    ) => {
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
    const data = {};
    data.update = {};
    data._id = req.body._id;
    data.update.end_time = new Date();
    data_access.tutor_sessions.updateTutorSession(data, (
        err,
        response
    ) => {
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
        (err, response) => {
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
        (err, response) => {
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
        (err, response) => {
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
        (err, response) => {
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
        (err, response) => {
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
    data_access.tutor_sessions.getSessionByTutor(req.body._id, (
        err,
        response
    ) => {
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
    data_access.tutor_sessions.getSessionsByTutor(req.body.username, (
        err,
        response
    ) => {
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
    data_access.tutor_sessions.getTutorAvgRating(req.body.username, (
        err,
        response
    ) => {
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
    data_access.users.getUnapprovedTutors((err, response) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            console.log('Getting unapproved tutors');
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
    data_access.tutor_sessions.getActiveSession(req.body.username, (
        err,
        response
    ) => {
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

app.get('/allTutors', (req, res) => {
    data_access.users.getAllTutors((err, response) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err });
        } else {
            console.log('Getting all tutors');
            res.json({
                success: true,
                error: null,
                tutors: response
            });
        }
    });
});

// TUTOR SESSION REQUESTS

app.post('/createSessionRequest', (req, res) => {
    data_access.tutor_session_requests.addSessionRequest(req.body.sessionRequest, (err, response) => {
        if (err) {
            console.log(err);
            res.json({success: false, error:err});
        } else {
            res.json({
                success: true,
                error: null,
                sessionRequest: response
            });
        }
    });
});

app.post('/getPendingRequests', (req, res) => {
    data_access.tutor_session_requests.getPendingRequestsByTutor(req.body._id, (err, response) => {
        if (err) {
            console.log(err);
            res.json({success:false, error:err});
        } else {
            res.json({
                success:true,
                error:null,
                docs:response
            });
        }
    });
})


export default app;
