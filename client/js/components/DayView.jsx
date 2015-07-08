'use strict';

var React = require('react');
var mui = require('material-ui');

var CalendarSelector = require('./CalendarSelector.jsx');
var DayTimeLine = require('./DayTimeLine.jsx');
var EventEditor = require('./EventEditor.jsx');

var { Card, CardText, DatePicker } = mui;

class DayView extends React.Component {
  constructor() {
    super();
    this._onDateChange = this._onDateChange.bind(this);
    // setInitialState
    this.state = {
      style: {
        editorCard: {
          width: 256,  // TextField 的默认宽度
          float: 'left'
        },
        timeLineCard: {
          marginLeft: 256 + 16 * 2 // TextField 的默认宽度 + CardText 的 padding * 2
        }
      }
    };
  }

  componentDidMount() {
    var today = new Date();
    this.refs.datePicker.setDate(today);
    // 还是要手动触发一下 onChange
    this._onDateChange(null, today);
  }

  render() {
    return (
      <Card>
        <CardText>
          <CalendarSelector style={this.state.style.editorCard} />
          <DatePicker
            ref="datePicker"
            autoOk={true}
            mode="landscape"
            onChange={this._onDateChange}
          />
        </CardText>
        <CardText style={this.state.style.editorCard}>
          <EventEditor />
        </CardText>
        <CardText style={this.state.style.timeLineCard}>
          <DayTimeLine ref="dayTimeLine" />
        </CardText>
      </Card>
    );
  }
  _onDateChange(e, date) {
    this.refs.dayTimeLine.changeDate(date);
  }
}

module.exports = DayView;
