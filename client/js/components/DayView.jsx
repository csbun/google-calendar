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

  componentDidMount() {
    var today = new Date();
    this.refs.datePicker.setDate(today);
    // 还是要手动触发一下 onChange
    this._onDateChange(null, today);
  }

  render() {
    return (
      <div>
        <DatePicker
          ref="datePicker"
          autoOk={true}
          mode="landscape"
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
