'use strict';

var google = require('googleapis');
var oauth = require('./oauth');

var calendar = google.calendar('v3');

exports.init = function (app) {
  app.get('/index', function * (next) {
    console.log('index');
    this.body = 'index';
    yield next;
  });

  app.get('/colors', function * (next) {
    calendar.colors.get({
      auth: oauth.getClient()
    }, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
    yield next;
  });
};
