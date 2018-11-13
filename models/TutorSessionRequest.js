const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joinRequest = new Schema({
    _id: {
        type: {
            tutor_id: {
                type: Schema.Types.ObjectId,
                ref: 'Tutor',
                required: true
            },
            student_id: {
                type: Schema.Types.ObjectId,
                ref: 'Student',
                required: true
            },
            create_time: { type: Date, default: Date.now(), required:true }
        }
    },
    topic: { type: String, required: true },
    student_comment: { type: String, required: false },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    tutor_comment: { type: String, required: false }
});

module.exports = mongoose.model('TutorSessionRequest', joinRequest);
