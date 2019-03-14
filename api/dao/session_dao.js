const Session = require('../../models/Session');

module.exports = {
    createSession: function(session, callback) {
        Session.create(session, function(err, session_instance) {
            if (err) {
                console.error('Error creating a new session:', err);
                return callback(err, null);
            }

            return callback(null, session_instance);
        });
    },

    getFilteredSessions(
        username,
        startTime,
        endTime,
        limit,
        sortByTime,
        callback
    ) {
        function filterByUsername(session) {
            return session.username === username;
        }

        function filterAfterStartTime(session) {
            return session.time > startTime;
        }

        function filterBeforeEndTime(session) {
            return session.time < endTime;
        }

        function compareTimesDescending(sessionA, sessionB) {
            return sessionA.time < sessionB.time;
        }

        function compareTimesAscending(sessionA, sessionB) {
            return sessionA.time > sessionB.time;
        }

        Session.find({}, function(err, docs) {
            if (err) {
                console.error(
                    'Error checking if any sessions exist in the DataBase:',
                    err
                );
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

            if (!limit) {
                limit = 100;
            }

            sessions.length = Math.min(sessions.length, limit);

            if (sortByTime) {
                if (sortByTime > 0) {
                    sessions.sort(compareTimesAscending());
                } else {
                    sessions.sort(compareTimesDescending);
                }
            }

            callback(null, sessions);
        });
    }
};
