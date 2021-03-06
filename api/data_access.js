const mongoose = require('mongoose');
const access_codes = require('./dao/access_code_dao');
const users = require('./dao/user_dao');
const session = require('./dao/session_dao');
const subjects = require('./dao/subject_dao');
const tutor_sessions = require('./dao/tutor_session_dao');
const schools = require('./dao/school_dao');
const tutor_session_requests = require('./dao/tutor_session_request_dao');
const ban = require('./dao/ban_dao');

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
    schools,
    session,
    subjects,
    tutor_sessions,
    tutor_session_requests,
    mongoDB,
    ban
};
