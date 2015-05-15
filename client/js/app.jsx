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


var { DefaultRoute, Route } = Router;

// Main
var GCApp = require('./components/GCApp.jsx');

var GetStarted = React.createClass({
  render: function () {
    return (
        <div>GetStarted</div>
    );
  }
});

var CssFramework = React.createClass({
  render: function () {
    return (
        <div>CssFramework</div>
    );
  }
});
var Dashboard = React.createClass({
  render: function () {
    return (
        <div>Dashboard</div>
    );
  }
});


var routes = (
  <Route name="app" path="/" handler={GCApp}>
    <Route name="get-started" handler={GetStarted}/>
    <Route name="css-framework" handler={CssFramework}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});