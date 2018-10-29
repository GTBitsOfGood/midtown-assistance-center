const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true},
    access_code: { type: String, required: true },
    school_code: { type: String, required: true }
});

module.exports = mongoose.model('AccessCode', schema);
