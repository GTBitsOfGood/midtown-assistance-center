const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    access_code: { type: String, required: true },
    school: { type: Schema.Types.ObjectId, required: true }
});

module.exports = mongoose.model('AccessCode', schema);
