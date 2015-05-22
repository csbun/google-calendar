'use strict';

var React = require('react');
var mui = require('material-ui');

var DayTimeLine = require('./DayTimeLine.jsx');
var EventEditor = require('./EventEditor.jsx');

var { DatePicker } = mui;

class DayView extends React.Component {
  constructor() {
    super();
    this._onDateChange = this._onDateChange.bind(this);
  }

  render() {
    return (
      <div>
        <DatePicker
          onChange={this._onDateChange}
        />
      <DayTimeLine ref="dayTimeLine" />
        <EventEditor />
      </div>
    );
  }
  _onDateChange(e, date) {
    this.refs.dayTimeLine.changeDate(date);
    console.log(date);
  }
}

module.exports = DayView;
