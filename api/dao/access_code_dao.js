const AccessCode = require('../../models/AccessCode');

module.exports = {

  validateAccessCode: function (accessFolder, callback) {
    AccessCode.find({code: accessFolder}, function (err, docs) {
      if (err) {
        console.log('Error checking retrieving school is taken: ', err);
      } else if (docs.length === 1) {
        callback(docs[0]);
      } else if (docs.length > 1) {
        console.log('Multiple access code:', accessFolder);
      } else {
        callback(null);
      }
    });
  }

};