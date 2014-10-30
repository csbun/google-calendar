var fs = require('fs');

// Google
var google = require('googleapis');

var oauth = require('./oauth');
var oauth2Client = oauth();

var calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client
});

var handlerFactory = function (cb) {
    return function (err, response) {
        if (err) {
            console.log('[ERROR]');
            console.log(err);
            if (err.code === 401) {
                oauth(true);
            }
        } else if (cb && typeof cb === 'function') {
            cb(response);
        }
    }
}

/*
 * google api
 * https://developers.google.com/google-apps/calendar/v3/reference/
 */

// calendar.calendarList.list(function (err, response) {
//     console.log(response);
// });
calendar.events.list({
    calendarId: 'icsbun@gmail.com',
    // timeMin: (new Date()) - 1000*60*60*24*3,
    // timeMax: (new Date()) - 1000*60*60*24*100,
    maxResults: 10
}, handlerFactory(function (response) {
    console.log('=======');
    console.log(response);
}));
