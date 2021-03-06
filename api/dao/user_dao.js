/**
 * This file contains methods for adding/removing/modifying items in the database for users.
 * Currently There are two types of users: Tutors and Students
 * We need to add some for Admins!!
 */

import config from 'config';

const Tutor = require('../../models/Tutor');
const Student = require('../../models/Student');
const Admin = require('../../models/Admin');

module.exports = {
    /**
     * 1. This functions checks if a username string is already in the database
     * 2. This function is called in api.js when creating a new tutor, student, or admin
     * 3. Look at the post(/registerStudent) endpoint in api.js
     * @param username: string for username
     * @param callback: takes two parameters: error and boolean which represents if a tutor exists already
     */
    checkIfUsernameIsTaken(username, callback) {
        // Look for tutors with the same username
        Tutor.find({ _id: username }, (err, docs) => {
            if (err) {
                console.error('Error checking if username is taken:', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same username so return true for found
                callback(null, true);
            } else {
                // Look for students with the same username
                Student.find({ _id: username }, (err, docs) => {
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
                        Admin.find({ _id: username }, (err, docs) => {
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

    checkIfEmailIsTaken(email, callback) {
        // Look for tutors with the same email
        Tutor.find({ email }, (err, docs) => {
            if (err) {
                console.error('Error checking if email is taken:', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same email
                callback(null, true);
            } else {
                // Look for students with the same email
                Student.find({ email }, (err, docs) => {
                    if (err) {
                        console.error('Error checking if email is taken:', err);
                        callback(err);
                    } else if (docs.length > 0) {
                        // Found a student with the same email
                        callback(null, true);
                    } else {
                        Admin.find({ email }, (err, docs) => {
                            if (err) {
                                console.error(
                                    'Error checking if email is taken:',
                                    err
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                // Found a admin with the same email
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

    createStudent(student, callback) {
        Student.create(student, (err, student_instance) => {
            if (err) {
                console.error('Error creating a new student:', err);
                callback(err);
            } else {
                callback(null, student_instance);
            }
        });
    },

    createTutor(tutor, callback) {
        Tutor.create(tutor, (err, tutor_instance) => {
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

    confirmEmail(data, callback) {
        Tutor.find({ _id: data._id, confirm_key: data.confirm_key }, (
            err,
            docs
        ) => {
            if (err) {
                console.error('Error confirming email :(');
                callback(err);

            } else {
                console.log(docs);
                if (docs.length > 0) {
                    const tutor_obj = docs[0];
                    tutor_obj.confirmed = true;
                    tutor_obj.save((err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
                callback(null, docs);
            }
        });
    },

    // Not being used right now, but could be if we choose to allow superadmins to create lowerlevel admins
    createAdmin(admin, callback) {
        Admin.create(admin, (err, admin_instance) => {
            if (err) {
                console.error('Error creating a new admin in database:', err);
                callback(err);
            } else {
                callback(null, admin_instance);
            }
        });
    },

    getUser(username, callback) {
        // Look for tutors with the same username
        Tutor.find({ _id: username }, (err, docs) => {
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
                Student.find({ _id: username }, (err, docs) => {
                    if (err) {
                        console.error(
                            'Error checking if Student username is taken:',
                            err
                        );
                        callback(err);

                    } else if (docs.length > 0) {
                        if (docs.length > 1) {
                            console.error(
                                'Multiple students with same username!',
                                username
                            );
                        }
                        // Found a student with the same username
                        callback(null, docs[0]);

                    } else {
                        Admin.find({ _id: username }, (err, docs) => {
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

    getUserByEmail(email, callback) {
        // Look for tutors with the same email
        Tutor.find({ email }, (err, docs) => {
            if (err) {
                console.error('Error checking if Tutor email is taken', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same email
                if (docs.length > 1) {
                    console.error(
                        'Multiple tutors with same email!',
                        email
                    );
                }
                callback(null, docs[0], 'tutor');
            } else {
                // Look for students with the same email
                Student.find({ email }, (err, docs) => {
                    if (err) {
                        console.error(
                            'Error checking if Student email is taken:',
                            err
                        );
                        callback(err);

                    } else if (docs.length > 0) {
                        if (docs.length > 1) {
                            console.error(
                                'Multiple students with same email!',
                                email
                            );
                        }
                        // Found a student with the same email
                        callback(null, docs[0], 'student');

                    } else {
                        Admin.find({ email }, (err, docs) => {
                            if (err) {
                                console.error(
                                    'Error checking if Admin email is taken'
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                if (docs.length > 1) {
                                    console.error(
                                        'Multiple Admins with same email!'
                                    );
                                }
                                callback(null, docs[0], 'admin');
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

    getAllAvailableTutors: (subject, availability, callback) => {
        const todayDate = new Date();
        const today = todayDate.getDay();
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        const dayName = days[today];

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
                const subject_json = tutor.subjects[i];

                if (
                    subject_json.subject.toLowerCase() === subject.toLowerCase()
                ) {
                    // TODO match grade levels
                    return true;
                }
            }

            for (let i = 0; i < tutor.favorites.length; i++) {
                const fav_json = tutor.favorites[i];
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
            }
            if (availability === 'today') {
                return tutor.availability[dayName].length > 0 || tutor.online;
            }
            return true;
        }

        Tutor.find({}, (err, tutors_param) => {
            let tutors = tutors_param;
            if (err) {
                console.log('Error getting all online tutors');
                callback(err);
            }
            if (!subject && !availability) {
                tutors = tutors.filter(filterByOnline);
            }
            tutors = tutors.filter(filterByApproved);
            tutors = tutors.filter(filterByConfirmed);
            tutors = tutors.filter(tutor => !tutor.banned);
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

    getAllAdminEmails(callback) {
        Admin.find({}, 'email', (err, emails) => {
            if (err) {
                console.log('Error retrieving all admin emails');
                callback(err);
            }
            callback(null, emails);
        });
    },

    saveStudent(student, callback) {
        if (student.password === config.get('hidden_password')) {
            callback('The student password is masked! Not saving this to db');
        }

        Student.findByIdAndUpdate(
            student._id,
            { $set: student },
            { new: true },
            (err, updatedStudent) => {
                if (err) {
                    console.log('Error saving student');
                    return callback(err);
                }
                callback(null, updatedStudent);
            }
        );
    },

    getUnapprovedTutors(callback) {
        Tutor.find({ approved: false }, (err, docs) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(null, docs);
        });
    },

    saveTutor(tutor, callback) {
        if (tutor.password === config.get('hidden_password')) {
            callback('The tutor password is masked! Not saving this to db');
        }

        console.log('updating tutor');

        Tutor.findByIdAndUpdate(
            tutor._id,
            { $set: tutor },
            { new: true },
            (err, updatedTutor) => {
                if (err) {
                    console.log('Error saving tutor');
                    return callback(err);
                }

                callback(null, updatedTutor);
            }
        );
    },

    saveAdmin(admin, callback) {
        if (admin.password === config.get('hidden_password')) {
            callback('The admin password is masked! Not saving this to db');
        }

        console.log('updating admin');

        Admin.findByIdAndUpdate(
            admin._id,
            { $set: admin },
            { new: true },
            (err, updatedAdmin) => {
                if (err) {
                    console.log('Error saving admin');
                    return callback(err);
                }

                callback(null, updatedAdmin);
            }
        );
    },

    updateResetKey(email, reset_key, emailType, callback) {
        if (emailType === 'tutor') {
            Tutor.findOneAndUpdate({ email }, {$set:{ reset_key }}, { new: true }, (err) => {
                return callback(err);
            });
        } else if (emailType === 'student') {
            Student.findOneAndUpdate({ email }, {$set:{ reset_key }}, { new: true }, (err) => {
                return callback(err);
            });
        } else {
            Admin.findOneAndUpdate({ email }, { $set: { reset_key } }, { new: true }, (err) => {
                return callback(err);
            });
        }
    },

    findUserIdByEmail(email, callback) {
        Tutor.find({ email }, (err, docs) => {
            if (err) {
                console.error('Error checking if email is taken:', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same email
                callback(null, docs[0]._id);
            } else {
                // Look for students with the same email
                Student.find({ email }, (err, docs) => {
                    if (err) {
                        console.error('Error checking if email is taken:', err);
                        callback(err);
                    } else if (docs.length > 0) {
                        // Found a student with the same email
                        callback(null, docs[0]._id);
                    } else {
                        Admin.find({ email }, (err, docs) => {
                            if (err) {
                                console.error(
                                    'Error checking if email is taken:',
                                    err
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                // Found a admin with the same email
                                callback(null, docs[0]._id);
                            } else {
                                callback(null, null);
                            }
                        });
                    }
                });
            }
        });
    },

    findUserType(email, callback) {
        Tutor.find({ email }, (err, docs) => {
            if (err) {
                console.error('Error checking if email is taken:', err);
                callback(err);
            } else if (docs.length > 0) {
                // Found a tutor with the same email
                callback(null, 'tutor');
            } else {
                // Look for students with the same email
                Student.find({ email }, (err, docs) => {
                    if (err) {
                        console.error('Error checking if email is taken:', err);
                        callback(err);
                    } else if (docs.length > 0) {
                        // Found a student with the same email
                        callback(null, 'student');
                    } else {
                        Admin.find({ email }, (err, docs) => {
                            if (err) {
                                console.error(
                                    'Error checking if email is taken:',
                                    err
                                );
                                callback(err);
                            } else if (docs.length > 0) {
                                // Found a admin with the same email
                                callback(null, 'admin');
                            } else {
                                callback(null, null);
                            }
                        });
                    }
                });
            }
        });
    },

    banUser: (user_id, callback) => {
        Tutor.findByIdAndUpdate(user_id, { $set: {banned: true}}, {new: true}, (err, newTutor) => {
            if (err) {
                console.log('Error banning user', err);
                return callback(err);
            }
            if (newTutor) {
                return callback(null, newTutor);
            }
            return Student.findByIdAndUpdate(user_id, { $set: {banned: true}}, {new: true}, (err, newStudent) => {
                if (err) {
                    console.log('Error banning user', err);
                    return callback(err);
                }
                if (newStudent) {
                    return callback(null, newTutor);
                }
                return callback('ID not found in Tutor or Student');
            });
        });
    },

    getBannedStudents: (callback) => {
        Student.find({ banned: true }, (err, students) => {
            if (err) {
                console.log('Error getting banned students', err);
                return callback(err);
            }
            return callback(null, students);
        });
    },

    getBannedTutors: (callback) => {
        Tutor.find({ banned: true }, (err, tutors) => {
            if (err) {
                console.log('Error getting banned tutors', err);
                return callback(err);
            }
            return callback(null, tutors);
        });
    },

    unbanStudent: (student_id, callback) => {
        Student.findByIdAndUpdate(student_id, { $set: { banned: false }}, {new: true}, (err, newStudent) => {
            if (err) {
                console.log('Error unbanning student', err);
                return callback(err);
            }
            return callback(null, newStudent);
        });
    },

    unbanTutor: (tutor_id, callback) => {
        Tutor.findByIdAndUpdate(tutor_id, { $set: { banned: false }}, {new: true}, (err, newTutor) => {
            if (err) {
                console.log('Error unbanning tutor', err);
                return callback(err);
            }
            return callback(null, newTutor);
        });
    },
};
