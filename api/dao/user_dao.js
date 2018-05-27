/**
 * This file contains methods for adding/removing/modifying items in the database for users.
 * Currently There are two types of users: Tutors and Students
 * We need to add some for Admins!!
 */

const Tutor = require('../../models/Tutor');
const Student = require('../../models/Student');
const Admin = require('../../models/Admin');

import config from 'config';

module.exports = {
    /**
     * 1. This functions checks if a username string is already in the database
     * 2. This function is called in api.js when creating a new tutor, student, or admin
     * 3. Look at the post(/registerStudent) endpoint in api.js
     * @param username: string for username
     * @param callback: takes two parameters: error and boolean which represents if a tutor exists already
     */
    checkIfUsernameIsTaken: function(username, callback) {
        // Look for tutors with the same username
        Tutor.find({ _id: username }, function(err, docs) {
            if (err) {
                console.error('Error checking if username is taken:', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same username so return true for found
                callback(null, true);
            } else {
                // Look for students with the same username
                Student.find({ _id: username }, function(err, docs) {
                    if (err) {
                        console.error(
                            'Error checking if username is taken:',
                            err
                        );
                        callback(err);
                    } else if (docs.length > 0) {
                        // Found a student with the same username
                        callback(null, true);
                    } else {
                        Admin.find({ _id: username }, function(err, docs) {
                            if (err) {
                                console.error(
                                    'Error checking if username is taken:',
                                    err
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                // Found an admin with the same username
                                callback(null, true);
                            } else {
                                callback(null, false);
                            }
                        });
                    }
                });
            }
        });
    },

    checkIfEmailIsTaken: function(email, callback) {
        // Look for tutors with the same email
        Tutor.find({ email: email }, function(err, docs) {
            if (err) {
                console.error('Error checking if email is taken:', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same email
                callback(null, true);
            } else {
                // Look for students with the same email
                Student.find({ email: email }, function(err, docs) {
                    if (err) {
                        console.error('Error checking if email is taken:', err);
                        callback(err);
                    } else if (docs.length > 0) {
                        // Found a student with the same email
                        callback(null, true);
                    } else {
                        Admin.find({ email: email }, function(err, docs) {
                            if (err) {
                                console.error(
                                    'Error checking if email is taken:',
                                    err
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                // Found a student with the same email
                                callback(null, true);
                            } else {
                                callback(null, false);
                            }
                        });
                    }
                });
            }
        });
    },

    createStudent: function(student, callback) {
        Student.create(student, function(err, student_instance) {
            if (err) {
                console.error('Error creating a new student:', err);
                callback(err);
            } else {
                callback(null, student_instance);
            }
        });
    },

    createTutor: function(tutor, callback) {
        Tutor.create(tutor, function(err, tutor_instance) {
            if (err) {
                console.error(
                    'Error creating a new tutor AND THIS IS WHY DUDE:',
                    err
                );
                callback(err);
            } else {
                callback(null, tutor_instance);
            }
        });
    },

    confirmEmail: function(data, callback) {
        Tutor.find({ _id: data._id, confirm_key: data.confirm_key }, function(
            err,
            docs
        ) {
            if (err) {
                console.error('Error confirming email :(');
                callback(err);
                return;
            } else {
                console.log(docs);
                if (docs.length > 0) {
                    let tutor_obj = docs[0];
                    tutor_obj.confirmed = true;
                    tutor_obj.save(function(err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
                callback(null, docs);
            }
        });
    },

    //Not being used right now, but could be if we choose to allow superadmins to create lowerlevel admins
    createAdmin: function(admin, callback) {
        Admin.create(admin, function(err, admin_instance) {
            if (err) {
                console.error('Error creating a new admin in database:', err);
                callback(err);
            } else {
                callback(null, admin_instance);
            }
        });
    },

    getUser: function(username, callback) {
        // Look for tutors with the same username
        Tutor.find({ _id: username }, function(err, docs) {
            if (err) {
                console.error('Error checking if Tutor username is taken', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same username
                if (docs.length > 1) {
                    console.error(
                        'Multiple tutors with same username!',
                        username
                    );
                }
                callback(null, docs[0]);
            } else {
                // Look for students with the same username
                Student.find({ _id: username }, function(err, docs) {
                    if (err) {
                        console.error(
                            'Error checking if Student username is taken:',
                            err
                        );
                        callback(err);
                        return;
                    } else if (docs.length > 0) {
                        if (docs.length > 1) {
                            console.error(
                                'Multiple students with same username!',
                                username
                            );
                        }
                        // Found a student with the same username
                        callback(null, docs[0]);
                        return;
                    } else {
                        Admin.find({ _id: username }, function(err, docs) {
                            if (err) {
                                console.error(
                                    'Error checking if Admin username is taken'
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                if (docs.length > 1) {
                                    console.error(
                                        'Multiple Admins with same username!'
                                    );
                                }
                                callback(null, docs[0]);
                            } else {
                                callback('No users found', null);
                            }
                        });
                    }
                });
            }
        });
    },

    //
    // getUser: function(username, callback) {
    //     // Look for tutors with the same username
    //     Tutor.find({_id: username}, function (err, docs) {
    //         if (err) {
    //             console.error('Error checking if username is taken:', err);
    //             callback(err);
    //
    //         } else if (docs.length === 1) {
    //             // Found a tutor with the same username
    //
    //             callback(null, docs[0]);
    //         } else if (docs.length > 1) {
    //             console.error('Multiple tutors with username', username);
    //         } else {
    //             // Look for students with the same username
    //             Student.find({_id: username}, function (err, docs) {
    //                 if (err) {
    //                     console.error('Error checking if username is taken:', err);
    //                     callback(err);
    //
    //                 } else if (docs.length === 1) {
    //                     // Found a student with the same username
    //                     callback(null, docs[0]);
    //                 } else if (docs.length > 1) {
    //                     console.error('Multiple students with username', username);
    //                 } else {
    //                     // No tutors or students with that username!
    //                     callback('No tutors or students found', null);
    //                 }
    //             });
    //         }
    //     });
    // },

    getAllAvailableTutors: function(subject, availability, callback) {
        let todayDate = new Date();
        let today = todayDate.getDay();
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let dayName = days[today];

        function filterByOnline(tutor) {
            return tutor.online;
        }

        function filterByApproved(tutor) {
            return tutor.approved;
        }

        function filterByConfirmed(tutor) {
            return tutor.confirmed;
        }

        function filterBySubject(tutor) {
            for (let i = 0; i < tutor.subjects.length; i++) {
                let subject_json = tutor.subjects[i];

                if (
                    subject_json.subject.toLowerCase() === subject.toLowerCase()
                ) {
                    // TODO match grade levels
                    return true;
                }
            }

            for (let i = 0; i < tutor.favorites.length; i++) {
                let fav_json = tutor.favorites[i];
                if (
                    fav_json.favorite.toLowerCase() === subject.toLowerCase() ||
                    fav_json.subject.toLowerCase() === subject.toLowerCase()
                ) {
                    return true;
                }
            }

            return false;
        }

        function filterByAvailability(tutor) {
            // FIXME we should probably do this based on datetime
            if (availability === 'ASAP') {
                return tutor.online;
            } else if (availability === 'today') {
                return tutor.availability[dayName].length > 0 || tutor.online;
            }
            return true;
        }

        Tutor.find({}, function(err, tutors) {
            if (err) {
                console.log('Error getting all online tutors');
                callback(err);
            }
            if (!subject && !availability) {
                tutors = tutors.filter(filterByOnline);
            }
            tutors = tutors.filter(filterByApproved);
            tutors = tutors.filter(filterByConfirmed);
            if (subject) {
                tutors = tutors.filter(filterBySubject);
            }
            if (availability) {
                tutors = tutors.filter(filterByAvailability);
            }
            callback(null, tutors);
        });
    },

    getAllTutors: function(callback) {
        Tutor.find({}, function(err, tutors) {
            if (err) {
                console.log('Error getting all tutors');
                callback(err);
            }
            callback(null, tutors);
        });
    },

    saveStudent: function(student, callback) {
        if (student.password === config.get('hidden_password')) {
            callback('The student password is masked! Not saving this to db');
        }

        Student.findByIdAndUpdate(
            student._id,
            { $set: student },
            { new: true },
            function(err, updatedStudent) {
                if (err) {
                    console.log('Error saving student');
                    return callback(err);
                }
                callback(null, updatedStudent);
            }
        );
    },

    getUnapprovedTutors: function(callback) {
        Tutor.find({ approved: false }, function(err, docs) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, docs);
        });
    },

    saveTutor: function(tutor, callback) {
        if (tutor.password === config.get('hidden_password')) {
            callback('The tutor password is masked! Not saving this to db');
        }

        console.log('updating tutor');
        Tutor.findByIdAndUpdate(
            tutor._id,
            { $set: tutor },
            { new: true },
            function(err, updatedTutor) {
                if (err) {
                    console.log('Error saving tutor');
                    return callback(err);
                }

                callback(null, updatedTutor);
            }
        );
    }
};
