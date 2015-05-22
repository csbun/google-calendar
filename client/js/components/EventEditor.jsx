'use strict';

var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');

// stores
var eventTypeStore = require('../stores/eventTypeStore');

var { DropDownMenu, TextField, IconButton } = mui;


var inputFieldStyle = {
  width: '100%'
};

var EventEditor = React.createClass({
  mixins: [
    Reflux.connect(eventTypeStore, 'eventTypes')
  ],

  propTypes: {
    width: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      date: new Date()
    };
  },
  changeDate: function (date) {
    this.setState({
      date: date
    });
  },
  render: function () {
    return (
      <div style={inputFieldStyle}>
        <p>{'' + this.state.date}</p>
        <DropDownMenu
          ref="eventTypeDropDown"
          style={inputFieldStyle}
          autoWidth={true}
          menuItems={this.state.eventTypes}
        />
        <TextField
          ref="eventTitleText"
        />
        <IconButton
          text="save"
          onClick={this._onSave}
        />
      </div>
    );
  },

  _onSave: function () {
    console.log({
      date: this.state.date,
      type: this.refs.eventTypeDropDown.state.selectedIndex,
      title: this.refs.eventTitleText.state.hasValue
    });
  }

});

module.exports = EventEditor;
