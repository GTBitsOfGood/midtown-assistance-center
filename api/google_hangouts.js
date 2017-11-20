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

	calendar.calendarList.list({
		auth: jwtClient
	}, function(err, res){
		if (err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});

	// calendar.events.list({
	//     auth: jwtClient,
	//     calendarId: 'primary',
	//     timeMin: (new Date()).toISOString(),
	//     maxResults: 10,
	//     singleEvents: true,
	//     orderBy: 'startTime'
	//   }, function(err, response) {
	//     if (err) {
	//       console.log('The API returned an error: ' + err);
	//       return;
	//     }
	//     var events = response.items;
	//     if (events.length == 0) {
	//       console.log('No upcoming events found.');
	//     } else {
	//       console.log('Upcoming 10 events:');
	//       for (var i = 0; i < events.length; i++) {
	//         var event = events[i];
	//         var start = event.start.dateTime || event.start.date;
	//         console.log('%s - %s', start, event.summary);
	//       }
	//     }
	//  });
});