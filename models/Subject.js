const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    // title: {type: String, required: true},
    _id: { type: String, required: true }
});

module.exports = mongoose.model('Subject', schema);
