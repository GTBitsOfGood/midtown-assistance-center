import Tutor from '../models/Tutor';
import Student from '../models/Student';
import AccessCode from '../models/AccessCode';


// TODO: write functions for access code
// mongodb://<dbuser>:<dbpassword>@ds149934.mlab.com:49934/mac-info
// admin / gatech

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

  },

  getClassroom: function(code) {
    AccessCode.find({code: code}, function (err, docs) {
      if (err) {
        console.log('Error checking retrieving school is taken: ', err);
      }
      return docs;
    });
  }
};