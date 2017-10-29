const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    _id: {type: String, required: true},
    password: {type: String, required: true},
    join_date: {type: Date, default: Date.now, required: false},
    status: {type: String, default: 'in review', required: false},
    profile_picture: {type: String, default: ''},
    bio: {type: String},
    resume: {type: String, default: ''},
    gpa: {type: Number},
    transcript: {type: String, default: ''},
    rating: {type: Number, default: 0},
    subjects: {type:[
        {
            subject: {type:String},
            start_grade: {type:Number},
            end_grade: {type:Number}
        }
    ], required:false},
    availability: {type:{
        Monday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required:false
        ]},
        Tuesday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required:false
        ]},
        Wednesday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required:false
        ]},
        Thursday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required:false
        ]},
        Friday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required:false
        ]},
        Saturday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required: false
        ]},
        Sunday: {type: [
            {
                start_time: {type:String},
                end_time: {type:String}
            },
            required: false
        ]},
    }},
    gender: {type:String},
    online: {type:Boolean}

});

schema.virtual('username').get(function() {
    return this._id;
});

module.exports = mongoose.model('Tutor', schema);