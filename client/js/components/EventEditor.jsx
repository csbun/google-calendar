'use strict';

let React = require('react');
let Reflux = require('reflux');
let mui = require('material-ui');
let moment = require('moment');

// stores
let eventTypeStore = require('../stores/eventTypeStore');
let newEventStore = require('../stores/eventStore');
let progressStore = require('../stores/progressStore');
// actions
let dayEventActions = require('../actions/dayEventActions');

let { SelectField, TextField, TimePicker, RaisedButton } = mui;

let EventEditor = React.createClass({
  mixins: [
    Reflux.connect(eventTypeStore, 'eventTypes'),
    Reflux.connect(newEventStore, 'newEvent'),
    Reflux.connect(progressStore, 'isProgressing')
  ],

  // propTypes: {
  //   width: React.PropTypes.string.isRequired
  // },

  getInitialState: function() {
    return {
      selectedEventType: eventTypeStore.find(),
      date: new Date()
    };
  },
  // 当 this.state.newEvent 更新时同时更新对应 Field 里面的内容
  componentDidUpdate: function () {
    this.refs.eventSummaryText.setValue(this.state.newEvent.summary);
    this.refs.eventStartTimeText.setTime(this.state.newEvent.startTime);
    this.refs.eventEndTimeText.setTime(this.state.newEvent.endTime);
    this.refs.eventDescriptionText.setValue(this.state.newEvent.description);
  },
  changeDate: function (date) {
    this.setState({
      date: date
    });
  },
  render: function () {
    return (
      <div>
        <SelectField
          ref="eventTypeSelect"
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
        <TimePicker
          ref="eventStartTimeText"
          format="24hr"
          floatingLabelText="start time"
          hintText="start time"
          defaultTime={this.state.newEvent.startTime}
        />
        <TimePicker
          ref="eventEndTimeText"
          format="24hr"
          floatingLabelText="end time"
          hintText="end time"
          defaultTime={this.state.newEvent.endTime}
        />
        <TextField
          ref="eventDescriptionText"
          floatingLabelText="description"
          multiLine={true}
          defaultValue={this.state.newEvent.description}
        />
        <RaisedButton
          label="Save"
          primary={true}
          disabled={this.state.isProgressing}
          onClick={this._onSave}
        />
      </div>
    );
  },

  _onEventTypeChanged: function (e) {
    this.setState({
      selectedEventType: e.target.value
    });
  },

  _onSave: function () {
    let formatDate = moment(this.state.date).format('YYYY-MM-DD') + 'T';
    let st = formatDate + moment(this.refs.eventStartTimeText.getTime()).format('HH:mm:ssZZ');
    let et = formatDate + moment(this.refs.eventEndTimeText.getTime()).format('HH:mm:ssZZ');
    dayEventActions.createEvent({
      type: this.state.selectedEventType.payload,
      summary: this.refs.eventSummaryText.getValue(),
      location: this.refs.eventLocationText.getValue(),
      date: this.state.date,
      startTime: st,
      endTime: et,
      description: this.refs.eventDescriptionText.getValue()
    });
  }

});

module.exports = EventEditor;
