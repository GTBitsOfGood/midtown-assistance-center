const TutorSession = require('../../models/TutorSession.js');

function sumRatings(accumulator, currentValue) {
    return accumulator.students_attended.reduce(sumStudentRatings) + currentValue;
}

function sumStudentRatings(accumulator, currentValue) {
    return accumulator.student_rating + currentValue;
}

function numRatings(accumulator, currentValue) {
    return accumulator.students_attended.reduce(numStudentRatings) + currentValue;
}

function sumStudentRatings(accumulator, currentValue) {
    return ( accumulator.student_rating != null ? 1 : 0 ) + currentValue;
}

function sumSessionDiscrepancy(accumulator, currentValue) {
    return ((accumulator.expected_end_time - accumulator.end_time) - (accumulator.start_time - accumulator.expected_start_time)) + currentValue;
}

function sumSessionTimes(accumulator, currentValue) {
    return (accumulator.end_time - accumulator.start_time) + currentValue;
}

function getComments(doc) {
    return {comment: doc.tutor_comment, rating: doc.tutor_rating};
}

module.exports = {

    // add a tutor session object
    addSession: function(session, callback) {
        TutorSession.create(session, function (err, session_instance) {
            if (err) {
                console.error('Error creating a new session AND THIS IS WHY DUDE:', err);
                callback(err);
            } else {
                callback(null, session_instance);
            }
        });
    },
    // update the tutor session object (if a student is added or a rating is added)
    updateTutorSession: function(session, callback) {
        console.log(session);
        console.log(session._id);
        TutorSession.findByIdAndUpdate(session._id, { $set: session.update}, { new: true }, function (err, updatedSession) {
            if (err) {
              console.log('Error saving session');
              return callback(err);
            }
            console.log(updatedSession);

            callback(null, updatedSession);
        });
    },

    // get all of the sessions that the tutor has been a part of
    getSessionsByTutor: function(username, callback) {
        TutorSession.find({"_id.tutor_id":username}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(null, docs);
            }
        });
    },
    // get a particular session for a tutor
    getSessionByTutor: function(data, callback) {
        TutorSession.find({"_id.tutor_id": data.tutor_id, "_id.expected_start_time":data.expected_start_time}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(null, docs);
            }
        });
    },
    // rank tutors
    rankTutorsByRating: function(callback) {
        console.log("/")
    },
    // get the average rating for the tutor and the total number of ratings
    getTutorAvgRating: function(username, callback) {
        TutorSession.find({tutor_id:username}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                var sumRatings = docs.reduce(sumRatings);
                var numRatings = docs.reduce(numRatings);
                callback(null, {avgRating: sumRatings/numRatings, totalRatings:numRatings});
            }
        });
    },
    // get the overall average tutoring session time
    getAvgSessionTime: function() {
        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                var avgSessionTime = docs.reduce(getAvgSessionTime)/docs.length;
                callback(null, {time:avgSessionTime});
            }
        });
    },
    // get the overall discrepancy between expected session time and actual session time
    // for a certain range of dates (ex. Jan-Feb 2018)
    getSessionDiscrepancy: function(start_date, end_date) {
        function filterBySessionDate(session) {
            return session.start_time > start_date && session.end_time < end_date;
        }
        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                docs = docs.filter(filterBySessionDate)
                var totalDiscrepancy = docs.reduce(getSessionDiscrepancy)
                var avgDiscrepancy = totalDiscrepancy/docs.length;
                callback(null, {time:avgSessionTime});
            }
        });
    },
    // get the overall average tutor rating for a range of dates (ex. Jan-Feb 2018)
    getOverallTutorAvgRating: function(start_date, end_date) {
        function filterBySessionDate(session) {
            return session.start_time > start_date && session.end_time < end_date;
        }
        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                docs = docs.filter(filterBySessionDate)
                var sumRatings = docs.reduce(sumRatings);
                var numRatings = docs.reduce(numRatings);
                callback(null, {avgRating: sumRatings/numRatings, totalRatings:numRatings});
            }
        });
    },

    // get the tutor feedback comments for sessions with a rating <= max_rating
    getTutorFeedback: function(max_rating) {
        function filterByMaxRating(session) {
            return session.tutor_rating <= max_rating;
        }
        TutorSession.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                docs = docs.filter(filterByMaxRating)
                docs = docs.map(getComments);
                callback(null, docs);
            }
        });
    }
}