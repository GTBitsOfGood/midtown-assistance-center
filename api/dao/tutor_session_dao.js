const TutorSession = require('../../models/TutorSession.js');

module.exports = {

    // get all of the sessions that the tutor has been a part of
    getSessionsByTutor: function(username, callback) {
        console.log(username);
    },
    // get the average rating for the tutor
    getTutorAvgRating: function(username, callback) {
        console.log(username);
    },
    // get the overall average tutoring session time
    getAvgSessionTime: function() {
        console.log("hi");
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