const mongoose = require('mongoose');
const access_codes = require('./dao/access_code_dao');
const users = require('./dao/user_dao');
const session = require('./dao/session_dao');

// Set up default mongoose connection
const mongoDB = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDB, {
    useMongoClient: true
});

// Get the default connection
let db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    users,
    access_codes,
    session,
    mongoDB
};