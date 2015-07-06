'use strict';

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


/**
 * 加载 Event 列表
 */
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
 * 添加 Event
 */
router.put('/dayEvent', function * () {
  var requestBody = this.request.body;
  var ev = {
    summary: requestBody.summary,
    location: requestBody.location || '',
    description: requestBody.description || '',
    start: {
      dateTime: requestBody.startTime
    },
    end: {
      dateTime: requestBody.endTime
    },
    colorId: requestBody.type,
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


/**
 * 删除 Event
 * TODO: 404 Not Found
 */
router.del('/dayEvent', function * () {
  var requestBody = this.request.body;
  console.log(requestBody);
});


module.exports = router.routes();
