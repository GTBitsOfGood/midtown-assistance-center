const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    school_name: { type: String, required: true },
    school_code: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        zip_code: { type: String, required: true },
        state: { type: String, required: true }

    }
});

module.exports = mongoose.model('School', schema);
