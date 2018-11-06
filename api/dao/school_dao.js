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
        School.find( { school_code }, (err, school) => {
            if (err) {
                console.error('Error finding school', err);
            } else if (school.length > 0) {
                //school w/ inputted school code exists
                callback(null, true);
            } else {
                //school code does not exist
                callback(null, false);
            }
        });
    }

};
