var express = require('express');
var app = express();
var google = require('./google_hangouts.js');
var moment = require('moment');
import data_access from './data_access'

app.post('/createNewCalendar', function(req, res){
	let tutorId = req.body.id;
	google.auth.refreshAccessToken(function(err, token) {
    if (err) {
      console.log('hello');
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    google.auth.credentials = token;
    google.calendar.calendars.insert({
      auth: google.auth,
      resource: {
        summary: tutorId + "_cal",
        timeZone: "America/New_York"
      }
    }, function(error, response) {
      if (error) {
        return res.send({
          success: false,
          payload: null,
          error: error
        });
      }

      let calId = response.data.id;

      // code to update the tutor db with the calendar for the tutor
      data_access.users.getUser(tutorId, new function(err, tutor) {
        if (err) {
          return res.send({
            success: false,
            payload: null,
            error: error
          });
        }

        // Update the tutor with the calendar id that was just created for him
        tutor.calendarId = calId;

        data_access.users.saveTutor(tutor, new function(err, updatedTutor) {
          if (err) {
            return res.send({
              success: false,
              payload: null,
              error: error
            });
          }

          res.send({
            success: true,
            payload: updatedTutor
          });
        });

      });
    });
	});
});

app.post('/createEvent', function(req, res){
	let tutorId = req.body.tutorId;
	let startTime = req.body.startTime;
	let endTime = req.body.endTime;
	let currDateStart = moment();
	currDateStart.Hour(startTime.split(":")[0]);
	currDateStart.Minute(startTime.split(":")[1]);

	let currDateEnd = moment();
	currDateEnd.Hour(endTime.split(":")[0]);
	currDateEnd.Minute(endTime.split(":")[1]);

	console.log(currDateStart);

	console.log(currDateEnd);
	res.send("DUMMY");

	// let startDateString = startDate.format("YYYY-MM-DDTHH:mm:ss");
	// let endDateString = endDate.format("YYYY-MM-DDTHH:mm:ss");

	//TODO: make db call to get calendarId using tutorId
	//TODO: add googlehangouts link to the tutor in the db to show that they are in session



});

export default app;
