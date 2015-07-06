'use strict';

let React = require('react');
let Reflux = require('reflux');
let mui = require('material-ui');

// stores
let progressStore = require('../stores/progressStore');

let { LinearProgress } = mui;
let style = {
  position: 'fixed',
  zIndex: 999
};

let Progress = React.createClass({
  mixins: [Reflux.connect(progressStore, 'isProgressing')],

  render: function () {
    return this.state.isProgressing ?
      <LinearProgress style={style} mode="indeterminate" /> : <div />;
  }
});

module.exports = Progress;
