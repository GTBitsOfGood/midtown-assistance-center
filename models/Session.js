const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  type: { type: String, required: true }, //"type = {"Login", "Logout"}
  username: { type: String, required: true },
  time: { type: Date, required: true }
});

module.exports = mongoose.model('Session', schema);
