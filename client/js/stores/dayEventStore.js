'use strict';

var Reflux = require('reflux');
var superagent = require('superagent');

// actions
var dayEventActions = require('../actions/dayEventActions');
let newEventActions = require('../actions/eventActions');
let progressActions = require('../actions/progressActions');

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
    progressActions.setup();
    superagent.get('/dayEvents')
      .query({ date: +date })
      .accept('json')
      .end(function (err, res) {
        progressActions.setdown();
        dayEvents = (res.body || '').items;
        that.trigger(dayEvents);
      });
  },

  onCreateEvent: (ev) => {
    progressActions.setup();
    superagent.put('/dayEvent')
      .send(ev)
      .accept('json')
      .end((err, res) => {
        progressActions.setdown();
        // 是否成功
        if (res && res.body && res.body.created) {
          // 重新加载
          dayEventActions.reloadEvents(new Date(ev.date));
          // 重置 new event 内容
          newEventActions.resetEvent(ev);
        } else {
          alert(err || 'Oops!');
        }
      });
  },

  onDeleteEvent: (ev) => {
    progressActions.setup();
    superagent.del('/dayEvent')
      .send(ev)
      .accept('json')
      .end((err, res) => {
        progressActions.setdown();
        // 是否成功
        if (res && res.body && res.body.created) {
          // 重新加载
          dayEventActions.reloadEvents(new Date(ev.date));
          // 重置 new event 内容
          newEventActions.resetEvent(ev);
        } else {
          alert(err || 'Oops!');
        }
      });

  }

});
