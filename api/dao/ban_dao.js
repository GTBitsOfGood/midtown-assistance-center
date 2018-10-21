const Ban = require('../../models/Ban');

module.exports = {
    submitTutorReport: (ban, callback) => {
        Ban.create(ban, (err, ban_instance) => {
            if (err) {
                console.error('Error reporting ban:', err);
                callback(err);
            } else {
                callback(null, ban_instance);
            }
        });
    }
};
