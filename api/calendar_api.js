var express = require('express');
var app = express();
var google = require('./google_hangouts.js');
var moment = require('moment');
import data_access from './data_access';

app.post('/createNewCalendar', function(req, res){
	let tutorId = req.body.id;
  console.log('Tutor id: ' + tutorId);
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

      let calId = response.id;

      // code to update the tutor db with the calendar for the tutor
      data_access.users.getUser(tutorId, function(err, tutor) {
        if (err) {
          return res.send({
            success: false,
            payload: null,
            error: error
          });
        }

        // Update the tutor with the calendar id that was just created for him
        tutor.calendarId = calId;

        data_access.users.saveTutor(tutor, function(err, updatedTutor) {
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
  let calId = req.body.calId;
	let startTime = req.body.startTime;
	let endTime = req.body.endTime;
  let tutorEmail = req.body.email;

	let currDateStart = moment();
	currDateStart.hour(startTime.split(":")[0]);
	currDateStart.minute(startTime.split(":")[1]);

	let currDateEnd = moment();
	currDateEnd.hour(endTime.split(":")[0]);
	currDateEnd.minute(endTime.split(":")[1]);

	


	let startDateString = currDateStart.format("YYYY-MM-DDTHH:mm:ss");
	let endDateString = currDateEnd.format("YYYY-MM-DDTHH:mm:ss");

  console.log(startDateString);

  console.log(endDateString);

  google.auth.refreshAccessToken(function(err, token) {
    if (err) {
      console.log('hello');
      console.log('Error while trying to retrieve access token', err);
      res.json({
          success: false,
          link: false,
          error: err
      });
      return;
    }
    google.auth.credentials = token;

    google.calendar.events.insert({
      auth: google.auth,
      calendarId: calId,
      resource: {
        "summary": "tutor session",
        "attendees": [
          {
            "email": tutorEmail,
          },
          {
            "email": "tejunareddy@gmail.com"
          }
        ],
        "start": {
          "dateTime": startDateString,
          "timeZone": "America/New_York"
        },
        "end": {
          "dateTime": endDateString,
          "timeZone": "America/New_York"
        }
    }}, function(err, response){
      if (err) {
        console.log(err);
        res.json({
          success: false,
          link: false,
          error: err
        });
        return;
      }
      
      console.log(response.hangoutLink);
      // code to update the tutor db with the hangout link for the tutor
      data_access.users.getUser(tutorId, function(err, tutor) {
        if (err) {
          return res.send({
            success: false,
            payload: null,
            error: error
          });
        }

        // Update the tutor with the hangout link that was just created for him
        tutor.hangoutsLink = response.hangoutLink;

        data_access.users.saveTutor(tutor, function(err, updatedTutor) {
          if (err) {
            return res.send({
              success: false,
              payload: null,
              error: error
            });
          }

          res.json({
            success: true,
            link: response.hangoutLink,
            error: null
          });
        });

      });
    });


  });

	//TODO: make db call to get calendarId using tutorId
	//TODO: add googlehangouts link to the tutor in the db to show that they are in session




});

export default app;
