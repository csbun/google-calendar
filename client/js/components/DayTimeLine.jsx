'use strict';

var React = require('react');

class DayTimeLine extends React.Component{
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
    this.changeDate = this.changeDate.bind(this);
  }

  // change the current date of this timeline
  changeDate(date) {
    this.setState({
      date: date
    });
  }

  render() {
    return (
      <div>
        I am DayTimeLine,
        show all events in date " {'' + this.state.date} "
      </div>
    );
  }
}

module.exports = DayTimeLine;
