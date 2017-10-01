const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  code: {type: String, required: true},
  classroom: {type: String, required: true}
});

module.exports = mongoose.model('AccessCode', schema);
