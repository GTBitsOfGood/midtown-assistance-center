const Tutor = require('../../models/Tutor');
const Student = require('../../models/Student');

module.exports = {

  checkIfUsernameIsTaken: function(username, callback) {
    
    // Look for tutors with the same username
    Tutor.find({_id: username}, function (err, docs) {
      if (err) {
        console.error('Error checking if username is taken:', err);
        callback(err, null);
      
      } else if (docs.length > 0) {
        // Found a tutor with the same username
        callback(null, true);
        
      } else {
        
        // Look for students with the same username
        Student.find({_id: username}, function (err, docs) {
          if (err) {
            console.error('Error checking if username is taken:', err);
            callback(err, null);
          
          } else if (docs.length > 0) {
            // Found a student with the same username
            callback(null, true);
          
          } else {
            // No student or tutor found with that username!
            callback(null, false);
          }
        });
      }
    });
  },

  checkIfEmailIsTaken: function(email, callback) {
    // Look for tutors with the same email
    Tutor.find({email: email}, function (err, docs) {
      if (err) {
        console.error('Error checking if email is taken:', err);
        callback(err, null);

      } else if (docs.length > 0) {
        // Found a tutor with the same email
        callback(null, true);

      } else {

        // Look for students with the same email
        Student.find({email: email}, function (err, docs) {
          if (err) {
            console.error('Error checking if email is taken:', err);
            callback(err, null);

          } else if (docs.length > 0) {
            // Found a student with the same email
            callback(null, true);

          } else {
            // No student or tutor found with that email!
            callback(null, false);
          }
        });
      }
    });
  },

  createStudent: function(student, callback) {
    Student.create(student, function (err, student_instance) {
      if (err) {
        console.error('Error creating a new student:', err);
        callback(err, null);
      } else {
        callback(null, student_instance);
      }
    });
  },

  createTutor: function(tutor, callback) {
    Tutor.create(tutor, function (err, tutor_instance) {
      if (err) {
        console.error('Error creating a new tutor:', err);
        callback(err, null);
      } else {
        callback(null, tutor_instance);
      }
    });
  },

  getUser: function(username, callback) {
    // TODO figure out API to integrate with passport

    // Look for tutors with the same username
    Tutor.find({_id: username}, function (err, docs) {
      if (err) {
        console.error('Error checking if username is taken:', err);
        callback(err, null);

      } else if (docs.length === 1) {
        // Found a tutor with the same username
        callback(null, docs[0]);
      } else if (docs.length > 1) {
        console.error('Multiple tutors with username', username);

      } else {

        // Look for students with the same username
        Student.find({_id: username}, function (err, docs) {
          if (err) {
            console.error('Error checking if username is taken:', err);
            callback(err, null);

          } else if (docs.length === 1) {
            // Found a student with the same username
            callback(null, docs[0]);
          } else if (docs.length > 1) {
            console.error('Multiple students with username', username);

          } else {
            // No tutors or students with that username!
            callback(null, null);
          }
        });
      }
    });
  }

};