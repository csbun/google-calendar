var CALENDAR_ID = 'icsbun@gmail.com';
// var TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

var google = require('googleapis');
var moment = require('moment');

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
 * [google api](https://developers.google.com/google-apps/calendar/v3/reference/)
 * [nodejs-client](https://github.com/google/google-api-nodejs-client)
 */

// 列出今天的事件
exports.list = function () {
    var today = moment(0, 'HH');
    calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: today.format(),
        timeMax: today.add(1, 'd').format(),
        maxResults: 10
    }, handlerFactory(function (response) {
        if (response.items && response.items.length) {
            var i = 0,
                item;
            for (; i < response.items.length; i++) {
                item = response.items[i];
                console.log(
                    '[' + moment(item.start.dateTime).format('HH:mm') + ' - ' +
                    moment(item.end.dateTime).format('HH:mm') + '] ' +
                    item.summary
                );
            }
        }
    }));
};

// 写入一个事件
// TODO: summary、description 时间等未设定
exports.set = function () {
    calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: {
            start: {
              dateTime: moment().format()
            }, 
            end: {
              dateTime: moment().add(1, 'h').format()
            }, 
            summary: "winning @ life",
            description: "winning @ life description"
        }
    }, handlerFactory(function (response) {
        console.log(response);
    }));
};
