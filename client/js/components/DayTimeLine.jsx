'use strict';

var React = require('react');
var Reflux = require('reflux');
var moment = require('moment');

let { List, ListItem } = require('material-ui');

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
    var formatTimeHHMM = time => moment(time).format('HH:mm');
    // 列表
    var indents = this.state.dayEvents.map(function (ev) {
      return (
        <ListItem
          secondaryText={formatTimeHHMM(ev.start.dateTime) + '-' + formatTimeHHMM(ev.end.dateTime)}
        >{ev.summary}({ev.colorId})</ListItem>
      );
    });
    // 渲染
    return (
      <List className="float-half-width">{ indents }</List>
    );
  }
});

module.exports = DayTimeLine;
