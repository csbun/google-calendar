'use strict';

var Reflux = require('reflux');
var superagent = require('superagent');

// actions
var calendarActions = require('../actions/calendarActions');
let progressActions = require('../actions/progressActions');

var calendars = [];

module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  listenables: [calendarActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: () => {
    return calendars;
  },

  // bind to actions
  onLoad: function () {
    var that = this;
    // load events from google api
    progressActions.setup();
    superagent.get('/calendars')
      .accept('json')
      .end((err, res) => {
        progressActions.setdown();
        calendars = (res.body || '').items;
        that.trigger(calendars);
      });
  }

});
