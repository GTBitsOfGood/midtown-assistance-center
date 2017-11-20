var google = require('googleapis');
var key = require('./google_secret.json');
var calendar = google.calendar('v3');
var jwtClient = new google.auth.JWT(
	key.client_email,
	null,
	key.private_key,
	['https://www.googleapis.com/auth/calendar'],
	null
);

jwtClient.authorize(function(err, tokens){
	if (err) {
		console.log(err);
		return;
	}

	

	// calendar.calendars.insert({
	// 	auth: jwtClient,
	// 	resource: {
	// 		"summary": "Tutor1",
	// 		"timeZone": "America/New_York"
	// 	}
	// }, function(error, res){
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log(res);
	// 		calendar.calendarList.list({
	// 			auth: jwtClient
	// 		}, function(err, res){
	// 			if (err) {
	// 				console.log(err);
	// 			} else {
	// 				console.log(res);
	// 			}
	// 		});
			
	// 	}
	// });

	var event = {
	  'summary': 'Google I/O 2015',
	  'location': '800 Howard St., San Francisco, CA 94103',
	  'description': 'A chance to hear more about Google\'s developer products.',
	  'start': {
	    'dateTime': '2018-05-28T09:00:00-07:00',
	    'timeZone': 'America/New_York'
	  },
	  'end': {
	    'dateTime': '2018-05-28T17:00:00-07:00',
	    'timeZone': 'America/New_York'
	  }
	};

	// calendar.events.insert({
	// 	auth: jwtClient,
	// 	calendarId: "6v8snee6ahian410ujvu7nc8f4@group.calendar.google.com",
	// 	resource: event
	// }, function(error, res){
	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log(res);


	// 	}
	// });

	calendar.events.get({
				auth: jwtClient,
				calendarId: "mac@nareddy.com",
				eventId: "431eitccdib9ec9pb5oeqgagaq"
			}, function(error, res){
				if (error) {
					console.log(error);
				} else {
					console.log(res);
				}
			});

	// calendar.events.list({
	//     auth: jwtClient,
	//     calendarId: 'mac@nareddy.com',
	//     timeMin: (new Date()).toISOString(),
	//     maxResults: 10,
	//     singleEvents: true,
	//     orderBy: 'startTime'
	//   }, function(err, response) {
	//     if (err) {
	//       console.log('The API returned an error: ' + err);
	//       return;
	//     }
	//     console.log(response);
	//  });
});