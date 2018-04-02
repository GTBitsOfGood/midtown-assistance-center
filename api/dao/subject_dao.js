const Subject = require('../../models/Subject');

module.exports = {

    getAllSubjects: function(callback) {
        Subject.find({}, function(err, subjects) {
            if (err) {
                console.error('Error getting all subjects');
                callback(err);
            } else {
                let subj = subjects.map(subject => subject.title);
                callback(null, subj);
            }
        });
    },

    addSubject: function(subject, callback) {
        Subject.create(subject, function(err, subject_instance) {
            if (err) {
                console.error('Error creating new subject:', subject);
                callback(err);
            } else {
                callback(null, subject_instance);
            }
        });
    },

};