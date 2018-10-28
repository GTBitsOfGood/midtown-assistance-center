const Ban = require('../../models/Ban');

module.exports = {
    submitReport: (ban, callback) => {
        Ban.create(ban, (err, ban_instance) => {
            if (err) {
                console.error('Error reporting ban:', err);
                callback(err);
            } else {
                callback(null, ban_instance);
            }
        });
    },

    getAllBans: (ban, callback) => {
        Ban.find(ban, (err, bans) => {
            if (err) {
                console.error('Error fetching bans:', err);
                callback(err);
            } else {
                callback(null, bans);
            }
        });
    }
};
