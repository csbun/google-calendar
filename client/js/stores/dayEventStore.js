'use strict';

var Reflux = require('reflux');

// actions
var dayEventActions = require('../actions/dayEventActions');

var dayEvents = [];

module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  listenables: [dayEventActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return dayEvents;
  },

  // bind to actions
  onReloadEvents: function (date) {
    // todo: load events from google api
    this.trigger(dayEvents);
  }

});
