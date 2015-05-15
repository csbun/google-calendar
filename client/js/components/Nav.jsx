'use strict';

var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');

var globalActions = require('../actions/globalActions');
var navStore = require('../stores/navStore');

var { LeftNav } = mui;


var Nav = React.createClass({
  mixins: [Reflux.connect(navStore, 'items')],

  propTypes: {
    isOpen: React.PropTypes.bool.isRequired
  },

  componentDidUpdate: function () {
    if (this.props.isOpen) {
      this.refs.leftnav.open();
    } else {
      this.refs.leftnav.close();
    }
  },
  _onLeftNavOpen: function () {
    globalActions.openNav();
  },
  _onLeftNavClose: function () {
    globalActions.closeNav();
  },
  render: function () {
    return (
      // Hideable Left Nav
      <LeftNav
        ref="leftnav"
        docked={false}
        menuItems={this.state.items}
        onNavOpen={this._onLeftNavOpen}
        onNavClose={this._onLeftNavClose}
      />
    );
  }
});

module.exports = Nav;
