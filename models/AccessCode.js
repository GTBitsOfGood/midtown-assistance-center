var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  code: {type: String, required: true},
  classroom: {type: String, require: true}
});

module.exports = mongoose.model('AccessCode', schema);