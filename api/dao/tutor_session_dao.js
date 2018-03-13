const TutorSession = require('../../models/TutorSession.js');

module.exports = {

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

    function sumSessionTimes(accumulator, currentValue) {
        return (accumulator.end_time - accumulator.start_time) + currentValue;
    }

    // get all of the sessions that the tutor has been a part of
    getSessionsByTutor: function(username, callback) {
        TutorSession.find({tutor_id:username}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(null, docs);
            }
        });
    },
    // get the average rating for the tutor and the total number of ratings
    getTutorAvgRating: function(username, callback) {
        TutorSession.find({tutor_id:username}, function(err, docs) {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                rating = 0;
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
        })
    },
    // get the overall discrepancy between expected session time and actual session time
    // for a certain range of dates (ex. Jan-Feb 2018)
    getSessionDiscrepancy: function(start_date, end_date) {
        console.log(start_date);
    },
    // get the overall average tutor rating for a range of dates (ex. Jan-Feb 2018)
    getTutorAvgRating: function(start_date, end_date) {
        console.log(start_date);
    }

    // get the overall discrepancy between expected session start time and actual session start time
    getStartTimeDiscrepancy: function(start_date, end_date) {
        console.log(start_date);
    }

    // get the tutor comments for sessions with a rating <= max_rating
    getTutorComments: function(max_rating) {
        console.log(max_rating);
    }
}