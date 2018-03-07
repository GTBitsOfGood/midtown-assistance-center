//This file is the schema for the TutorSession.
//What? The tutor session is the session object created when a tutoring session is created
//Why? It would be helpful to keep track of what happens during a session and who attends
//When? A Tutor Session object will be created when a tutor session starts (A student joins a session)
//Who? Many students and a single tutor can be in a session and this object tracks that information
//How? This session object will be stored in the database when the tutoring session ends

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    students_attended: {type:{
        student_id: {type: String},
        student_rating: {type: Number}, 
        time: {type: Date}
    }, required: true},
    tutor_rating: {type: Number, required: true},
    tutor_comment: {type: String, required: true},
    tutor_id: {type: String, required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    expected_start_time: {type: Date, required: true},
    expected_end_time: {type: Date, required: true}
});

module.exports = mongoose.model('TutorSession', schema);