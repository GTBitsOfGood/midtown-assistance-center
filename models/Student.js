const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  _id: { type: String, required: true },
  password: { type: String, required: true },
  join_date: { type: Date, default: Date.now, required: true },
  bio: { type: String, default: '' },
  profile_picture: { type: String, default: '' },
  classroom: { type: String, required: true },
  grade_level: { type: Number, required: true }
});

schema.virtual('username').get(function() {
  return this._id;
});

module.exports = mongoose.model('Student', schema);
