'use strict';

let Reflux = require('reflux');

// actions
let progressActions = require('../actions/progressActions');
// in mem store
let progressingNum = 0;

let isProgressing = () => progressingNum > 0;

module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions,
  // using onKeyname (or keyname) as callbacks
  listenables: [progressActions],

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    return isProgressing();
  },

  // bind to actions
  onSetup: function () {
    ++progressingNum;
    this.trigger(isProgressing());
  },

  onSetdown: function () {
    if (--progressingNum < 0) {
      progressingNum = 0;
    }
    this.trigger(isProgressing());
  }

});
