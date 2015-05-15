'use strict';

var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');


// stores
var globalStore = require('../stores/globalStore');

// components
var MainMenu = require('./MainMenu.jsx');
var Nav = require('./Nav.jsx');

// router
var RouteHandler = Router.RouteHandler;

var GCApp = React.createClass({
  mixins: [Reflux.connect(globalStore, 'base')],

  render: function () {
    return (
      <div>
        <MainMenu />
        <Nav isOpen={this.state.base.isNavOpen} />

        <RouteHandler/>
      </div>
    );
  }
});

module.exports = GCApp;
