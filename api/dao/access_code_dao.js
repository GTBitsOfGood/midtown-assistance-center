const AccessCode = require('../../models/AccessCode');

module.exports = {
    checkAccessCodeExist: (inputCode, callback) => {
        console.log('INPUTCODE ',inputCode);
        AccessCode.find({ access_code: inputCode }, (err, docs) => {
            if (err) {
                console.error(
                    'Error checking if access code exists: ',
                    err
                );
                callback(err);
            } else if (docs.length === 1) {
                callback(null, true);
            } else if (docs.length > 1) {
                console.warn('Multiple access codes', docs);
                callback(null, true);
            } else {
                console.log(docs);
                callback(null, false);
            }
        });
    },
    getAllAccessCodes: callback => {
        AccessCode.find({}, (err, codes) => {
            if (err) {
                console.error('Error retrieving all access codes: ', err);
            } else {
                callback(null, codes);
            }
        });
    },
    getAccessCodesForSchool: (schools, callback) => {
        const school_codes = schools.map(school => school.school_code);
        const promises = school_codes.map(school_code => AccessCode.find({ school_code }));
        Promise.all(promises)
            .then(listJobs => {
                const combined = schools.map((school, ind) => ({ ...school._doc, filteredCodes: listJobs[ind] }));
                callback(null, combined);
            })
            .catch(err => {
                console.log('err', err);
                callback(err);
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
