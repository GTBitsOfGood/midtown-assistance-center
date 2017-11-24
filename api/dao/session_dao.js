const Session = require('../../models/Session');

module.exports = {

    createSession: function(session, callback) {
        Session.create(session, function (err, session_instance) {
            if (err) {
                console.error('Error creating a new session:', err);
                return callback(err);
            }

            return callback(null, session_instance);
        });
    },

    getFilteredSessions(username, startTime, endTime, limit, sortByTime, callback) {
        function filterByUsername(session) {
            return session.username === username;
        }

        function filterAfterStartTime(session) {
            return session.time > startTime;
        }

        function filterBeforeEndTime(session) {
            return session.time < endTime;
        }

        function compareTimesDesc(sessionA, sessionB) {
            return sessionA.time < sessionB.time;
        }

        Session.find({}, function (err, docs) {
            if (err) {
                console.error('Error checking if any sessions exist in the DataBase:', err);
                return callback(err);
            }

            let sessions = docs;

            if (username) {
                sessions = sessions.filter(filterByUsername);
            }
            if (startTime) {
                sessions = sessions.filter(filterAfterStartTime);
            }
            if (endTime) {
                sessions = sessions.filter(filterBeforeEndTime);
            }

            sessions.length = Math.min(sessions.length, limit);

            if (sortByTime) {
                sessions.sort(compareTimesDesc);
            }

            callback(null, sessions);
        });
    },
};