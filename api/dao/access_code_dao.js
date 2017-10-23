const AccessCode = require('../../models/AccessCode');

module.exports = {

    validateAccessCode: function (accessFolder, callback) {

        AccessCode.find({code: accessFolder}, function (err, docs) {
            if (err) {
                console.error('Error checking retrieving school is taken: ', err);
                callback(err);

            } else if (docs.length === 1) {
                callback(null, docs[0]);
            } else if (docs.length > 1) {
                console.warn('Multiple access codes', docs);
                callback(null, docs[0]);

            } else {
                callback(null, null);
            }
        });
    }

};