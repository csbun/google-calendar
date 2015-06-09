'use strict';

var moment = require('moment');
var router = require('koa-router')();

var google = require('googleapis');
var oauth = require('./oauth');

/**
 * API document:
 * https://developers.google.com/google-apps/calendar/v3/reference/
 */
var calendar = google.calendar('v3');

router.get('/index', function * (next) {
  console.log('index');
  this.body = 'index';
  yield next;
});

router.get('/colors', function * () {
  this.body = yield function (cb) {
    calendar.colors.get({
      auth: oauth.getClient()
    }, cb);
  };
});


/**
 * 获取日历列表
 */
router.get('/calendars', function * () {
  this.body = yield function (cb) {
    calendar.calendarList.list({
      auth: oauth.getClient()
    }, cb);
  };
});
// [{
//   "id": "1b2rqi013kj4llo7n9vmi8k0r8@group.calendar.google.com",
//   "summary": "Life",
// }, {
//     "id": "vac63k1hq28ss6jrmqd9t6m70g@group.calendar.google.com",
//     "summary": "菜菜肉肉",
// }, {
//     "id": "icsbun@gmail.com",
//     "summary": "icsbun@gmail.com",
//     "primary": true
// }, {
//     "id": "#contacts@group.v.calendar.google.com",
//     "summary": "生日",
// }, {
//     "id": "zh.china#holiday@group.v.calendar.google.com",
//     "summary": "Holidays in China",
// }]


router.get('/dayEvents', function * () {
  var now = new Date(+(this.query || '').date || undefined);
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();

  var res = yield function (cb) {
      calendar.events.list({
        auth: oauth.getClient(),
        calendarId: 'icsbun@gmail.com',
        timeMin: (new Date(year, month, date)).toISOString(),
        timeMax: (new Date(year, month, date + 1)).toISOString(),
        // maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime'
      }, cb);
    };
  this.body = (res || [])[0] || {};
});


/**
 * 格式化时间
 */
function formatDateTime (date, timeString) {
  return moment(date).format('YYYY-MM-DD') + 'T' +
    moment(timeString, 'HH:mm').format('HH:mm:ssZZ');
}

router.post('/dayEvent', function * () {
  var requestBody = this.request.body;
  var ev = {
    summary: requestBody.summary,
    location: requestBody.location || '',
    description: requestBody.description || '',
    start: {
      dateTime: formatDateTime(requestBody.date, requestBody.startTime)
    },
    end: {
      dateTime: formatDateTime(requestBody.date, requestBody.endTime)
    },
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [],
    }
  };
  var res = yield function (cb) {
      calendar.events.insert({
        auth: oauth.getClient(),
        calendarId: 'icsbun@gmail.com',
        resource: ev
      }, cb);
    };
  this.body = (res || [])[0] || {};
});

module.exports = router.routes();
