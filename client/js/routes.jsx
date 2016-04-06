import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

const HelloMessage = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },

  render() {
    return <div>Hello {this.props.name}</div>;
  },
});

const routers = (<Router history={browserHistory}>
  <Route path="/" component={HelloMessage}>
    <Route path="about" component={About}/>
    <Route path="users" component={Users}>
      <Route path="/user/:userId" component={User}/>
    </Route>
    <Route path="*" component={NoMatch}/>
  </Route>
</Router>);

export { routers as default };


// var React = require('react/addons');
// var Router = require('react-router');
//
// var { DefaultRoute, Route } = Router;
//
// // Components
// var GCApp = require('./components/GCApp.jsx');
// var DayView = require('./components/DayView.jsx');
//
//
// var Dashboard = React.createClass({
//   render: function () {
//     return (
//       <div>Dashboard</div>
//     );
//   }
// });
//
// module.exports = (
//   <Route name="app" path="/" handler={GCApp}>
//     <Route name="day-view" handler={DayView}/>
//     <DefaultRoute handler={Dashboard}/>
//   </Route>
// );
