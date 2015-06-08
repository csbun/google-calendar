'use strict';

var Reflux = require('reflux');
var superagent = require('superagent');

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
    var that = this;
    // load events from google api
    superagent.get('/dayEvents')
      .query({ date: +date })
      .accept('json')
      .end(function (err, res) {
        dayEvents = (res.body || '').items;
        that.trigger(dayEvents);
      });
  },

  onCreateEvent: function (ev) {
    var that = this;
    superagent.post('/dayEvent')
      .send(ev)
      .accept('json')
      .end(function (err, res) {
        console.log(res);
        // todo check result
        // dayEvents = (res.body || '').items;
        // 成功则重新加载
        // dayEventActions.reloadEvents();
      });
  }

});
