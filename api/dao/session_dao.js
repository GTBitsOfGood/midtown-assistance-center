const Session = require('../../models/Session');

module.exports = {


    createSession: function(session, callback) {
        Session.create(session, function (err, session_instance) {
            if (err) {
                console.error('Error creating a new session:', err);
                callback(err);
            } else {
                callback(null, session_instance);
            }
        });
    },

    getAllSessionsViaUsername: function(username, callback) {
        // Look for tutors with the same username
        Session.find({_id: username}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist with this username:', err);
                callback(err);
            } else if (docs != null && docs.length > 0) {
                callback(null, docs);
            } else {
                callback(null, null);
            }
        });
    },

    getRecentSessionViaUsername: function(username, callback) {
        // Look for tutors with the same username
        Session.find({_id: username}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist with this username:', err);
                callback(err);

            } else if (docs != null && docs.length > 0) {
                callback(null, docs[0]); //idk if doc[0] is first or last added session...lol
            } else {
                callback(null, null);
            }
        });
    },



    getSessionsViaTime: function(time, callback) {
        // Look for tutors with the same username
        Session.find({time: time}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist with this username:', err);
                callback(err);

            } else if(docs != null && docs.length > 0){
                callback(null, docs);
            } else {
                callback(null, null);
            }
        });
    },

};