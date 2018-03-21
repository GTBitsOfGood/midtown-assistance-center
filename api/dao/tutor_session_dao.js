/**
 * @file
 * tutor_session_dao.js
 *
 * @fileoverview
 * Data access functions for Tutor Session objects
 */

const TutorSession = require('../../models/TutorSession.js');

/**
 * find the sum of all ratings among all tutor sessions
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumRatings(accumulator, currentValue) {
    return accumulator.students_attended.reduce(sumStudentRatings) + currentValue;
}

/**
 * find the sum of the student ratings within 1 tutor session
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumStudentRatings(accumulator, currentValue) {
    return accumulator.student_rating + currentValue;
}

/**
 * find the total number of students who have ratings among all tutor sessions
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function numRatings(accumulator, currentValue) {
    return accumulator.students_attended.reduce(numStudentRatings) + currentValue;
}

/**
 * find the number of students who have rated a single tutor session
 * @param accumulator
 * @param currentValue
 * @returns {*}
 */
function numStudentRatings(accumulator, currentValue) {
    return (accumulator.student_rating != null ? 1 : 0) + currentValue;
}

/**
 * find the total discrepancy between expected start and end times of sessions
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumSessionDiscrepancy(accumulator, currentValue) {
    return ((accumulator.expected_end_time - accumulator.end_time) - (accumulator.start_time - accumulator.expected_start_time)) + currentValue;
}

/**
 * find the total sum of session durations
 * @param accumulator
 * @param currentValue
 * @returns {number}
 */
function sumSessionTimes(accumulator, currentValue) {
    return (accumulator.end_time - accumulator.start_time) + currentValue;
}

/**
 * get the comment and the rating from a tutor session document
 * @param doc
 * @returns {{comment: tutor_comment|{type, required}|*, rating: *|tutor_rating|{type, required}}}
 */
function getComments(doc) {
    return {comment: doc.tutor_comment, rating: doc.tutor_rating};
}

module.exports = {

    /**
     * add a tutor session object
     * @param session
     * @param callback
     */
    addSession: function (session, callback) {
        TutorSession.create(session, function (err, session_instance) {
            if (err) {
                console.error('Error creating a new session AND THIS IS WHY DUDE:', err);
                callback(err);
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
    updateTutorSession: function (session, callback) {
        TutorSession.findByIdAndUpdate(session._id, {$set: session.update}, {new: true}, function (err, updatedSession) {
            if (err) {
                console.log('Error saving session');
                return callback(err);
            }
            callback(null, updatedSession);
        });
    },

    /**
     * add a student review to the session
     * @param session the session object (must contain _id: the session id,
     * update: the new info)
     * @param callback
     */
    addStudentReview: function (session, callback) {
        TutorSession.findOneAndUpdate({'_id.tutor_id':session._id.tutor_id, '_id.expected_start_time':session._id.expected_start_time, 'students_attended.student_id': {$ne: session.update.students_attended.student_id}}, {$push: session.update}, {new: true}, function (err, updatedSession) {
            if (err) {
                console.log('Error saving session');
                callback(err);
            }
            console.log(updatedSession);
            callback(null, updatedSession);
        });
    },

    /**
     * get all of the sessions that the tutor has been a part of
     * @param username the id of the tutor
     * @param callback
     */
    getSessionsByTutor: function (username, callback) {
        TutorSession.find({'_id.tutor_id': username}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    },

    /**
     * get a particular session for a tutor
     * @param data: contains the tutor id and the start time of the session
     * @param callback
     */
    getSessionByTutor: function (data, callback) {
        TutorSession.find({
            '_id.tutor_id': data.tutor_id,
            '_id.expected_start_time': data.expected_start_time
        }, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    },

    /**
     * rank tutors
     * @param callback
     */
    rankTutorsByRating: function (callback) {
        console.log('rank tutors');
        // TODO: rank tutors function
    },

    /**
     * get the average rating for the tutor and the total number of ratings
     * @param username
     * @param callback
     */
    getTutorAvgRating: function (username, callback) {
        TutorSession.find({tutor_id: username}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                var sumRatings = docs.reduce(sumRatings);
                var numRatings = docs.reduce(numRatings);
                callback(null, {avgRating: sumRatings / numRatings, totalRatings: numRatings});
            }
        });
    },

    /**
     * get the overall average tutoring session time
     * @param callback
     */
    getAvgSessionTime: function (callback) {
        TutorSession.find({}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                var avgSessionTime = docs.reduce(sumSessionTimes) / docs.length;
                callback(null, {time: avgSessionTime});
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
    getSessionDiscrepancy: function (start_date, end_date, callback) {
        function filterBySessionDate(session) {
            return session.start_time > start_date && session.end_time < end_date;
        }

        TutorSession.find({}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                docs = docs.filter(filterBySessionDate);
                var totalDiscrepancy = docs.reduce(getSessionDiscrepancy);
                var avgDiscrepancy = totalDiscrepancy / docs.length;
                callback(null, {time: avgSessionTime});
            }
        });
    },

    /**
     * get the overall average tutor rating for a range of dates (ex. Jan-Feb 2018)
     * @param start_date the start of the date range
     * @param end_date the end of the date range
     * @param callback
     */
    getOverallTutorAvgRating: function (start_date, end_date, callback) {
        function filterBySessionDate(session) {
            return session.start_time > start_date && session.end_time < end_date;
        }

        TutorSession.find({}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                docs = docs.filter(filterBySessionDate);
                var sumRatings = docs.reduce(sumRatings);
                var numRatings = docs.reduce(numRatings);
                callback(null, {avgRating: sumRatings / numRatings, totalRatings: numRatings});
            }
        });
    },

    /**
     * get the tutor feedback comments for sessions with a rating <= max_rating
     * @param max_rating the maximum rating
     * @param callback
     */
    getTutorFeedback: function (max_rating, callback) {
        function filterByMaxRating(session) {
            return session.tutor_rating <= max_rating;
        }

        TutorSession.find({}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
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
    getActiveSessions: function (callback) {
        function hasEndTime(session) {
            return session.end_time === 'undefined';
        }

        TutorSession.find({}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
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
    getActiveSession: function (tutorId, callback) {
        function hasEndTime(session) {
            return session.end_time === undefined;
        }

        TutorSession.find({'_id.tutor_id': tutorId}, function (err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                docs = docs.filter(hasEndTime);
                callback(null, docs);
            }
        });
    },
};