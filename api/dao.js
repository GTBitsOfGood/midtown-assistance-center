import Tutor from '../models/Tutor';
import Student from '../models/Student';

module.exports = {
  checkIfUsernameIsTaken: function(username, callback) {
    Tutor.find({_id: username}, function (err, docs) {
      if (err) {
        console.log('Error checking if username is taken: ', err);
      } else if (docs.length > 0) {
        callback(true);
      } else {
        Student.find({_id: username}, function (err, docs) {
          if (err) {
            console.log('Error checking if username is taken: ', err);
          } else if (docs.length > 0) {
            callback(true);
          } else {
            callback(false);
          }
        });
      }
    });
  },

  checkIfEmailIsTaken: function(email) {

  },

  validateAccessCode: function(accessFolder) {

  },

  createUser: function(user) {

  },

  getUser: function(loginDetails) {

  }
};