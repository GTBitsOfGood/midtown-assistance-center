const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    reporter: { type: String, required: true },
    reporterType: { type: String, required: true },
    personOfInterest: { type: String, required: true },
    time: { type: Date, default: Date.now },
    banned: { type: Boolean, default: false },
    explanation: { type: String, default: '' },
    reviewed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Ban', schema);
