'use strict';

var Reflux = require('reflux');
var mui = require('material-ui');

var { MenuItem } = mui;

var menuItems = [
  { route: 'get-started', text: 'Get Started' },
  { route: 'css-framework', text: 'CSS Framework' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'GitHub'
  },
  {
     text: 'Disabled',
     disabled: true
  },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://www.google.com',
     text: 'Disabled Link',
     disabled: true
  },
];


module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  // listenables: [globalAction],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return menuItems;
  }

});
