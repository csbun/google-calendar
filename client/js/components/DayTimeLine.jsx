'use strict';

let React = require('react');
let Reflux = require('reflux');
let moment = require('moment');

let { List, ListItem, IconButton } = require('material-ui');

// stores
let dayEventStore = require('../stores/dayEventStore');
let eventTypeStore = require('../stores/eventTypeStore');
// actions
let dayEventActions = require('../actions/dayEventActions');

let deleteIconStyle = {
  color: 'red',
  fontSize: 20
};

// 格式化时间
let formatTimeHHMM = time => moment(time).format('HH:mm');

let getListItemStyle = (ev) => {
  return {
    borderLeft: '4px solid ' + eventTypeStore.find(ev.colorId).background
    // backgroundColor: eventTypeStore.find(ev.colorId).background
  };
};

// Component
let DayTimeLine = React.createClass({
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
    let that = this;
    // 列表
    let indents = this.state.dayEvents.map(function (ev) {
      return (
        <ListItem
          style={getListItemStyle(ev)}
          key={ev.id}
          secondaryText={formatTimeHHMM(ev.start.dateTime) + '-' + formatTimeHHMM(ev.end.dateTime)}
          rightIconButton={
            <IconButton style={deleteIconStyle} onClick={that._onDeleteEvent.bind(this, ev)}>×</IconButton>
          }
        >{ev.summary}</ListItem>
      );
    });
    // 渲染
    return (
      <List>{ indents }</List>
    );
  },

  _onDeleteEvent: function (ev) {
    dayEventActions.deleteEvent(ev);
  }
});

module.exports = DayTimeLine;
