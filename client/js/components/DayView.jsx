'use strict';

var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');

// stores
var eventTypeStore = require('../stores/eventTypeStore');

var { DropDownMenu, TextField } = mui;


var DayView = React.createClass({
  mixins: [Reflux.connect(eventTypeStore, 'eventTypes')],


  render: function () {
    return (
      <div>
        <DropDownMenu menuItems={this.state.eventTypes} />
        <TextField />
      </div>
    );
  }

});

module.exports = DayView;
