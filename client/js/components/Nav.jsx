'use strict';

var React = require('react');
var Reflux = require('reflux');
var mui = require('material-ui');

// stores
var navStore = require('../stores/navStore');

var { LeftNav } = mui;


var Nav = React.createClass({
  mixins: [Reflux.connect(navStore, 'items')],

  // use react-router
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    return (
      // Hideable Left Nav
      <LeftNav
        ref="leftnav"
        docked={false}
        menuItems={this.state.items}
        onChange={this._onLeftNavChange}
      />
    );
  },
  toggle: function () {
    this.refs.leftnav.toggle();
  },
  _onLeftNavChange: function (e, key, payload) {
    this.context.router.transitionTo(payload.route);
  }
});

module.exports = Nav;
