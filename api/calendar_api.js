var express = require('express');
var app = express();
var google = require('./google_hangouts.js');
var moment = require('moment');
import data_access from './data_access';

app.post('/createNewCalendar', function(req, res){
	let tutorId = req.body.id;
	google.auth.refreshAccessToken(function(err, token) {
      if (err) {
            console.log("error1");
            res.send({
                success: false,
                payload: null,
                error: err
            });
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        google.auth.credentials = token;
        google.calendar.calendars.insert({
            auth: google.auth,
            resource: {
                summary: tutorId + '_cal',
                timeZone: 'America/New_York'
            }
        }, function(error, response) {
            if (error) {
                console.log("error2");
                console.log(error);
                res.send({
                    success: false,
                    payload: null,
                    error: error
                });
                return;
            }

            let calId = response.id;
            console.log("br3");
            // code to update the tutor db with the calendar for the tutor
            data_access.users.getUser(tutorId, function(err, tutor) {
                if (err) {
                    res.send({
                        success: false,
                        payload: null,
                        error: error
                    });
                    return;
                }

                // Update the tutor with the calendar id that was just created for him
                tutor.calendarId = calId;

                data_access.users.saveTutor(tutor, function(err, updatedTutor) {
                    if (err) {
                        res.send({
                            success: false,
                            payload: null,
                            error: error
                        });
                        return;
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

  google.auth.refreshAccessToken(function(err, token) {
    if (err) {
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
        res.json({
          success: false,
          link: false,
          error: err
        });
        return;
      }
      
      // code to update the tutor db with the hangout link for the tutor
      data_access.users.getUser(tutorId, function(err, tutor) {
        if (err) {
          res.send({
            success: false,
            payload: null,
            error: error
          });
          return;
        }

        // Update the tutor with the hangout link that was just created for him
        tutor.tutoringEventId = response.id;

        data_access.users.saveTutor(tutor, function(err, updatedTutor) {
          if (err) {
            res.send({
              success: false,
              payload: null,
              error: error
            });
            return;
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

app.post('/studentGetHangoutLink', function(req, res){
  let eventId = req.body.eventId;
  let email = req.body.email;
  let calendarId = req.body.calendarId;

  google.auth.refreshAccessToken(function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      res.json({
          success: false,
          link: false,
          error: err
      });
      return;
    }
    google.auth.credentials = token;

    google.calendar.events.get({
      auth: google.auth,
      calendarId: calendarId,
      eventId: eventId
    }, function(err, response){
         let attend = response.attendees;
         attend.push({"email": email});
         google.calendar.events.update({
          auth: google.auth,
          calendarId: calendarId,
          eventId: eventId,
          resource: {
            "start": response.start,
            "end": response.end,
            "attendees": attend
          }
        }, function(err, response) {
          if (err) {
            res.send({
                success: false,
                payload: null,
                error: err
            });
            return
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

app.post('/endCalendarEvent', function(req, res){
  let tutorId = req.body.tutorId
  data_access.users.getUser(tutorId, function(err, tutor) {
    if (err) {
        res.send({
            success: false,
            payload: null,
            error: error
        });
        return;
    }
    let eventId = tutor.tutoringEventId;
    let calendarId = tutor.calendarId;

    tutor.tutoringEventId = "";

    data_access.users.saveTutor(tutor, function(err, updatedTutor) {
        if (err) {
            res.send({
                success: false,
                payload: null,
                error: error
            });
            return;
        }

        google.calendar.events.delete({
          auth: google.auth,
          calendarId: calendarId,
          eventId: eventId
        }, function(err, response){
          if (err) {
            res.send({
                success: false,
                payload: null,
                error: error
            });
            return;
          }

          res.send({
                success: true,
                payload: null,
                error: null
          });
          
        });
    });

  });
});

export default app;
