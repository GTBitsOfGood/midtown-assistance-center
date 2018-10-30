const School = require('../../models/School');

module.exports = {
    getAllSchools(callback) {
        School.find({}, (err, schools) => {
            if (err) {
                console.error(
                    'Error retrieving all schools: ',
                    err
                );
                callback(err);
            } else {
                callback(null, schools);
            }
        });
    },
    addSchool: (school, callback) => {
        School.create(school, (err, school_instance) => {
            if (err) {
                console.error('Error creating new school: ', err);
                callback(err);
            } else {
                callback(null, school_instance);
            }
        });
    },
    verifySchoolCodeExists: (school_code, callback) => {
        return School.find( { school_code }, (err, school) => {
            if (err) {
                console.error('Error finding school', err);
            } else if (school.length === 1 ) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        });
    }

};
