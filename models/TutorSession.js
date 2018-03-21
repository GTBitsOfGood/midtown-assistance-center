/**
 * @file
 * TutorSession.js
 *
 * @fileoverview
 * This file is the schema for the TutorSession.
 * What? The tutor session is the session object created when a tutoring session is created
 * Why? It would be helpful to keep track of what happens during a session and who attends
 * When? A Tutor Session object will be created when a tutor session starts (A student joins a session)
 * Who? Many students and a single tutor can be in a session and this object tracks that information
 * How? This session object will be stored in the database when the tutoring session ends
 *
 * @type {*|Mongoose}
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentReview = new Schema({
    student_id: {type: String, required: true},
    student_rating: {type: Number, default: null},
    student_comment: {type: String, default: null},
    time: {type: Date, required: true}
});

let schema = new Schema({
    _id: {type:
            {
                tutor_id: {type: Schema.Types.ObjectId, ref:'Tutor', required: true},
                expected_start_time: {type: Date, required: true}
            }
    },
    students_attended: {type: [studentReview], default: []},
    eventId: {type: String, required: true},
    hangouts_link: {type: String, required: false},
    tutor_rating: {type: Number, required: false},
    tutor_comment: {type: String, required: false},
    end_time: {type: Date, required: false},
    start_time: {type: Date, required: true},
    expected_end_time: {type: Date, required:true},
});

module.exports = mongoose.model('TutorSession', schema);