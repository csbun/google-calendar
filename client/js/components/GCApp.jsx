'use strict';

var React = require('react');
var Router = require('react-router');

// components
var TopBar = require('./TopBar.jsx');
var Nav = require('./Nav.jsx');

// router
var RouteHandler = Router.RouteHandler;

// app React Component
class GCApp extends React.Component{

  constructor() {
    super();
    this._onNavToggle = this._onNavToggle.bind(this);
  }

  render() {
    return (
      <div>
        <TopBar onLeftIconButtonClick={this._onNavToggle} />
        <Nav ref="nav" />

        <RouteHandler/>
      </div>
    );
  }
  _onNavToggle() {
    this.refs.nav.toggle();
  }

}

module.exports = GCApp;
