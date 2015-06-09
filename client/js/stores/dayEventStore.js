'use strict';

var Reflux = require('reflux');
var superagent = require('superagent');

// actions
var dayEventActions = require('../actions/dayEventActions');
let newEventAction = require('../actions/eventActions');

var dayEvents = [];

module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  listenables: [dayEventActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: () => {
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

  onCreateEvent: (ev) => {
    superagent.post('/dayEvent')
      .send(ev)
      .accept('json')
      .end((err, res) => {
        // 是否成功
        if (res && res.body && res.body.created) {
          // 重新加载
          dayEventActions.reloadEvents(new Date(ev.date));
          // 重置 new event 内容
          newEventAction.resetEvent(ev);
        } else {
          alert(err || 'Oops!');
        }
      });
  }

});
