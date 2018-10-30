const AccessCode = require('../../models/AccessCode');

module.exports = {
    validateAccessCode: (accessFolder, callback) => {
        AccessCode.find({ code: accessFolder }, (err, docs) => {
            if (err) {
                console.error(
                    'Error checking retrieving school is taken: ',
                    err
                );
                callback(err);
            } else if (docs.length === 1) {
                callback(null, docs[0]);
            } else if (docs.length > 1) {
                console.warn('Multiple access codes', docs);
                callback(null, docs[0]);
            }
        });
    },
    getAllAccessCodes: callback => {
        AccessCode.find({}, (err, codes) => {
            if (err) {
                console.error('Error retrieving all access codes: ' , err);
            } else {
                callback(null, codes);
            }
        });
    },
    getAccessCodesForSchool: (school_code, callback) => {
        AccessCode.find({school_code: school_code}, (err, codes) => {
            if (err) {
                console.log(school_code);
                console.error('Error retrieving all access codes for school, ', err);
            } else {
                callback(null, codes);
            }
        });
    },
    addAccessCode: (access_code, callback) => {
        AccessCode.create(access_code, (err, access_code_instance) => {
            if (err) {
                console.error('Error creating new access code');
                callback(err);
            } else {
                callback(null, access_code_instance);
            }

        });
    }
};
