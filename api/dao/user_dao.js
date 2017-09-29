import Tutor from '../../models/Tutor';
import Student from '../../models/Student';

module.exports = {

  checkIfUsernameIsTaken: function(username, callback) {
    
    // Look for tutors with the same username
    Tutor.find({_id: username}, function (err, docs) {
      if (err) {
        console.warn('Error checking if username is taken: ', err);
      
      } else if (docs.length > 0) {
        // Found a tutor with the same username
        callback(true);
        
      } else {
        
        // Look for students with the same username
        Student.find({_id: username}, function (err, docs) {
          if (err) {
            console.warn('Error checking if username is taken: ', err);
          
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
        console.warn('Error checking if email is taken: ', err);

      } else if (docs.length > 0) {
        // Found a tutor with the same email
        callback(true);

      } else {

        // Look for students with the same email
        Student.find({email: email}, function (err, docs) {
          if (err) {
            console.warn('Error checking if email is taken: ', err);

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

  validateAccessCode: function(accessFolder) {

  },

  createUser: function(user) {

  },

  getUser: function(loginDetails) {

  }
};