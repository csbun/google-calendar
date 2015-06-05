'use strict';

var React = require('react');
var Reflux = require('reflux');

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
    dayEventActions.onReloadEvents();
    this.setState({
      date: date
    });
  },

  render: function () {
    return (
      <div>
        I am DayTimeLine,
        show all events in date " {'' + this.state.date} "
      </div>
    );
  }
});

module.exports = DayTimeLine;
