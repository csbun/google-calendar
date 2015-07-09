'use strict';

let React = require('react');
let Reflux = require('reflux');
let mui = require('material-ui');

let { DropDownMenu } = mui;

let calendarStore = require('../stores/calendarStore');
var calendarActions = require('../actions/calendarActions');

var style = {
  float: 'right'
};

let CalendarSelector = React.createClass({
  mixins: [
    Reflux.connect(calendarStore, 'calendars')
  ],

  getInitialState: () => {
    return {
      // prop更新时会重新 render，所以要在 state 里面保存 selectedIndex
      selectedIndex: 2
    };
  },

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  componentDidMount: () => {
    calendarActions.load();
  },

  _onChange: function (ev, index, item) {
    this.setState({
      selectedIndex: index
    });
    this.props.onChange(item);
  },

  render: function () {
    if (this.state.calendars.length) {
      return (
          <DropDownMenu
            ref="calendarSelect"
            style={style}
            selectedIndex={this.state.selectedIndex}
            valueMember="id"
            displayMember="summary"
            menuItems={this.state.calendars}
            onChange={this._onChange}
          />
      );
    } else {
      // 没数据时随便渲染个东西
      return <div/>;
    }
  }

});

module.exports = CalendarSelector;
