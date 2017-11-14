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





    // validateAccessCode: function (accessFolder, callback) {
    //
    //     AccessCode.find({code: accessFolder}, function (err, docs) {
    //         if (err) {
    //             console.error('Error checking retrieving school is taken: ', err);
    //             callback(err);
    //
    //         } else if (docs.length === 1) {
    //             callback(null, docs[0]);
    //         } else if (docs.length > 1) {
    //             console.warn('Multiple access codes', docs);
    //             callback(null, docs[0]);
    //
    //         } else {
    //             callback(null, null);
    //         }
    //     });
    // }





};