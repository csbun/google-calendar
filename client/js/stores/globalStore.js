'use strict';

var Reflux = require('reflux');
var globalAction = require('../actions/globalActions');

var state = {
  isNavOpen: false
};

module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  listenables: [globalAction],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return state;
  },

  onOpenNav: function () {
    if (!state.isNavOpen) {
      state.isNavOpen = true;
      this.trigger(state);
    }
  },

  onCloseNav: function () {
    if (state.isNavOpen) {
      state.isNavOpen = false;
      this.trigger(state);
    }
  }

});
