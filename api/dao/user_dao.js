import Tutor from '../../models/Tutor';
import Student from '../../models/Student';

module.exports = {

  checkIfUsernameIsTaken: function(username, callback) {
    
    // Look for tutors with the same username
    Tutor.find({_id: username}, function (err, docs) {
      if (err) {
        console.error('Error checking if username is taken:', err);
      
      } else if (docs.length > 0) {
        // Found a tutor with the same username
        callback(true);
        
      } else {
        
        // Look for students with the same username
        Student.find({_id: username}, function (err, docs) {
          if (err) {
            console.error('Error checking if username is taken:', err);
          
          } else if (docs.length > 0) {
            // Found a student with the same username
            callback(true);
          
          } else {
            // No student or tutor found with that username!
            callback(false);
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

      } else if (docs.length > 0) {
        // Found a tutor with the same email
        callback(true);

      } else {

        // Look for students with the same email
        Student.find({email: email}, function (err, docs) {
          if (err) {
            console.error('Error checking if email is taken:', err);

          } else if (docs.length > 0) {
            // Found a student with the same email
            callback(true);

          } else {
            // No student or tutor found with that email!
            callback(false);
          }
        });
      }
    });
  },

  createStudent: function(student, callback) {
    Student.create(student, function (err, student_instance) {
      if (err) {
        console.error('Error creating a new student:', err);
      } else {
        callback(student_instance);
      }
    });
  },

  createTutor: function(tutor, callback) {
    Tutor.create(tutor, function (err, tutor_instance) {
      if (err) {
        console.error('Error creating a new tutor:', err);
      } else {
        callback(tutor_instance);
      }
    });
  },

  getUser: function(loginDetails, callback) {
    // TODO figure out API to integrate with passport
  }

};