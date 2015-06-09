'use strict';

var Reflux = require('reflux');
var moment = require('moment');

// actions
var eventActions = require('../actions/eventActions');

function genNewEvent(lastEvent) {
  lastEvent = lastEvent || {};
  var lastEndMoment = lastEvent.endTime ? moment(lastEvent.endTime, 'HH:mm') : moment();
  return {
    summary: '',
    description: '',
    location: lastEvent.location || '',
    startTime: lastEndMoment.format('HH:mm'),
    endTime: lastEndMoment.add(1, 'h').format('HH:mm'),
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
