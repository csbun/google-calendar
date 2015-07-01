'use strict';

let React = require('react');
let Reflux = require('reflux');
let mui = require('material-ui');

// stores
let eventTypeStore = require('../stores/eventTypeStore');
let newEventStore = require('../stores/eventStore');
// actions
let dayEventActions = require('../actions/dayEventActions');


let { SelectField, TextField, FlatButton } = mui;

let inputFieldStyle = {
  width: '100%'
};

let EventEditor = React.createClass({
  mixins: [
    Reflux.connect(eventTypeStore, 'eventTypes'),
    Reflux.connect(newEventStore, 'newEvent')
  ],

  propTypes: {
    width: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      selectedEventType: eventTypeStore.find(),
      date: new Date(),
      style: {}
    };
  },
  // componentDidMount: function () {
  //   console.log();
  //   this.setState({
  //     selectedEventType: this.state.eventTypes[0]
  //   });
  // },
  componentDidUpdate: function () {
    this.refs.eventSummaryText.setValue(this.state.newEvent.summary);
    this.refs.eventStartTimeText.setValue(this.state.newEvent.startTime);
    this.refs.eventEndTimeText.setValue(this.state.newEvent.endTime);
    this.refs.eventDescriptionText.setValue(this.state.newEvent.description);
  },
  changeDate: function (date) {
    this.setState({
      date: date
    });
  },
  render: function () {
    return (
      <div className="float-half-width" style={this.state.style}>
        <SelectField
          ref="eventTypeDropDown"
          floatingLabelText="type"
          hintText="typemm"
          defaultValue={this.state.selectedEventType}
          menuItems={this.state.eventTypes}
          onChange={this._onEventTypeChanged}
        />
        <TextField
          ref="eventSummaryText"
          floatingLabelText="summary"
          defaultValue={this.state.newEvent.summary}
        />
        <TextField
          ref="eventLocationText"
          floatingLabelText="location"
          defaultValue={this.state.newEvent.location}
        />
        <TextField
          ref="eventStartTimeText"
          floatingLabelText="start time"
          defaultValue={this.state.newEvent.startTime}
        />
        <TextField
          ref="eventEndTimeText"
          floatingLabelText="end time"
          defaultValue={this.state.newEvent.endTime}
        />
        <TextField
          ref="eventDescriptionText"
          floatingLabelText="description"
          multiLine={true}
          defaultValue={this.state.newEvent.description}
        />
        <FlatButton
          label="Save"
          primary={true}
          onClick={this._onSave}
        />
      </div>
    );
  },

  _onEventTypeChanged: function (e) {
    this.setState({
      style: {
        background: e.target.value.background
      }
    });
    console.log(e.target.value);
  },

  _onSave: function () {
    // console.log(this.state.newEvent);
    dayEventActions.createEvent({
      type: this.refs.eventTypeDropDown.state.selectedIndex,
      summary: this.refs.eventSummaryText.getValue(),
      location: this.refs.eventLocationText.getValue(),
      date: this.state.date,
      startTime: this.refs.eventStartTimeText.getValue(),
      endTime: this.refs.eventEndTimeText.getValue(),
      description: this.refs.eventDescriptionText.getValue()
    });
  }

});

module.exports = EventEditor;
