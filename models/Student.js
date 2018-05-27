const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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

//before saving a model, use bcypt to hash password
schema.pre('save', function(next) {
    console.log('pre save');
    //get access to user model
    const user = this;

    //generate a salt, then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        //hash password using salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            //overwrite plain text pass w/ encrypted pass
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Student', schema);
