const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const calendar = google.calendar('v3');
const googleAuth = require('google-auth-library');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

const secrets = require('./client_sec2.json');

const clientSecret = secrets.installed.client_secret;
const clientId = secrets.installed.client_id;
const edirectUrl = secrets.installed.redirect_uris[0];
const auth = new googleAuth();
const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
oauth2Client.credentials.refresh_token =
    '1/5NsatDnRYj8CM8Xj6sH5-hAYUCN1iFhunGO7ldjog6U';

module.exports = {
    auth: oauth2Client,
    calendar: calendar
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

// function getNewToken(callback) {
//   // const authUrl = oauth2Client.generateAuthUrl({
//   //   access_type: 'offline',
//   //   prompt: 'consent',
//   //   scope: SCOPES
//   // });
//     oauth2Client.refreshAccessToken(function(err, token) {
//       if (err) {
//         console.log('hello');
//         console.log('Error while trying to retrieve access token', err);
//         return;
//       }
//       oauth2Client.credentials = token;
//       callback();
//     });
// }

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
// function storeToken(token) {
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('Token stored to ' + TOKEN_PATH);
// }

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
// function listEvents() {
//   // calendar.calendarList.list({
//   //   auth: auth
//   // }, function (err, response) {
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     let events = response.items;
//   //     console.log(response);
//   //   }
//   // });
//   calendar.events.insert({
//     auth: oauth2Client,
//     calendarId: 'nareddy.com_3bu07kl04nju7vee4d0hsk08kg@group.calendar.google.com',
//     resource: {
//       "summary": "bye",
//       "attachments": [
//         {
//           "fileUrl": ""
//         }
//       ],
//       "attendees": [
//         {
//           "email": "ganapathy.hari.narayan@gatech.edu"
//         }
//       ],
//       "start": {
//         "dateTime": "2017-11-22T09:00:00-07:00",
//         "timeZone": "America/Los_Angeles"
//       },
//       "end": {
//         "dateTime": "2017-11-22T09:00:00-09:00",
//         "timeZone": "America/Los_Angeles"
//       },
//       "reminders": {
//         "useDefault": false,
//         "overrides": [
//           {
//             "method": "email",
//             "minutes": 10
//           },
//           {
//             "method": "popup",
//             "minutes": 10
//           }
//         ]
//       }
//   }}, function(err, response){
//     console.log(response);
//   });
//   // calendar.calendars.insert({
//   //   auth: auth,
//   //   summary: "MAC_tutor",
//   //   description: "Shows you all possible tutoring sessions"
//   // },function(err, response){

//   // });
//   // calendar.events.list({
//   //   auth: auth,
//   //   calendarId: 'primary',
//   //   timeMin: (new Date()).toISOString(),
//   //   maxResults: 10,
//   //   singleEvents: true,
//   //   orderBy: 'startTime'
//   // }, function(err, response) {
//   //   if (err) {
//   //     console.log('The API returned an error: ' + err);
//   //     return;
//   //   }
//   //   console.log(response);
//   // });

//   // calendar.calendars.insert({
//   //   auth: auth,
//   //   resource: {
//   //     summary: "newCal"
//   //   }
//   // }, function(err, res){
//   //   if (err) {
//   //     console.log(err);
//   //   } else {
//   //     console.log(res);
//   //   }
//   // });
// }
