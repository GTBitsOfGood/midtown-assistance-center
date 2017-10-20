const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    _id: {type: String, required: true},
    password: {type: String, required: true},
    join_date: {type: Date, default: Date.now, required: true},
    status: {type: String, default: 'in review', required: true},
    profile_picture: {type: String, default: ''},
    bio: {type: String},
    resume: {type: String, default: ''},
    gpa: {type: Number},
    transcript: {type: String, default: ''},
    points: {type: Number, default: 0}
});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Tutor', schema);