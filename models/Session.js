const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    type: {type: String, required: true},
    _id: {type: String, required: true},
    time: {type: Date, required: true}
});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Session', schema);