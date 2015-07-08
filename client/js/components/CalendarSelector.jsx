'use strict';

let React = require('react');
let Reflux = require('reflux');
let mui = require('material-ui');

let { DropDownMenu } = mui;

let calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');

let CalendarSelector = React.createClass({
  mixins: [
    Reflux.connect(calendarStore, 'calendars')
  ],

  propTypes: {
    style: React.PropTypes.object,
  },

  componentDidMount: () => {
    calendarActions.load();
  },

  render: function () {
    if (this.state.calendars.length) {
      return (
          <DropDownMenu
            ref="calendarSelect"
            style={this.props.style}
            selectedIndex={2}
            valueMember="id"
            displayMember="summary"
            menuItems={this.state.calendars}
            onChange={this._onEventTypeChanged}
          />
      );
    } else {
      return <div/>;
    }
  }
});

module.exports = CalendarSelector;
