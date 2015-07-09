'use strict';

var router = require('koa-router')();
var moment = require('moment');
var google = require('googleapis');
var oauth = require('./oauth');

/**
 * API document:
 * https://developers.google.com/google-apps/calendar/v3/reference/
 */
var calendar = google.calendar('v3');

router.get('/index', function * (next) {
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
  var res = yield function (cb) {
    calendar.calendarList.list({
      auth: oauth.getClient()
    }, cb);
  };
  this.body = (res || [])[0] || {};
});

/**
 * 加载 Event 列表
 */
router.get('/dayEvents', function * () {
  var date = moment(+this.query.date || undefined);
  var res = yield function (cb) {
      calendar.events.list({
        auth: oauth.getClient(),
        calendarId: this.query.calendarId || 'primary',
        timeMin: date.toISOString(),
        timeMax: date.add(1, 'd').toISOString(),
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
  // TODO: get calendarId
  var calendarId = this.query.calendarId || 'primary';
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
        calendarId: calendarId,
        resource: ev
      }, cb);
    };
  this.body = (res || [])[0] || {};
});


/**
 * 删除 Event
 */
router.del('/dayEvent', function * () {
  var requestBody = this.request.body;
  // TODO: get calendarId
  var res = yield (cb) => {
      calendar.events.delete({
        auth: oauth.getClient(),
        calendarId: 'icsbun@gmail.com',
        eventId: requestBody.id
      }, cb);
    };
  // if success, res[0] === undefined
  this.body = {
    success: res.length === 2 && res[0] === undefined
  };
});


module.exports = router.routes();
