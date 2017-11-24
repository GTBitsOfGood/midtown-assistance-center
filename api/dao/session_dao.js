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

    getSessionsViaUsername: function(username, callback) {
        Session.find({_id: username}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist with this username:', err);
                callback(err);
            } else if (docs && docs.length > 0) {
                callback(null, docs);
            } else {
                callback(null, null);
            }
        });
    },

    getRecentSessionViaUsername: function(username, callback) {
        Session.find({_id: username}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist with this username:', err);
                callback(err);

            } else if (docs && docs.length > 0) {
                callback(null, docs[0]); //idk if doc[0] is first or last added session...lol
            } else {
                callback(null, null);
            }
        });
    },

    getSessionsViaTime: function(time, callback) {
        Session.find({time: time}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist with this Time:', err);
                callback(err);

            } else if(docs && docs.length > 0){
                callback(null, docs);
            } else {
                callback(null, null);
            }
        });
    },

    getAllSessionsInDB: function(callback) {
        Session.find({}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist in the DataBase:', err);
                callback(err);
            } else if(docs && docs.length > 0){
                callback(null, docs);
            } else {
                callback(null, null);
            }
        });
    },


};