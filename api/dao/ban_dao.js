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
    },

    banUser: (ban_id, banned, callback) => {
        Ban.findOneAndUpdate(
            { _id: ban_id },
            { $set: {reviewed: true, banned }},
            (err, doc) => {
                if (err) {
                    console.error('Error updating ban:', err);
                    callback(err);
                } else {
                    callback(null, doc);
                }
            }
        );
    },
};
