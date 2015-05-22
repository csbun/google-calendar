'use strict';

var Reflux = require('reflux');

var eventTypes = [{
    playload: '1', // colorId
    background: '#a4bdfc',
    foreground: '#1d1d1d',
    text: '类型 1'
  }, {
    playload: '2',
    background: '#7ae7bf',
    foreground: '#1d1d1d',
    text: '类型 2'
  }, {
    playload: '3',
    background: '#dbadff',
    foreground: '#1d1d1d',
    text: '类型 3'
  }, {
    playload: '4',
    background: '#ff887c',
    foreground: '#1d1d1d',
    text: '类型 4'
  }, {
    playload: '5',
    background: '#fbd75b',
    foreground: '#1d1d1d',
    text: '类型 5'
  }, {
    playload: '6',
    background: '#ffb878',
    foreground: '#1d1d1d',
    text: '类型 6'
  }, {
    playload: '7',
    background: '#46d6db',
    foreground: '#1d1d1d',
    text: '类型 7'
  }, {
    playload: '8',
    background: '#e1e1e1',
    foreground: '#1d1d1d',
    text: '类型 8'
  }, {
    playload: '9',
    background: '#5484ed',
    foreground: '#1d1d1d',
    text: '类型 9'
  }, {
    playload: '10',
    background: '#51b749',
    foreground: '#1d1d1d',
    text: '类型 10'
  }, {
    playload: '11',
    background: '#dc2127',
    foreground: '#1d1d1d',
    text: '类型 11'
  }];

module.exports = Reflux.createStore({
  getInitialState: function () {
    return eventTypes;
  }
});
