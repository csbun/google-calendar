'use strict';

var React = require('react/addons');
var mui = require('material-ui');

var CalendarSelector = require('./CalendarSelector.jsx');
var DayTimeLine = require('./DayTimeLine.jsx');
var EventEditor = require('./EventEditor.jsx');

var { Card, CardText, DatePicker } = mui;

class DayView extends React.Component {
  constructor() {
    super();
    this._onDateChange = this._onDateChange.bind(this);
    this._onCalendarChange = this._onCalendarChange.bind(this);
    // setInitialState
    this.state = {
      timeline: {
        date: new Date(),
        calendarId: 'primary'
      },
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
    this.refs.datePicker.setDate(this.state.timeline.date);
  }

  render() {
    return (
      <Card>
        <CardText>
          <CalendarSelector
            selectedIndex={this.state.timeline.selectedIndex}
            onChange={this._onCalendarChange}
          />
          <DatePicker
            ref="datePicker"
            autoOk={true}
            mode="landscape"
            onChange={this._onDateChange}
          />
        </CardText>
        <CardText style={this.state.style.editorCard}>
          <EventEditor {...this.state.timeline} />
        </CardText>
        <CardText style={this.state.style.timeLineCard}>
          <DayTimeLine {...this.state.timeline} ref="dayTimeLine" />
        </CardText>
      </Card>
    );
  }

  // DatePicker 更新时触发
  _onDateChange(e, date) {
    var timeline = this.state.timeline;
    timeline.date = date;
    this.setState({
      timeline: timeline
    });
  }

  // CalendarSelector 更新时触发
  _onCalendarChange(item) {
    var timeline = this.state.timeline;
    timeline.calendarId = item.id;
    this.setState({
      timeline: timeline
    });
  }
}

module.exports = DayView;
