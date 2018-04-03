const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    _id: {type: String, required: true},
    password: {type: String, required: true},
    school: {type:String, required: false}//super admin wouldn't need school?
    classroom: {type: String, required: false}//
    isSuperAdmin: {type: boolean, required: true}

});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Admin', schema);