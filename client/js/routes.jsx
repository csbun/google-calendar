'use strict';

var React = require('react/addons');
var Router = require('react-router');

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

module.exports = (
  <Route name="app" path="/" handler={GCApp}>
    <Route name="get-started" handler={GetStarted}/>
    <Route name="css-framework" handler={CssFramework}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);
