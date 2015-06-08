'use strict';

var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');

// stores
var dayEventStore = require('../stores/dayEventStore');
// actions
var dayEventActions = require('../actions/dayEventActions');

// Component
var DayTimeLine = React.createClass({
  mixins: [
    Reflux.connect(dayEventStore, 'dayEvents')
  ],

  getInitialState: function() {
    return {
      date: new Date()
    };
  },

  // change the current date of this timeline
  changeDate: function (date) {
    dayEventActions.reloadEvents(date);
    this.setState({
      date: date
    });
  },

  render: function () {
    // 格式化时间
    var formatTimeHHMM = function (time) {
      return moment(time).format('HH:mm');
    };
    // 列表
    var indents = this.state.dayEvents.map(function (ev) {
      return (
        <li>
          <span className="summary">{ev.summary}({ev.colorId})</span>
          <span className="time">{formatTimeHHMM(ev.start.dateTime)} - {formatTimeHHMM(ev.end.dateTime)}</span>
        </li>
      );
    });
    // 渲染
    return (
      <div>
        <ul>{ indents }</ul>
      </div>
    );
  }
});

module.exports = DayTimeLine;
