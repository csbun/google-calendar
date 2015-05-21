'use strict';

var Reflux = require('reflux');

var eventTypes = [{
    playload: 'colorId',
    background: 'Background',
    foreground: 'Foreground',
    text: '类型1'
  }, {
    playload: 'colorId2',
    background: 'Background2',
    foreground: 'Foreground2',
    text: '类型2'
  }];

module.exports = Reflux.createStore({
  getInitialState: function () {
    return eventTypes;
  }
});
