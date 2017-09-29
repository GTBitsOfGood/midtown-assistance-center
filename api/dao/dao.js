const access_codes = require('./access_code_dao');
const users = require('./user_dao');
const mongoose = require('mongoose');

// Set up default mongoose connection
const mongoDB = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDB, {
  useMongoClient: true
});

// Get the default connection
let db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));