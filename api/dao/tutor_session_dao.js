/**
 * @file
 * tutor_session_dao.js
 *
 * @fileoverview
 * Data access functions for Tutor Session objects
 */
import moment from 'moment';

const TutorSession = require('../../models/TutorSession.js');
const Tutor = require('../../models/Tutor.js');

/**
 * find the sum of all ratings among all tutor sessions
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumRatings(accumulator, currentValue) {
    let rating = currentValue.getRating();
    return (
        accumulator +
        (rating == null ? 0 : rating * currentValue.getNumRatings())
    );
}

/**
 * find the total number of ratings among all tutor sessions
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function numRatings(accumulator, currentValue) {
    return accumulator + currentValue.getNumRatings();
}

/**
 * find the total discrepancy between expected start and end times of sessions
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumSessionDiscrepancy(accumulator, currentValue) {
    return (
        accumulator.expected_end_time -
        accumulator.end_time -
        (accumulator.start_time - accumulator.expected_start_time) +
        currentValue
    );
}

/**
 * find the total sum of session durations
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumSessionTimes(accumulator, currentValue) {
    return accumulator + currentValue.getDuration();
}

/**
 * get the comment and the rating from a tutor session document
 * @param doc
 * @returns {{comment: tutor_comment|{type, required}|*, rating: *|tutor_rating|{type, required}}}
 */
function getComments(doc) {
    return { comment: doc.tutor_comment, rating: doc.tutor_rating };
}

module.exports = {
    /**
     * Get all the tutor sessions for the previous month
     * @param session: {}
     * @param callback
     * @author RM
     */

    getTutorSessions: function(session, callback) {
        //Get Today's date
        let d = new Date();
        let m = d.getMonth();
        d.setMonth(d.getMonth() - 1);

        //Get Start date for sessions 1 month prior
        let oneMonthAgoDate = d;

        //TO DO: Query the TutorSessionDao to get all sessions 1 month ago
        //Look at http://mongoosejs.com/docs/queries.html

        TutoringSessionsList = TutorSession.find()
            .where('start_time')
            .gt(oneMonthAgoDate);

        //Return the list of tutor sessions

        return TutoringSessionsList;
    },

    /**
     * add a tutor session object
     * @param session
     * @param callback
     */
    addSession: function(session, callback) {
        TutorSession.create(session, function(err, session_instance) {
            if (err) {
                console.error(
                    'Error creating a new session AND THIS IS WHY DUDE:',
                    err
                );
                callback(err);
                return;
            } else {
                callback(null, session_instance);
            }
        });
    },

    /**
     * update the tutor session object if a tutor review is added
     * @param session the session object (must contain _id: the session id,
     * update: the new info)
     * @param callback
     */
    updateTutorSession: function(session, callback) {
        TutorSession.findOneAndUpdate(
            {
                '_id.tutor_id': session._id.tutor_id,
                '_id.expected_start_time': session._id.expected_start_time
            },
            { $set: session.update },
            { new: true },
            function(err, updatedSession) {
                if (err) {
                    console.log('Error saving session');
                    return callback(err);
                }
                callback(null, updatedSession);
            }
        );
    },

    /**
     * add a student review to the session
     * @param session the session object (must contain _id: the session id,
     * update: the new info)
     * @param callback
     */
    addStudentReview: function(session, callback) {
        TutorSession.findOneAndUpdate(
            {
                '_id.tutor_id': session._id.tutor_id,
                '_id.expected_start_time': session._id.expected_start_time,
                'students_attended.student_id': {
                    $ne: session.update.students_attended.student_id
                }
            },
            { $push: session.update },
            { new: true },
            function(err, updatedSession) {
                if (err) {
                    console.log('Error saving session');
                    callback(err);
                    return;
                }
                callback(null, updatedSession);
            }
        );
        let new_stat = 0;
        module.exports.getTutorAvgRating(session._id.tutor_id, function(
            err,
            res
        ) {
            if (err) {
                console.error(err);
                callback(err);
                return;
            }
            new_stat = res;
            Tutor.findOne({ _id: session._id.tutor_id }, function(err, tutor) {
                if (err) {
                    console.error(err);
                }
                tutor.rating = new_stat.avgRating;
                tutor.num_ratings = new_stat.totalRatings;
                tutor.num_sessions = new_stat.totalSessions;
                tutor.save(function(err) {
                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                });
                console.log(tutor);
            });
        });
    },

    /**
     * Update a student's current review
     * @param session the session object (must contain _id: the session id,
     * update: the new info)
     * @param callback
     */
    updateStudentReview: function(session, callback) {
        TutorSession.findOneAndUpdate(
            {
                '_id.tutor_id': session._id.tutor_id,
                '_id.expected_start_time': session._id.expected_start_time,
                'students_attended.student_id':
                    session.update.students_attended.student_id
            },
            {
                $set: {
                    'students_attended.$.student_rating':
                        session.update.students_attended.student_rating,
                    'students_attended.$.student_comment':
                        session.update.students_attended.student_comment
                }
            },
            { new: true },
            function(err, updatedSession) {
                if (err) {
                    console.log('Error saving session');
                    callback(err);
                    return;
                }
                callback(null, updatedSession);
            }
        );
        let new_stat = 0;
        module.exports.getTutorAvgRating(session._id.tutor_id, function(
            err,
            res
        ) {
            if (err) {
                console.error(err);
                callback(err);
                return;
            }
            new_stat = res;
            Tutor.findOne({ _id: session._id.tutor_id }, function(err, tutor) {
                if (err) {
                    console.error(err);
                    callback(err);
                    return;
                }
                tutor.rating = new_stat.avgRating;
                tutor.num_ratings = new_stat.totalRatings;
                tutor.num_sessions = new_stat.totalSessions;
                tutor.save(function(err) {
                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                });
                console.log(tutor);
            });
        });
    },

    /**
     * add a student join request to the session
     * @param session the session object (must contain _id: the session id,
     * update: the new info)
     * @param callback
     */
    addJoinRequest: function(session, callback) {
        TutorSession.findOneAndUpdate(
            {
                '_id.tutor_id': session._id.tutor_id,
                '_id.expected_start_time': session._id.expected_start_time,
                'join_requests.student_id': {
                    $ne: session.update.join_requests.student_id
                }
            },
            { $push: session.update },
            { new: true },
            function(err, updatedSession) {
                if (err) {
                    console.log('Error saving session');
                    callback(err);
                    return;
                }
                callback(null, updatedSession);
            }
        );
    },

    /**
     * Update the join request once a tutor approves/denies it
     * @param session
     * @param callback
     */
    updateJoinRequest: function(session, callback) {
        TutorSession.findOneAndUpdate(
            {
                '_id.tutor_id': session._id.tutor_id,
                '_id.expected_start_time': session._id.expected_start_time,
                'join_requests.student_id':
                    session.update.join_requests.student_id
            },
            {
                $set: {
                    'join_requests.$.status':
                        session.update.join_requests.status,
                    'join_requests.$.tutor_comment':
                        session.update.join_requests.tutor_comment
                }
            },
            { new: true },
            function(err, updatedSession) {
                if (err) {
                    console.log('Error saving session');
                    callback(err);
                    return;
                }
                callback(null, updatedSession);
            }
        );
    },

    /**
     * get all of the sessions that the tutor has been a part of
     * @param username the id of the tutor
     * @param callback
     */
    getSessionsByTutor: (username, callback) => {
        TutorSession.find({ '_id.tutor_id': username }, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            const new_docs = [ ...docs ];
            docs.forEach((doc, ind) => {
                new_docs[ind].rating = docs[ind].getRating();
            });
            callback(null, new_docs);
        });
    },

    /**
     * get a particular session for a tutor
     * @param data: contains the tutor id and the start time of the session
     * @param callback
     */
    getSessionByTutor: function(data, callback) {
        TutorSession.find(
            {
                '_id.tutor_id': data.tutor_id,
                '_id.expected_start_time': data.expected_start_time
            },
            function(err, docs) {
                if (err) {
                    console.log(err);
                    callback(err);
                    return;
                } else {
                    callback(null, docs);
                }
            }
        );
    },

    /**
     * rank tutors
     * @param callback
     */
    rankTutorsByRating: function(callback) {
        console.log('rank tutors');
        // TODO: rank tutors function
    },

    /**
     * get the average rating for the tutor and the total number of ratings
     * @param username
     * @param callback
     */
    getTutorAvgRating: function(username, callback) {
        function sumRatings(accumulator, currentValue) {
            let rating = currentValue.getRating();
            return (
                accumulator +
                (rating == null ? 0 : rating * currentValue.getNumRatings())
            );
        }

        function numRatings(accumulator, currentValue) {
            return accumulator + currentValue.getNumRatings();
        }
        TutorSession.find({ '_id.tutor_id': username }, function(err, docs) {
            if (err) {
                console.error(err);
                callback(err);
                return;
            } else {
                let sum = docs.reduce(sumRatings, 0);
                let num = docs.reduce(numRatings, 0);
                callback(null, {
                    avgRating: num === 0 ? 0 : sum / num,
                    totalRatings: num,
                    totalSessions: docs.length
                });
            }
        });
    },

    /**
     * get the overall average tutoring session time
     * @param callback
     */
    getAvgSessionTime: function(callback) {
        function sumSessionTimes(accumulator, currentValue) {
            return accumulator + currentValue.getDuration();
        }
        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            } else {
                let avgSessionTime = docs.reduce(sumSessionTimes) / docs.length;
                callback(null, { time: avgSessionTime });
            }
        });
    },

    /**
     * get the overall discrepancy between expected session time and actual session time
     * for a certain range of dates (ex. Jan-Feb 2018)
     * @param start_date the start of the date range
     * @param end_date the end of the date range
     * @param callback
     */
    getSessionDiscrepancy: function(start_date, end_date, callback) {
        function filterBySessionDate(session) {
            return (
                session.start_time > start_date && session.end_time < end_date
            );
        }

        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            } else {
                docs = docs.filter(filterBySessionDate);
                let totalDiscrepancy = docs.reduce(getSessionDiscrepancy);
                let avgDiscrepancy = totalDiscrepancy / docs.length;
                callback(null, { time: avgDiscrepancy });
            }
        });
    },

    /**
     * get the overall average tutor rating for a range of dates (ex. Jan-Feb 2018)
     * @param start_date the start of the date range
     * @param end_date the end of the date range
     * @param callback
     */
    getOverallTutorAvgRating: function(start_date, end_date, callback) {
        function filterBySessionDate(session) {
            return (
                session.start_time > start_date && session.end_time < end_date
            );
        }

        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            } else {
                docs = docs.filter(filterBySessionDate);
                let sumRatings = docs.reduce(sumRatings);
                let numRatings = docs.reduce(numRatings);
                callback(null, {
                    avgRating: sumRatings / numRatings,
                    totalRatings: numRatings
                });
            }
        });
    },

    /**
     * get the tutor feedback comments for sessions with a rating <= max_rating
     * @param max_rating the maximum rating
     * @param callback
     */
    getTutorFeedback: function(max_rating, callback) {
        function filterByMaxRating(session) {
            return session.tutor_rating <= max_rating;
        }

        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            } else {
                docs = docs.filter(filterByMaxRating);
                docs = docs.map(getComments);
                callback(null, docs);
            }
        });
    },

    /**
     * Get all active tutor sessions
     * @param callback
     */
    getActiveSessions: function(callback) {
        function hasEndTime(session) {
            return session.end_time === 'undefined';
        }

        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            } else {
                docs = docs.filter(hasEndTime);
                callback(null, docs);
            }
        });
    },

    /**
     * Get active tutor session for a specific tutor
     * @param tutorId the tutor's id
     * @param callback
     */
    getActiveSession: (tutorId, callback) => {
        const now = moment();

        TutorSession.find({ '_id.tutor_id': tutorId }, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs.filter(session => {
                    const start = moment(session.start_time);
                    const end = moment(session.expected_end_time);
                    return now.diff(start) >= 0 && now.diff(end) <= 0 && !session.end_time;
                }));
            }
        });
    },

    /**
     *
     */
    getStudentByRatingId: (rating_id, callback) => {
        TutorSession.findOne({ 'students_attended': {$elemMatch: {_id: rating_id }}}, (err, session) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            // need this to convert from Mongoose obj
            const session_obj = JSON.parse(JSON.stringify(session));
            const student = session_obj.students_attended.find(ses => ses._id === rating_id).student_id;
            callback(null, student);
        });
    }
};
