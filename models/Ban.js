const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    reporter: { type: String, required: true },
    reporterType: { type: String, required: true },
    personOfInterest: { type: String, required: true },
    time: { type: Date, default: Date.now },
    banned: { type: Boolean, default: false },
    explanation: { type: String, default: '' },
});

module.exports = mongoose.model('Ban', schema);
