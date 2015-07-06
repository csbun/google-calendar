'use strict';

var React = require('react');
var Router = require('react-router');


// Please note that since v0.8.0, you also need to define a theme for components to start working.
// http://material-ui.com/#/customization/themes
let { AppBar, Styles } = require('material-ui');
var ThemeManager = new Styles.ThemeManager();


// components
var Nav = require('./Nav.jsx');
var Progress = require('./Progress.jsx');

// router
var RouteHandler = Router.RouteHandler;

// app React Component
class GCApp extends React.Component{

  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }

  // Important! material-ui theme
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  render() {
    return (
      <div>
        <Progress />
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title="Google Calendar"
        />
        <Nav ref="nav" />

        <RouteHandler/>
      </div>
    );
  }
  _onLeftIconButtonTouchTap() {
    this.refs.nav.toggle();
  }

}

// Important! material-ui theme
GCApp.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = GCApp;
