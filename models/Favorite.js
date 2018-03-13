const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    // title: {type: String, required: true},
    _id: {type: String, required: true},
    subject: {type: Schema.Types.ObjectId, ref: 'Subject'}
});

module.exports = mongoose.model('Favorite', schema);