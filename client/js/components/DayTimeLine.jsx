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

  propTypes: {
    date: React.PropTypes.object.isRequired,
    calendarId: React.PropTypes.string.isRequired
  },

  // 初始化时加载数据
  componentDidMount: function() {
    dayEventActions.reloadEvents(this.props);
  },
  // props 更新时重新加载
  componentWillReceiveProps: (nextProps) => dayEventActions.reloadEvents(nextProps),

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
            <IconButton style={deleteIconStyle} onClick={that._onDeleteEvent.bind(null, ev)}>×</IconButton>
          }
        >{ev.summary}</ListItem>
      );
    });
    // 渲染
    return (
      <List>{ indents }</List>
    );
  },

  // 点击删除
  _onDeleteEvent: function (ev) {
    dayEventActions.deleteEvent(ev);
  }
});

module.exports = DayTimeLine;
