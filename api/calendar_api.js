/**
 * @file
 * calendar_api.js
 *
 * @fileoverview
 * Routes to handle events using the google calendar API
 *
 * @type {*|createApplication}
 */
var express = require('express');
var app = express();
var google = require('./google_hangouts.js');
var moment = require('moment');
import data_access from './data_access';

/**
 * Add a calendar ACL Role. This route is used
 * to make the tutor an co-owner of their calendar
 * when they sign up.
 */
app.post('/addCalendarACL', function(req, res) {
    let tutorId = req.body.id;
    let email = req.body.email;
    let calendarId = req.body.calendarId;
    google.auth.refreshAccessToken(function(err, token) {
        if (err) {
            res.send({
                success: false,
                payload: null,
                error: err
            });
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        google.auth.credentials = token;
        google.calendar.acl.insert(
            {
                auth: google.auth,
                calendarId: calendarId,
                resource: {
                    role: 'owner',
                    scope: {
                        type: 'user',
                        value: email
                    }
                }
            },
            function(err, r) {
                if (err) {
                    res.send({
                        success: false,
                        payload: null,
                        error: err
                    });
                    return;
                } else {
                    res.send({
                        success: true
                    });
                }
            }
        );
    });
});

/**
 * Create a new google calendar. This is used to create a new
 * calendar for the tutor during sign up.
 */
app.post('/createNewCalendar', function(req, res) {
    let tutorId = req.body.id;
    let email = req.body.email;
    google.auth.refreshAccessToken(function(err, token) {
        if (err) {
            console.log('error1');
            res.send({
                success: false,
                payload: null,
                error: err
            });
            console.log('Error while trying to retrieve access token', err);
            console.log('hi');
            return;
        }
        google.auth.credentials = token;
        google.calendar.calendars.insert(
            {
                auth: google.auth,
                resource: {
                    summary: tutorId + '_cal',
                    timeZone: 'America/New_York'
                }
            },
            function(error, response) {
                if (error) {
                    res.send({
                        success: false,
                        payload: null,
                        error: error
                    });
                    console.log('error inserting calendar');
                    console.log(error);
                    return;
                }

                let calId = response.id;
                // code to update the tutor db with the calendar for the tutor
                data_access.users.getUser(tutorId, function(err, tutor) {
                    if (err) {
                        res.send({
                            success: false,
                            payload: null,
                            error: error
                        });
                        return;
                    }

                    // Update the tutor with the calendar id that was just created for him
                    tutor.calendarId = calId;
                    data_access.users.saveTutor(tutor, function(
                        err,
                        updatedTutor
                    ) {
                        if (err) {
                            res.send({
                                success: false,
                                payload: null,
                                error: error
                            });
                            return;
                        }
                        res.send({
                            success: true,
                            calId: calId,
                            payload: updatedTutor
                        });
                    });
                });
            }
        );
    });
});

/**
 * Create a new calendar event. This is used when the tutor
 * starts a tutoring session.
 */
app.post('/createEvent', function(req, res) {
    let tutorId = req.body.tutorId;
    let calId = req.body.calId;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let tutorEmail = req.body.email;
    let sessionRequestBody = req.body.sessionRequestBody;
    let _id = sessionRequestBody._id;

    let currDateStart = moment();
    currDateStart.hour(startTime.split(':')[0]);
    currDateStart.minute(startTime.split(':')[1]);

    let currDateEnd = moment();
    currDateEnd.hour(endTime.split(':')[0]);
    currDateEnd.minute(endTime.split(':')[1]);

    let startDateString = currDateStart.format('YYYY-MM-DDTHH:mm:ss');
    let endDateString = currDateEnd.format('YYYY-MM-DDTHH:mm:ss');

    // First check if a session already exists for that time and if so, return
    // the session instead of creating a new one. If not, the add_new_session
    // function will create a new calendar event and tutor session object.
    var check_event_exists = new Promise(function(resolve, reject) {
        data_access.tutor_sessions.getSessionByTutor(_id, function(
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
                reject(err);
            } else if (response.length > 0) {
                resolve(true);
                return res.json({
                    success: true,
                    session: response[0],
                    link: response[0].hangouts_link,
                    id: response[0].eventId
                });
            } else {
                resolve(false);
            }
        });
    });

    check_event_exists.then(
        function(value) {
            add_new_session(value);
        },
        function(error) {
            console.log(error);
        }
    );

    function add_new_session(add_calendar) {
        if (add_calendar) {
            return;
        }
        google.auth.refreshAccessToken(function(err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                res.json({
                    success: false,
                    link: false,
                    error: err
                });
                return;
            }
            google.auth.credentials = token;

            google.calendar.events.insert(
                {
                    auth: google.auth,
                    calendarId: calId,
                    resource: {
                        summary: 'tutor session',
                        attendees: [
                            {
                                email: tutorEmail,
                                additionalGuests: 8
                            }
                        ],
                        start: {
                            dateTime: startDateString,
                            timeZone: 'America/New_York'
                        },
                        end: {
                            dateTime: endDateString,
                            timeZone: 'America/New_York'
                        },
                        anyoneCanAddSelf: true,
                        visibility: 'public',
                        organizer: {
                            email: tutorEmail
                        },
                        creator: {
                            email: tutorEmail
                        },
                        guestsCanInviteOthers: true,
                        guestsCanModify: true,
                        hangoutLink: tutorId + startDateString + endDateString,
                        conferenceDataVersion: 1,
                        conferenceData: {
                            conferenceSolution: {
                                name:
                                    tutorId +
                                    startDateString +
                                    endDateString +
                                    '_tutor_session',
                                key: {
                                    type: 'eventHangout'
                                }
                            },
                            createRequest: {
                                conferenceSolutionKey: {
                                    type: 'eventHangout'
                                }
                            }
                        }
                    }
                },
                function(err, response) {
                    if (err) {
                        res.json({
                            success: false,
                            link: false,
                            error: err
                        });
                        return;
                    }

                    // code to update the tutor db with the hangout link for the tutor
                    data_access.users.getUser(tutorId, function(err, tutor) {
                        if (err) {
                            res.send({
                                success: false,
                                payload: null,
                                error: error
                            });
                            return;
                        }

                        // Update the tutor with the hangout link that was just created for him
                        tutor.tutoringEventId = response.id;

                        data_access.users.saveTutor(tutor, function(
                            err,
                            updatedTutor
                        ) {
                            if (err) {
                                res.send({
                                    success: false,
                                    payload: null,
                                    error: error
                                });
                                return;
                            }
                            console.log(response);
                        });

                        sessionRequestBody['hangouts_link'] =
                            response.hangoutLink;
                        sessionRequestBody['eventId'] = response.id;
                        data_access.tutor_sessions.addSession(
                            sessionRequestBody,
                            function(err, resultSession) {
                                if (err) {
                                    console.error(err);
                                    return res.json({
                                        success: false,
                                        error_message: 'Creating session failed'
                                    });
                                }
                                return res.json({
                                    success: true,
                                    error_message: null,
                                    session: resultSession,
                                    link: resultSession.hangouts_link,
                                    id: resultSession.eventId,
                                    error: null
                                });
                            }
                        );
                    });
                }
            );
        });
    }
});

/**
 * Get the google hangouts link for an event. This function
 * may not be necessary anymore since the hangouts link
 * is part of the tutor session object.
 */
app.post('/studentGetHangoutLink', function(req, res) {
    let eventId = req.body.eventId;
    let email = req.body.email;
    let calendarId = req.body.calendarId;

    google.auth.refreshAccessToken(function(err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            res.json({
                success: false,
                link: false,
                error: err
            });
            return;
        }
        google.auth.credentials = token;

        google.calendar.events.get(
            {
                auth: google.auth,
                calendarId: calendarId,
                eventId: eventId
            },
            function(err, response) {
                let attend = response.attendees;
                attend.push({ email: email });
                google.calendar.events.update(
                    {
                        auth: google.auth,
                        calendarId: calendarId,
                        eventId: eventId,
                        resource: {
                            start: response.start,
                            end: response.end,
                            attendees: attend
                        }
                    },
                    function(err, response) {
                        if (err) {
                            res.send({
                                success: false,
                                payload: null,
                                error: err
                            });
                            return;
                        }

                        res.json({
                            success: true,
                            link: response.hangoutLink,
                            error: null
                        });
                    }
                );
            }
        );
    });
});

/**
 * End the calendar event. This is used to end the event
 * once the tutor ends the session.
 */
app.post('/endCalendarEvent', function(req, res) {
    let tutorId = req.body.tutorId;
    data_access.users.getUser(tutorId, function(err, tutor) {
        if (err) {
            res.send({
                success: false,
                payload: null,
                error: error
            });
            return;
        }
        let eventId = tutor.tutoringEventId;
        let calendarId = tutor.calendarId;

        tutor.tutoringEventId = '';

        data_access.users.saveTutor(tutor, function(err, updatedTutor) {
            if (err) {
                res.send({
                    success: false,
                    payload: null,
                    error: error
                });
                return;
            }

            google.calendar.events.delete(
                {
                    auth: google.auth,
                    calendarId: calendarId,
                    eventId: eventId
                },
                function(err, response) {
                    if (err) {
                        res.send({
                            success: false,
                            payload: null,
                            error: error
                        });
                        return;
                    }

                    res.send({
                        success: true,
                        payload: null,
                        error: null
                    });
                }
            );
        });
    });
});

export default app;
