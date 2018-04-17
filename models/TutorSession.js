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
    student_id: { type: String, required: true },
    student_rating: { type: Number, default: null },
    student_comment: { type: String, default: null },
    time: { type: Date, required: true },
    reported: { type: Boolean, default: false },
    reason_for_report: { type: String, required: false }
});

let joinRequest = new Schema({
    student_id: { type: String, required: true },
    topic: { type: String, required: true },
    student_comment: { type: String, required: false },
    create_time: { type: Date, default: Date.now() },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    tutor_comment: { type: String, required: false }
});

let schema = new Schema({
    _id: {
        type: {
            tutor_id: {
                type: Schema.Types.ObjectId,
                ref: 'Tutor',
                required: true
            },
            expected_start_time: { type: Date, required: true }
        }
    },
    students_attended: { type: [studentReview], default: [] },
    join_requests: { type: [joinRequest], default: [] },
    eventId: { type: String, required: true },
    hangouts_link: { type: String, required: false },
    tutor_rating: { type: Number, required: false },
    tutor_comment: { type: String, required: false },
    end_time: { type: Date, required: false },
    start_time: { type: Date, required: true },
    expected_end_time: { type: Date, required: true }
});

// get the average rating for this session
schema.methods.getRating = function() {
    let numRatings = this.students_attended.reduce(function(
        accumulator,
        current
    ) {
        if (current.student_rating) {
            return accumulator + 1;
        }
        return accumulator;
    },
    0);
    let sumRatings = this.students_attended.reduce(function(
        accumulator,
        current
    ) {
        if (current.student_rating) {
            return accumulator + current.student_rating;
        }
        return accumulator;
    },
    0);

    return numRatings != 0 ? sumRatings / numRatings : null;
};

// get the total number of ratings for this session
schema.methods.getNumRatings = function() {
    let numRatings = this.students_attended.reduce(function(
        accumulator,
        current
    ) {
        if (current.student_rating) {
            return accumulator + 1;
        }
        return accumulator;
    },
    0);

    return numRatings;
};

// get the duration of this session
schema.methods.getDuration = function() {
    return this.end_time - this.start_time;
};

// get the total number of students that attended this session
schema.methods.getNumStudents = function() {
    return this.students_attended.length;
};

module.exports = mongoose.model('TutorSession', schema);
