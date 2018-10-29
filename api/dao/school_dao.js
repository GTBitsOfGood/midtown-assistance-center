const School = require('../../models/School');

module.exports = {
    getAllSchools: function(callback) {
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
    }
};
