'use strict';

var React = require('react/addons');
var Router = require('react-router');

// include css
require('../less/main.less');

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();


var routes = require('./routes.jsx');

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
