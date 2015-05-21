'use strict';

var React = require('react/addons');
var Router = require('react-router');

var { DefaultRoute, Route } = Router;

// Components
var GCApp = require('./components/GCApp.jsx');
var DayView = require('./components/DayView.jsx');


var Dashboard = React.createClass({
  render: function () {
    return (
      <div>Dashboard</div>
    );
  }
});

module.exports = (
  <Route name="app" path="/" handler={GCApp}>
    <Route name="day-view" handler={DayView}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);
