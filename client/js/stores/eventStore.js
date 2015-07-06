'use strict';

var Reflux = require('reflux');
var moment = require('moment');

// actions
var eventActions = require('../actions/eventActions');

function genNewEvent(lastEvent) {
  lastEvent = lastEvent || {};
  var startTimeMonent = moment(lastEvent.endTime || new Date());
  var endTimeMonent = moment(lastEvent.endTime || new Date()).add(1, 'h');
  return {
    summary: '',
    description: '',
    location: lastEvent.location || '',
    startTime: startTimeMonent.toDate(),
    endTime: endTimeMonent.toDate(),
    type: lastEvent.type || '',
  };
}

var newEvent = genNewEvent();

module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  listenables: [eventActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return newEvent;
  },

  // bind to actions
  onResetEvent: function (lastEvent) {
    newEvent = genNewEvent(lastEvent);
    this.trigger(newEvent);
  }


});
