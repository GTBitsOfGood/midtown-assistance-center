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
const Tutor = require('../models/Tutor');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

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

app.post('/forgotUsername', (req, res) => {
    data_access.users.findUserIdByEmail(req.body.email, (err, user_id) => {
        if (err) {
            return res.send(400, {error: err});
        }

        if (!user_id) {
            return res.send({
                success: false,
                error_message: 'Email does not exist in the system'
            });
        }
        const endpoint =
            req.headers.host +
            (req.headers.port ? `:${req.headers.port}` : '');
        const msg = {
            to: req.body.email,
            from: 'no-reply@mac-tutoring.com',
            subject:
                'MAC Tutoring account username',
            text: `
                Your username is <strong>${user_id}</strong><br>
                Click here to log in, or copy and paste the following URL into your browser: ${endpoint}/home/login
            `,
            html:
                `
                Your username is <strong>${user_id}</strong><br>
                <a href="${endpoint}/home/login">Click here</a> to log in, or copy and paste the following URL into your browser: ${endpoint}/home/login
                `
        };

        sgMail.send(msg);
        return res.send({
            success: true,
            error_message: null
        });
    });

});

app.post('/forgotPassword', (req, res) => {
    data_access.users.findUserType(req.body.email, (err, emailType) => {
        if(err) {
            return res.send(400, {error: err});
        }

        if (!emailType) {
            return res.send({
                success: false,
                error_message: 'Email does not exist in the system'
            });
        }
        const reset_key = Math.random()
            .toString(36)
            .substring(7);
        const endpoint =
            req.headers.host +
            (req.headers.port ? `:${req.headers.port}` : '');
        const msg = {
            to: req.body.email,
            from: 'no-reply@mac-tutoring.com',
            subject:
                'Reset your password for your MAC Tutoring account',
            text:
                `Click here to reset your password for your MAC tutoring account, or copy and paste the following URL into your browser: ${endpoint}/home/resetPassword?reset_key=${reset_key}&email=${req.body.email}`,
            html:
                `Click <a href="${endpoint}/home/resetPassword?reset_key=${reset_key}&email=${req.body.email}">here</a> to reset your password for your MAC tutoring account, or copy and paste the following URL into your browser: <strong>${endpoint}/home/resetPassword?reset_key=${reset_key}&email=${req.body.email}</strong>`
        };

        data_access.users.updateResetKey(req.body.email, reset_key, emailType, (err) => {
            if (err) {
                return res.send({
                    success: false,
                    error_message: 'Unable to add reset key to account'
                });
            }
            sgMail.send(msg);
            return res.send({
                success: true,
                error_message: null
            });
        });
    });
});

app.patch('/resetPassword', (req, res) => {
    const { password, reset_key, email } = req.body;

    data_access.users.getUserByEmail(email, (err, user, userType) => {
        if(err) {
            res.status(400).send({
                error_message: 'Invalid Email, cannot reset password.'
            });
        } else if (user.reset_key == null) {
            res.status(400).json({
                error_message: 'Invalid password change request. Please request a new reset link on the forgot password page.'
            });
        } else if (reset_key !== user.reset_key) {
            res.status(400).json({
                error_message: 'Invalid password change request. Make sure you are using the most recent link sent to your email.'
            });
        } else {
            user.password = encryptPassword(password);
            user.reset_key = null;
            if (userType === 'tutor') {
                data_access.users.saveTutor(user, (err) => {
                    if (err) {
                        res.send({
                            success: false,
                            error_message: 'Error updating user password. Please request a new reset link on the forgot password page.'
                        });
                    } else {
                        res.send({
                            success: true,
                            error_message: null
                        });
                    }
                });
            } else if (userType === 'student') {
                data_access.users.saveStudent(user, (err) => {
                    if (err) {
                        res.send({
                            success: false,
                            error_message: 'Error updating user password. Please request a new reset link on the forgot password page.'
                        });
                    } else {

                        res.send({
                            success: true,
                            error_message: null
                        });
                    }
                });
            } else {
                data_access.users.saveAdmin(user, (err) => {
                    if (err) {
                        res.send({
                            success: false,
                            error_message: 'Error updating user password. Please request a new reset link.'
                        });
                    } else {
                        res.send({
                            success: true,
                            error_message: null
                        });
                    }
                });
            }
        }
    });
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
                        from: 'no-reply@mac-tutoring.com',
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
    const password = encryptPassword(req.body.password);
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
        data_access.access_codes.checkAccessCodeExist(req.body.access_code, (err, resultCode) => {
            if (err) {
                console.log(err);
            }
            if (!resultCode) {
                res.send({
                    success: false,
                    error_message:'Classroom code does not exist'
                });
            }
            else {
                console.log('classroom code EXISTS');
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

// submit report from tutor about a student feedback
app.post('/submitTutorReportOnFeedback', (req, res) => {
    data_access.tutor_sessions.getStudentByRatingId(req.body.rating_id, (err, student_id) => {
        if (err) {
            return res.json(400, {
                success: false,
                error: err
            });
        }
        const ban = {
            reporter: req.body.user_id,
            reporterType: 'tutor',
            personOfInterest: student_id,
            explanation: req.body.explanation
        };

        return data_access.ban.submitReport(ban, (err, response) => {
            if (err) {
                console.log(err);
                return res.json(400, {
                    success: false,
                    error: err
                });
            }
            return res.json({
                success: true,
                error: null
            });
        });
    });
});

// submit report from tutor about a student currently in session
app.post('/submitTutorReportInSession', (req, res) => {
    const ban = {
        reporter: req.body.user_id,
        reporterType: 'tutor',
        personOfInterest: req.body.student_id,
        explanation: req.body.explanation
    };

    return data_access.ban.submitReport(ban, (err, response) => {
        if (err) {
            console.log(err);
            return res.json(400, {
                success: false,
                error: err
            });
        }
        return res.json({
            success: true,
            error: null
        });
    });
});

// submit report from student about a tutor
app.post('/submitStudentReport', (req, res) => {
    const ban = {
        reporter: req.body.user_id,
        reporterType: 'student',
        personOfInterest: req.body.tutor_id,
        explanation: req.body.explanation
    };

    return data_access.ban.submitReport(ban, (err, response) => {
        if (err) {
            console.log(err);
            return res.json(400, {
                success: false,
                error: err
            });
        }
        return res.json({
            success: true,
            error: null
        });
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

app.get('/allPendingBans', (req, res) => {
    const notBanned = {
        banned: false,
        reviewed: false
    };
    data_access.ban.getAllBans(notBanned, (err, bans) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                error: err
            });
        } else {
            console.log('Getting pending bans');
            res.json({
                success: true,
                error: null,
                bans
            });
        }
    });
});

app.get('/allBannedUsers', (req, res) => {
    return data_access.users.getBannedStudents((err, students) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                error: err
            });
        }
        return data_access.users.getBannedTutors((err, tutors) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    error: err
                });
            }
            console.log('Getting bannned users');
            return res.json({
                success: true,
                error: null,
                students,
                tutors
            });
        });
    });
});

app.post('/banUser', (req, res) => {
    data_access.ban.banUser(req.body.ban_id, req.body.banned, (err, ban) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                error: err
            });
        }
        if (!req.body.banned) {
            return res.json({
                success: true,
                error: null,
                ban
            });
        }

        data_access.users.banUser(ban.personOfInterest, (err, newUser) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    error: err
                });
            }
            return res.json({
                success: true,
                error: null,
            });
        });
    });
});

app.post('/unbanStudent', (req, res) => {
    data_access.users.unbanStudent(req.body.student_id, (err, newStudent) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                error: err
            });
        }
        return res.json({
            success: true,
            error: null
        });
    });
});

app.post('/unbanTutor', (req, res) => {
    data_access.users.unbanTutor(req.body.tutor_id, (err, newTutor) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                error: err
            });
        }
        return res.json({
            success: true,
            error: null
        });
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

app.get('/schools', (req, res) => {
    data_access.schools.getAllSchools((err, response) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error:err});
        } else{
            console.log('Getting all schools');
            res.send(response);
        }
    });
});

app.post('/schools', (req, res) => {
    const schoolCodeValue = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    // TODO: validation that the school_code does not already exist
    data_access.schools.addSchool(
        {
            school_name: req.body.school_name,
            school_code: schoolCodeValue,
            address: {
                street: req.body.street,
                zip_code: req.body.zip_code,
                state: req.body.state
            }
        }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({success: false, error: err});
            } else {
                console.log('Adding school...');
                res.json({ success: true, school: response});
            }
        });
});

app.post('/accessCodes', (req, res) => {
    const accessCodeValue = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    // TODO: validation that accessCodeValue hasn't already been generated/taken
    // data_access.access_codes.validateAccessCode(accessCodeValue);

    data_access.schools.verifySchoolCodeExists(req.body.school_code, (err, resultSchoolCode) => {
        if (err || !resultSchoolCode) {
            console.log(err);
            return res.json(400, {success: false, error: err});
        }
        return data_access.access_codes.addAccessCode({
            access_code: accessCodeValue,
            school_code: req.body.school_code,
            name: req.body.name
        }, (err, resultAccessCode) => {
            if (err) {
                console.log(err);
                return res.json(400, {success: false, error: err});
            }
            return res.json({
                success: true,
                accessCode: resultAccessCode
            });
        });
    });
});

// returns all access codes if req param is empty,
// else returns all access codes for a specific school
app.get('/accessCodes', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        data_access.access_codes.getAllAccessCodes((err, response) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Getting all access codes');
                res.send(response);
            }
        });
    } else {
        data_access.access_codes.getAccessCodesForSchool(req.query.school_code, (err, response) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Getting all access codes for school');
                console.log(req.query);
                res.send(response);
            }
        });
    }

});

app.get('/schoolsAndAccessCodes', (req, res) => data_access.schools.getAllSchools((err, response) => {
    if (err) {
        console.log(err);
        return res.json({success: false, error: err});
    }
    data_access.access_codes.getAccessCodesForSchool(response, (err, result) => {
        console.log(result);
        return res.send({success: true, filteredCodes: result});
    });
}));

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
});

app.post('/getPendingRequestsByStudent', (req, res) => {
    data_access.tutor_session_requests.getPendingRequestsByStudent(req.body.student_id, (err, response) => {
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
});

app.post('/getPendingRequestsByTutorAndStudent', (req, res) => {
    data_access.tutor_session_requests.getPendingRequestsByTutorAndStudent(req.body.data, (err, response) => {
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
});

app.post('/updateSessionRequest', (req, res) => {
    data_access.tutor_session_requests.updateRequest(
        req.body,
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
                    sessionRequest: response
                });
            }
        }
    );
});

app.post('/cancelStudentRequests', (req, res) => {
    data_access.tutor_session_requests.cancelAllStudentRequests(
        req.body.student_id,
        (err) => {
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
                });
            }
        }
    );
});


export default app;
